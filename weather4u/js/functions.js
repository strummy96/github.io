// FUNCTIONS FOR WEATHER 4 U

async function fetch_data(url) {
    let m_resp = await fetch(url);
    if(m_resp.ok){
        let m_data = await m_resp.json()
        return m_data;
    }
    else if(m_resp.status == 500) {
        m_resp = await fetch_data(url);
    }
    else {
        console.log(`An error occurred: ${m_resp.status}`);
        console.log("Using local dataset for testing purposes.");
        let local_data_resp = fetch("./json/local_data.json");
        let local_data = await local_data_resp.json();
        return local_data;
    }
}

async function get_mcons() {
    // load meteocons
    const m_resp =  await fetch("./json/icon_keys.json");
    const meteocons = await m_resp.json();
    return meteocons
}
let meteocons; // need global variable so we can access in other functions
let meteocons_day;
let meteocons_night;

async function get_data() {

    meteocons = await get_mcons();
    meteocons_day = meteocons["meteocons_day"];
    meteocons_night = meteocons["meteocons_night"];

    // hourly forecast data
    wakefield_hourly_url = "https://api.weather.gov/gridpoints/BOX/64,46/forecast/hourly";
    const h_data = await fetch_data(wakefield_hourly_url);
    // const h_data = await h_resp.json();
    console.log("hourly forecast data");
    console.log(h_data);
    
    // forecast data
    let wakefield_url = "https://api.weather.gov/gridpoints/BOX/64,46/forecast";
    const data = await fetch_data(wakefield_url);
    // const data = await resp.json();
    console.log("7 day forecast data");
    console.log(data);
    let periods = data.properties.periods;

    let tile_container = document.querySelector("#tile-container");

    // loop through all 14 periods
    for (const [index, period] of periods.entries()){

        // if period is daytime or we're on the first period (which may be night), 
        // build a tile, which contains day and night panes
        if(period.isDaytime || period.number == 1){

            let period_name = period.name;

            // create tile with panes
            let tile_row = document.createElement("div");
            tile_row.classList.add("tile-row", "accordion", "hover-overlay");
            tile_row.classList.add("accordion");
            tile_row.id = "tile-row-" + period.number;

            let tile_el = document.createElement("div");
            tile_el.id = period_name + "_tile";
            tile_el.style.width = "100%";
            tile_el.classList.add("tile");
            tile_el.classList.add("accordion-item");

            let tile_acc_header = document.createElement("h2");
            tile_acc_header.classList.add("accordion-header");

            let tile_acc_button = document.createElement("button");
            tile_acc_button.classList.add("accordion-button", "collapsed");
            tile_acc_button.type = "button";
            tile_acc_button.setAttribute("data-bs-target", "#collapse-" + period.number);
            tile_acc_button.setAttribute("data-bs-toggle", "collapse");
            tile_acc_button.setAttribute("aria-controls", "collapse-" + period.number);

            let tile_acc_collapse = document.createElement("div");
            tile_acc_collapse.classList.add("accordion-collapse", "collapse");
            tile_acc_collapse.id = "collapse-" + period.number;
            tile_acc_collapse.setAttribute("data-bs-parent", "#tile-row-" + period.number);

            let tile_acc_body = document.createElement("div");
            tile_acc_body.classList.add("accordion-body");

            // panes container
            let panes_container = document.createElement("div");
            panes_container.id = period_name + "_panes_container";
            panes_container.style.display = "inline-flex";
            panes_container.style.width = "100%";
            panes_container.classList.add("panes-container");

            // day pane
            let day_pane = document.createElement("div");
            day_pane.classList.add("day-night-pane");

            let day_title = document.createElement("div");
            day_title.textContent = period.name;
            day_title.classList.add("pane-title");

            // day title with collapse indicator arrow
            let day_title_container = document.createElement("div");
            day_title_container.classList.add("pane-title-container");

            let tile_collapse_arrow = document.createElement("i");
            tile_collapse_arrow.classList.add("arrow", "arrow-right");
            tile_collapse_arrow.id = "tile-arrow-" + period.number;
            // rotate arrow when accordion button clicked
            tile_acc_button.onclick = function(){
                let arrow = document.querySelector("#tile-arrow-" + period.number);
                arrow.classList.toggle("arrow-down");
            }

            day_title_container.append(tile_collapse_arrow, day_title);

            let day_pane_top = document.createElement("div");
            day_pane_top.classList.add("flex-row-container-left");
            day_pane_top.classList.add("flex-row-container");
            day_pane_top.id = "day-pane-top-" + period.number;

            // night pane
            let night_pane = document.createElement("div");
            night_pane.classList.add("day-night-pane");
            
            let night_pane_top = document.createElement("div");
            night_pane_top.classList.add("flex-row-container-right", "flex-row-container");
            night_pane_top.id = "night-pane-top-" + period.number;

            let night_title;
            if(period.number < 14){
                night_title = document.createElement("div");
                night_title.textContent = periods[index + 1].name;            
                night_title.classList.add("pane-title");
                night_title.style.textAlign = "right";

                night_pane.append(night_title, night_pane_top);
                // night_pane.appendChild(night_pane_top);
            };

            // add children - consider using document fragments to speed up
            day_pane.append(day_title_container, day_pane_top);
            panes_container.appendChild(day_pane);

            if(period.isDaytime && period.number < 14){
                panes_container.appendChild(night_pane);
            }

            // if the first period is night or the last period is day, make small tile
            else{
                tile_row.classList.add("single-tile");
                day_pane.style.width = "100%";
                if(period.isDaytime){
                    tile_row.style.justifyContent = "left";
                } else {tile_row.style.justifyContent = "right"}
            };

            tile_acc_button.appendChild(panes_container);
            tile_acc_header.appendChild(tile_acc_button);
            tile_acc_collapse.appendChild(tile_acc_body);
            tile_el.appendChild(tile_acc_header);
            tile_el.appendChild(tile_acc_collapse);

            // temps for max and min
            let temps = data.properties.periods.map(({temperature}) => temperature);
            
            // add tile to page
            tile_row.appendChild(tile_el);
            tile_container.appendChild(tile_row);

            // Add content to panes - first day then night, or just night if the first
            // period is night.
            if (period.isDaytime){
                // build day pane
                build_tile_section(day_pane, period, temps, meteocons_day, meteocons_night);
                build_accordion_body_section(tile_acc_body, period, h_data)

                // build night pane unless the day period is the last (number 14)
                if(period.number < 14){
                    build_tile_section(night_pane, periods[index + 1], temps, meteocons_day, meteocons_night);
                    build_accordion_body_section(tile_acc_body, periods[index + 1], h_data);
                };
            }
            else {
                build_tile_section(day_pane, period, temps, meteocons_day, meteocons_night)
                let body_sec = build_accordion_body_section(tile_acc_body, period, h_data);

                // add class to body section to make full width of tile
                body_sec.classList.add("single")
            };
        }
    }

    // add pseudo element at end for flex formatting
    let pseudo = document.createElement("div");
    pseudo.classList.add("pseudo-element");
    tile_container.appendChild(pseudo);
}

function build_tile_section(parent_el, period, temps, meteocons_day, meteocons_night) {

    // get min and max temps
    let min_temp = Math.min.apply(null, temps);
    let max_temp = Math.max.apply(null, temps);

    let temp_el;
    let icon_el;
    let rel_hum_el;
    let wind_el;
    let cha_prec_el;
    let cond_el;

    const rel_hum_text = (() => {if(period.relativeHumidity.value==null) {return "0"} 
                    else {return period.relativeHumidity.value}})();
    const cha_prec_text = (() => {if(period.probabilityOfPrecipitation.value==null) {return "0"} 
                    else {return period.probabilityOfPrecipitation.value}})();

    // period name i.e. "Tuesday Night"
    let pname_el = document.createElement("div");
    pname_el.id = "period-name-" + period.number;
    pname_el.textContent = period.name;
    pname_el.style.padding = "5px";
    
    // temperature element - includes wrapper, bar, and text
    temp_el = document.createElement("div");
    temp_el.classList.add("data");
    temp_el.style.width = "20%";

    // wrapper for bar and temp
    let temp_wrapper = document.createElement("div");
    temp_wrapper.style.width = "100%";
    temp_wrapper.style.height = "100%";
    temp_wrapper.style.display = "flex";
    temp_wrapper.style.justifyContent = "center";
    temp_wrapper.style.gap = "10px";
    temp_wrapper.style.alignItems = "center";
    temp_wrapper.style.borderRadius = "25px";

    // temp_bar container
    let temp_bar_con = document.createElement("div");
    temp_bar_con.style.backgroundColor = "#f5f5f5";
    temp_bar_con.style.width = "100%";
    temp_bar_con.style.height = "10px";
    temp_bar_con.style.borderRadius = "25px";
    
    // temp bar
    let temp_bar = document.createElement("div");
    bar_width = Math.round((period.temperature - min_temp) / (max_temp - min_temp) * 100);
    scaled_bar_width = bar_width * 0.8 + 10;
    temp_bar.style.width = String(scaled_bar_width) + "%";
    temp_bar.style.height = "100%";
    temp_bar.style.borderRadius = "25px";
    temp_bar.style.backgroundColor = getColor(period.temperature + 20);

    // temperature text
    let temp_text = document.createElement("div");
    temp_text.id = "temp-" + period.number;
    temp_text.classList.add("temp-text");
    temp_text.innerHTML = period.temperature + "&deg;";

    // appending children
    temp_wrapper.appendChild(temp_text);
    temp_el.appendChild(temp_wrapper);  

    // icon
    icon_el = document.createElement("div");
    icon_el.classList.add("icon");
    icon_el.id = "icon-" + period.number;
    icon_el = build_icon(period, icon_el, meteocons_day, meteocons_night);

    if(cha_prec_text > 0) {
        let icon_cha_prec = document.createElement("div");
        icon_cha_prec.classList.add("icon-cha-prec");

        let raindrop = document.createElement("img");
        raindrop.style.height = "100%";
        raindrop.src = "./meteocons/raindrop_small.png";

        let icon_cha_prec_text = document.createElement("div");
        icon_cha_prec_text.classList.add("icon-cha-prec-text");
        icon_cha_prec_text.textContent = cha_prec_text + "%";

        // icon_cha_prec.appendChild(raindrop);
        icon_cha_prec.appendChild(icon_cha_prec_text);
        icon_el.appendChild(icon_cha_prec);
    }

    // short forecast (conditions)
    let cond_text = document.createElement("div");
    cond_text.classList.add("cond-text");
    cond_text.id = "cond-" + period.number;
    cond_text.textContent = period.shortForecast;

    cond_el = document.createElement("div");
    cond_el.style.display = "flex";
    cond_el.style.alignItems = "center";
    cond_el.style.width = "50%";
    cond_el.appendChild(cond_text);

    // relative humidity
    rel_hum_el = document.createElement("div");
    rel_hum_el.classList.add("data");

    let rel_hum_wrapper = document.createElement("div");
    rel_hum_wrapper.style.width = "100%";
    rel_hum_wrapper.style.display = "flex";
    rel_hum_wrapper.style.justifyContent = "center";
    rel_hum_wrapper.style.gap = "10px";
    rel_hum_wrapper.style.alignItems = "center";
    
    let rel_hum_circle = document.createElement("div");
    rel_hum_circle.classList.add("circle");
    rel_hum_circle.style.backgroundColor = getColorHumidity(Number(period.relativeHumidity.value));
    rel_hum_circle.style.width = "0.8em";
    rel_hum_circle.style.height = rel_hum_circle.style.width;

    let rel_hum_text_el = document.createElement("div");
    rel_hum_text_el.textContent = rel_hum_text + " %";

    rel_hum_wrapper.appendChild(rel_hum_circle);
    rel_hum_wrapper.appendChild(rel_hum_text_el);
    rel_hum_el.appendChild(rel_hum_wrapper);

    // wind
    wind_el = document.createElement("div");
    wind_el.classList = "data flex-row-container";

    let wind_dir = document.createElement("div");
    wind_dir.textContent = period.windDirection;
    // wind_dir.style.width = "25%";
    wind_dir.style.textAlign = "center";

    let wind_speed = document.createElement("div");
    wind_speed.textContent = period.windSpeed;
    wind_speed.style.textAlign = "center";
    wind_speed.style.flexGrow = 1;

    wind_el.appendChild(wind_dir)
    wind_el.appendChild(wind_speed)

    // chance of precipitation
    cha_prec_el = document.createElement("div");
    cha_prec_el.textContent = cha_prec_text + " %";
    cha_prec_el.classList.add("data");

    if (cha_prec_text == 0) {
        cha_prec_el.style.color = "#DEDEDE"
        }

    // add elements to tile section
    let top_el;
    let bottom_el;

    if(period.isDaytime || period.number == 1){
        top_el = document.querySelector("#day-pane-top-" + period.number);
        // top_el = day_pane_top;
        bottom_el = document.querySelector("#day-pane-bottom-" + period.number);
    }
    // else if (period.number == 1){
    //     // if the first period is a night, we can 
    //     top_el = document.querySelector("#night-pane-top-" + period.number);
    //     bottom_el = document.querySelector("#night-pane-bottom-" + period.number);
    // }
     else {
        // night-pane-top id's use the number of the daytime period - if we're building
        // a section for a nighttime period, we need to select the div with an id
        // that includes the previous period's number, thus we subtract 1
        top_el = document.querySelector("#night-pane-top-" + (period.number - 1));
        bottom_el = document.querySelector("#night-pane-bottom-" + (period.number - 1));
    };

    // add icon, temp, cond to top pane
    top_el.appendChild(icon_el);
    top_el.appendChild(temp_el);
    top_el.appendChild(cond_el);

    parent_el.appendChild(top_el);

    // add wind, rel_hum, detail forecast to bottom pane - REMOVED FOR NOW
    // bottom_el.appendChild(wind_el);
    // bottom_el.appendChild(rel_hum_el);
    // bottom_el.appendChild();
}

function build_accordion_body_section(parent_el, period, hourly_data) {
    let acc_body_section = document.createElement("div");
    acc_body_section.id = "acc-body-section-" + period.number;
    acc_body_section.classList.add("acc-body-section");

    // detailed forecast
    let dFore = document.createElement("div");
    dFore.textContent = period.detailedForecast;
    dFore.classList.add("detailed-forecast");

    // graph
    let graph_el = document.createElement("div");
    graph_el.id = "graph-" + period.number;
    graph_el.classList.add("graph-div");
    console.log("Period number:" + period.number);

    acc_body_section.appendChild(graph_el);        
    acc_body_section.appendChild(dFore);
    parent_el.appendChild(acc_body_section);

    hourly_chart(hourly_data.properties.periods, period)

    return acc_body_section;

}

function build_icon(period, icon_el, meteocons_day, meteocons_night) {

    icon_el.innerHTML = "";

    let single_icon = true;
    if (period.shortForecast.includes("then")){
        single_icon = false;
    }
    let icon_img;
    if(single_icon){
        icon_img = document.createElement("img");
        icon_img.classList.add("icon-img");
        icon_img.src = get_icon(period.shortForecast, period.isDaytime,
                                meteocons_day, meteocons_night);

    } else {
        // container for 2 icons. full height of row, let the width set automatically 
        // when 2 icons are added to it
        let icons_con = document.createElement("div");
        icons_con.style.height = "100%";
        icons_con.style.width = "100px";

        // split shortForecast text on "then"
        let sFore_split = period.shortForecast.split(" then ");
        let cond_1 = sFore_split[0];
        let cond_2 = sFore_split[1];

        let icon_img_top = document.createElement("div");
        icon_img_top.style.height = "50%";
        icon_img_top.style.display = "flex";
        icon_img_top.style.justifyContent = "left";

        let icon_top_1 = document.createElement("img");
        icon_top_1.height = "50";
        icon_top_1.width = "50";
        icon_top_1.src = get_icon(cond_1, period.isDaytime, meteocons_day, meteocons_night);
        icon_img_top.appendChild(icon_top_1);

        let icon_img_bottom = document.createElement("div");
        icon_img_bottom.style.height = "50%";
        icon_img_bottom.style.display = "flex";
        icon_img_bottom.style.justifyContent = "right";
        
        let icon_bot_2 = document.createElement("img");
        icon_bot_2.height = "50";
        icon_bot_2.width = "50";
        icon_bot_2.src = get_icon(cond_2, period.isDaytime, meteocons_day, meteocons_night);
        icon_img_bottom.appendChild(icon_bot_2);

        icons_con.appendChild(icon_img_top);
        icons_con.appendChild(icon_img_bottom);

        icon_img = icons_con;
    }

    icon_el.appendChild(icon_img);

    return icon_el;
}


let boxes = false
function toggle_boxes() {
    if(boxes){
        for(div of document.querySelectorAll("div")){
            div.style.border = "0px solid black";
        }
        boxes = false;
    } else {
        for(div of document.querySelectorAll("div")){
            div.style.border = "1px solid black";
        }
        boxes = true;
    }
}


async function get_cities() {
    // cities data
    const city_fetch = await fetch("./data/city_coords.csv");
    const city_body = await city_fetch.text();
    let cities = Papa.parse(city_body);

    // activate city search button
    let go = document.querySelector("#location_go");
    go.disabled = false;

    // add cities to datalist
    let datalist = document.querySelector("#cities_list");
    let html_str = ""
    for(city of cities.data){
        html_str += "<option>" + city[0] + ", " + city[1] + "</option>";
    }

    datalist.innerHTML = html_str;

    console.log("cities");
    console.log(cities);

    return cities;
}


async function update_data(cities) {
    console.log("Updating data")
    // make loading icon visible
    let loader = document.querySelector("#loader");
    loader.classList.toggle("visually-hidden");

    // get value of location input
    let loc_in = document.querySelector("#location-input");
    let new_loc = loc_in.value;
    let new_cities = await cities;

    // get coordinates of location
    let new_loc_split = new_loc.split(", ");
    let new_city_name = new_loc_split[0];
    let new_state_name = new_loc_split[1];
    let new_city = new_cities.data.filter(
        (city) => (city[0] == new_city_name && city[1] == new_state_name));
    console.log(new_city)

    let new_lat = new_city[0][2];
    let new_lon = new_city[0][3];

    // construct new URL
    // use api to get grid nums of new lat lon
    let new_points_url = "https://api.weather.gov/points/" + new_lat + "," + new_lon;
    console.log(new_points_url)

    // fetch data
    let new_points_resp = await fetch(new_points_url);
    let new_points_data = await new_points_resp.json();
    let new_url = new_points_data.properties.forecast;
    console.log(new_url);

    let new_data_resp = await fetch(new_url);
    let new_data = await new_data_resp.json();
    console.log(new_data)

    let new_periods = new_data.properties.periods;

    // update page elements
    // document.querySelector("")
    // icon
    for(nPeriod of new_periods) {
        let icon_el = document.querySelector("#icon-" + nPeriod.number);
        build_icon(nPeriod, icon_el, meteocons_day, meteocons_night);
    }

    // temperature
    for(nPeriod of new_periods) {
        let temp_text = document.querySelector("#temp-" + nPeriod.number);
        temp_text.innerHTML = nPeriod.temperature + "&deg;"
    }

    // conditions
    for(nPeriod of new_periods) {
        let cond_text = document.querySelector("#cond-" + nPeriod.number);
        cond_text.innerHTML = nPeriod.shortForecast;
    }

    // graph

    // disable loader
    loader.classList.toggle("visually-hidden");
    console.log("done updating data")
}


function hourly_chart(h_periods, period) {
    
    let period_number = period.number;

    let canv = document.createElement("canvas");
    canv.classList.add("chart-canvas");
    let graph_div = document.querySelector("#graph-" + period_number);
    graph_div.appendChild(canv);

    // set up datasets
    //
    // get hourly forecasts for the current period
    let period_start_time = period.startTime;
    let period_end_time = period.endTime;

    // get first index
    let hour_indices_start;
    if(period.number == 1){
        hour_indices_start = 0;
    } else {
        // filter returns an array, so we get the first item in that array
        let period_start_hour_array = h_periods.filter((h_period) => h_period.startTime == period_start_time)[0];
        hour_indices_start = h_periods.indexOf(period_start_hour_array) - 1;
    }

    // get last index
    // filter returns an array, so we get the first item in that array
    let period_end_hour_array = h_periods.filter((h_period) => h_period.startTime == period_end_time)[0];
    let hour_indices_end = h_periods.indexOf(period_end_hour_array) - 1;

    let hourly_periods = h_periods.slice(hour_indices_start, hour_indices_end);
    if(hourly_periods.length == 0){hourly_periods = [h_periods[0]]};

    // get temperature and time for each hour
    let temps = []
    let times = []
    let chance_precips = []
    for(period of hourly_periods) {
        temps.push(period.temperature);
        times.push(period.startTime);
        let cha_prec = (() => {if(period.probabilityOfPrecipitation.value==0) {return NaN} 
                    else {return period.probabilityOfPrecipitation.value}})();
        // let cha_prec = period.probabilityOfPrecipitation.value;
        chance_precips.push(cha_prec);
    }
    console.log(temps);
    console.log(times);
    console.log(chance_precips);

    // get times as HHam/HHpm
    let times_pretty = [];
    for(time of times){
        // get time from period.startTime
        let date_ts = Date.parse(time);
        let date = new Date(date_ts);
        let hour24 = date.getHours() + 1;
        let am_pm = "am";
        let hour = hour24;
        if(hour24 > 12){hour = hour24 - 12; am_pm = "pm"};
        times_pretty.push(hour + am_pm)
    }

    // fill in NAs for time spans that are not full. For the first period (coinciding with right now) there
    // may not be 12 hours worth of data. Want to make the chart look the same anyway (with no bars for missing hours).
    if (times_pretty.length < 12) {
        let num_missing = 12 - times_pretty.length;
        for(i of [...Array(num_missing).keys()]) {
            let z = 12 - num_missing - i;
            times_pretty.splice(0, 0, '');
            temps.splice(0, 0, NaN);
        }
    }

    // let ymax = Math.max(temps) + 0.1 * Math.max(temps);
    let ymax = Math.max(...temps.filter((temp) => !isNaN(temp)));
    let y_scale_max = 1.3 * ymax;
    console.log(ymax)

    // build chart
    Chart.defaults.color = "white";
    Chart.defaults.backgroundColor = "rgba(255, 255, 255, 0.25)";
    Chart.register(ChartDataLabels);

    new Chart(canv,
        {
            type: "bar",
            data: {
                labels: times_pretty,
                datasets: [{
                    label: "Temp",
                    data: temps
                    // order: 1
                },
                {
                    label: "Precip",
                    data: chance_precips,
                    type: "line",
                    borderColor: "#7ad0f0"
                    // order: 0
                }
            ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                // interaction: {
                //     intersect: false,
                //     mode: 'index',
                // },
                color: "white",
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawOnChartArea: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        display: false,
                        max: y_scale_max
                    }
                },
                plugins: {
                    datalabels: {
                        color: function(context) {
                            return context.dataset.borderColor;
                        },
                        // color: "white",
                        anchor: "end",
                        align: "end",
                        offset: 2,
                        formatter: (value) => { return !isNaN(value) ? value : '' },
                    },
                    legend: {
                        display: false
                    },
                    title: {
                        display: false,
                        text: "Hourly Forecast"
                    }
                },
                animation: false,
                layout: {
                    padding: {
                        top: 10
                    }
                }
            }
        }
    )
}



function get_icon(shortForecast, isDaytime, meteocons_day, meteocons_night){
    if(isDaytime){
        if (meteocons_day[shortForecast] != undefined) {
            return "./meteocons/" + meteocons_day[shortForecast];
        }
        else {
            return "./meteocons/code-red.png"
        }

    } else {
        if (meteocons_night[shortForecast] != undefined) {
            return "./meteocons/" + meteocons_night[shortForecast];
        }
        else {
            return "./meteocons/code-red.png"
        }
    }
}

async function enter_loc(cities) {
    if(event.key == "Enter") {
        let loc_in = document.querySelector("#location-input");
        let in_text = loc_in.value;
        console.log(await cities)
        let cities_resolved = await cities;
        for(city of cities_resolved.data){
            if(city[0].includes(in_text)){
                loc_in.value = city[0] + ", " + city[1];
            }
        }
        update_data(cities)
    }
}

function range(min, max) {
    var len = max - min + 1;
    var arr = new Array(len);
    for (var i=0; i<len; i++) {
      arr[i] = min + i;
    }
    return arr;
  }