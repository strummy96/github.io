let meteocons_day = {
    "Sunny": "clear-day.png",
    "Mostly Sunny": "clear-day.png",
    "Partly Cloudy": "partly-cloudy-day.png",
    "Mostly Cloudy": "cloudy.png",
    "Cloudy": "overcast.png",
    "Overcast": "overcast.png",

    "Slight Chance Light Rain": "partly-cloudy-day-drizzle.png",
    "Chance Light Rain": "partly-cloudy-day-drizzle.png",
    "Light Rain Likely": "drizzle.png",
    "Light Rain": "drizzle.png",

    "Chance Rain Showers": "partly-cloudy-day-drizzle.png",

    "Showers And Thunderstorms": "thunderstorms-rain.png",
    "Showers And Thunderstorms Likely": "thunderstorms-overcast-rain.png",

    "Areas Of Fog": "fog-day.png",
}

let meteocons_night = {
    "Sunny": "clear-night.png",
    "Partly Cloudy": "partly-cloudy-night.png",
    "Mostly Cloudy": "cloudy.png",
    "Overcast": "overcast.png",

    "Slight Chance Light Rain": "partly-cloudy-night-drizzle.png",
    "Chance Light Rain": "partly-cloudy-night-drizzle.png",
    "Light Rain Likely": "drizzle.png",
    "Light Rain": "drizzle.png",

    "Chance Rain Showers": "overcast-night-drizzle.png",
    "Showers And Thunderstorms": "thunderstorms-night-rain.png",
    "Showers And Thunderstorms Likely": "thunderstorms-overcast-rain.png",

    "Areas Of Fog": "fog-night.png"
}

async function get_cities() {
    // cities data
    const city_fetch = await fetch("https://raw.githubusercontent.com/strummy96/websites/main/weather4u/data/city_coords.csv");
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

    init(cities)

    return cities;
}

async function get_data() {
    
    // forecast data
    wakefield_url = "https://api.weather.gov/gridpoints/BOX/64,46/forecast"
    const resp = await fetch(wakefield_url);
    const data = await resp.json();
    console.log(data);
    let periods = data.properties.periods;

    // get list of days
    let num_tiles;
    let day_names;
    if(periods[0].name == "Today" || periods[0].name == "This Afternoon"){
        num_tiles = 8; day_names = "even"};
    if(periods[0].name == "Tonight"){
        num_tiles = 7; day_names = "odd"};
    let tiles = [...Array(num_tiles).keys()];

    let tile_container = document.querySelector("#tile-container");

    // loop through all 14 periods
    for (const [index, period] of periods.entries()){

        // if period is daytime or we're on the first period (which may be night), 
        // build a tile, which contains both a day and night element
        if(period.isDaytime || period.number == 1){

            let period_name = period.name;

            // create tile with title and panes
            let tile_el = document.createElement("div");
            tile_el.id = period_name + "_tile";
            tile_el.style.width = "75%";
            tile_el.classList.add("tile");

            // title
            let tile_title = document.createElement("div");
            tile_title.id = period_name + "_title";
            tile_title.innerHTML = period_name;

            // panes container
            let panes_container = document.createElement("div");
            panes_container.id = period_name + "_panes_container";
            panes_container.style.display = "inline-flex";
            panes_container.style.width = "100%";

            // day pane
            let day_pane = document.createElement("div");
            day_pane.classList.add("day-night-pane");
            let day_pane_top = document.createElement("div");
            day_pane_top.classList.add("flex-row-container-left");
            day_pane_top.id = "day-pane-top-" + period.number;
            let day_pane_bottom = document.createElement("div");
            day_pane_bottom.classList.add("flex-row-container");
            day_pane_bottom.id = "day-pane-bottom-" + period.number;

            // night pane
            let night_pane = document.createElement("div");
            night_pane.classList.add("day-night-pane");
            let night_pane_top = document.createElement("div");
            night_pane_top.classList.add("flex-row-container-right");
            night_pane_top.id = "night-pane-top-" + period.number;
            let night_pane_bottom = document.createElement("div");
            night_pane_bottom.classList.add("flex-row-container-right");
            night_pane_bottom.id = "night-pane-bottom-" + period.number;

            // add children
            day_pane.appendChild(day_pane_top);
            day_pane.appendChild(day_pane_bottom);
            night_pane.appendChild(night_pane_top);
            night_pane.appendChild(night_pane_bottom);
            panes_container.appendChild(day_pane);
            panes_container.appendChild(night_pane);
            tile_el.appendChild(tile_title);
            tile_el.appendChild(panes_container);

            // add tile to page
            tile_container.appendChild(tile_el);

            // temps for max and min
            let temps = data.properties.periods.map(({temperature}) => temperature);

            // add content to panes - first day then night, or just night if first
            // period is night
            console.log(period.number)
            if (period.isDaytime){
                // build day pane
                build_tile_section(day_pane, period, temps, "day");

                // build night pane unless the day period is the last (number 14)
                if(period.number < 14){build_tile_section(night_pane, periods[index + 1], temps, "night")};
            }
            else {build_tile_section(night_pane, period, temps, "night")};
            
        }
    }

    // add pseudo element at end for flex formatting
    let pseudo = document.createElement("div");
    pseudo.classList.add("pseudo-element");
    tile_container.appendChild(pseudo);
}

function build_tile_section(parent_element, period, temps, day_night) {

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
    pname_el.style.width = "20%";
    pname_el.innerHTML = period.name;
    pname_el.style.textAlign = "right";
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
    temp_text.innerHTML = period.temperature + "&deg";
    temp_text.style.display = "inline";
    temp_text.style.fontSize = "3rem";

    // appending children
    temp_wrapper.appendChild(temp_text);
    temp_el.appendChild(temp_wrapper);  

    // icon
    icon_el = document.createElement("div");
    icon_el.classList.add("day-icon");

    // img
    let single_icon = true;
    if (period.shortForecast.includes("then")){
        single_icon = false;
    }
    let icon_img;
    if(single_icon){
        icon_img = document.createElement("img");
        icon_img.style.height = "100%";
        icon_img.style.maxHeight = "100px";
        icon_img.src = get_icon(period);

    } else {
        // container for 2 icons. full height of row, let the width set automatically 
        // when 2 icons are added to it
        let icons_con = document.createElement("div");
        icons_con.style.height = "100%";

        let icon_img_top = document.createElement("div");
        icon_img_top.style.height = "50%";

        let icon_top_1 = document.createElement("img");
        icon_top_1.height = "50px";
        icon_top_1.src = get_icon(period);
        
        let icon_top_2 = document.createElement("img");
        icon_top_2.height = "50px";
        icon_top_2.src = get_icon(period);

        icon_img_top.appendChild(icon_top_1);
        icon_img_top.appendChild(icon_top_2);

        let icon_img_bottom = document.createElement("div");
        icon_img_bottom.style.height = "50%";

        let icon_bot_1 = document.createElement("img");
        icon_bot_1.height = "50px";
        icon_bot_1.src = get_icon(period);
        
        let icon_bot_2 = document.createElement("img");
        icon_bot_2.height = "50px";
        icon_bot_2.src = get_icon(period);

        icon_img_top.appendChild(icon_bot_1);
        icon_img_top.appendChild(icon_bot_2);

        icons_con.appendChild(icon_img_top);
        icons_con.appendChild(icon_img_bottom);

        icon_img = icons_con;
    }

    icon_el.appendChild(icon_img);

    // short forecast (conditions)
    let cond_text = document.createElement("div");
    cond_text.innerHTML = period.shortForecast;
    cond_text.style.fontSize = "1hh";
    cond_text.style.verticalAlign = "center"

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
    rel_hum_text_el.innerHTML = rel_hum_text + " %";

    rel_hum_wrapper.appendChild(rel_hum_circle);
    rel_hum_wrapper.appendChild(rel_hum_text_el);
    rel_hum_el.appendChild(rel_hum_wrapper);

    // wind
    wind_el = document.createElement("div");
    wind_el.classList = "data flex-row-container";

    let wind_dir = document.createElement("div");
    wind_dir.innerHTML = period.windDirection;
    // wind_dir.style.width = "25%";
    wind_dir.style.textAlign = "center";

    let wind_speed = document.createElement("div");
    wind_speed.innerHTML = period.windSpeed;
    wind_speed.style.textAlign = "center";
    wind_speed.style.flexGrow = 1;

    wind_el.appendChild(wind_dir)
    wind_el.appendChild(wind_speed)

    // chance of precipitation
    cha_prec_el = document.createElement("div");
    cha_prec_el.innerHTML = cha_prec_text + " %";
    cha_prec_el.classList.add("data");

    if (cha_prec_text == 0) {
        cha_prec_el.style.color = "#DEDEDE"
        }

    // add elements to tile section
    let top_el;
    let bottom_el;
    if(period.isDaytime || period.number == 1){
        top_el = document.querySelector("#day-pane-top-" + period.number);
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
    console.log(top_el)
    top_el.appendChild(icon_el);
    top_el.appendChild(temp_el);
    top_el.appendChild(cond_el);

    // add wind, rel_hum, detail forecast to bottom pane
    bottom_el.appendChild(wind_el);
    bottom_el.appendChild(rel_hum_el);
    // bottom_el.appendChild();
}

function build_hourly_table_row(period, table, min_temp, max_temp){
    const rel_hum_text = (() => {if(period.relativeHumidity.value==null) {return "0"} 
                        else {return period.relativeHumidity.value}})();
    const cha_prec_text = (() => {if(period.probabilityOfPrecipitation.value==null) {return "0"} 
                    else {return period.probabilityOfPrecipitation.value}})();

    // add cells to table
    let this_row = document.createElement("tr");
    this_row.style.height = "10px";
    this_row.style.maxHeight = "10px";

    // get time from period.startTime
    let date_ts = Date.parse(period.startTime);
    let date = new Date(date_ts);
    let hour24 = date.getHours() + 1;
    let am_pm = "am";
    let hour = hour24;
    if(hour24 > 12){hour = hour24 - 12; am_pm = "pm"};

    // period name i.e. "Tuesday Night"
    let pname_el = document.createElement("td");
    pname_el.style.width = "15%";
    pname_el.innerHTML = hour + ":00" + am_pm;        
    pname_el.style.textAlign = "right";
    pname_el.style.padding = "5px";
    
    // temperature element - includes wrapper, bar, and text
    temp_el = document.createElement("td");
    temp_el.classList.add("data");
    temp_el.style.width = "20%";

    // wrapper for bar and temp
    let temp_wrapper = document.createElement("td");
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
    temp_text.innerHTML = period.temperature + "&deg";
    temp_text.style.display = "inline";
    temp_text.style.fontSize = "1.5em";
    // temp_text.style.flexBasis = "20%";

    // appending children
    temp_bar_con.appendChild(temp_bar);
    temp_wrapper.appendChild(temp_bar_con);
    temp_wrapper.appendChild(temp_text);
    temp_el.appendChild(temp_wrapper);

    // relative humidity
    rel_hum_el = document.createElement("td");
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
    rel_hum_text_el.innerHTML = rel_hum_text + " %";

    rel_hum_wrapper.appendChild(rel_hum_circle);
    rel_hum_wrapper.appendChild(rel_hum_text_el);
    rel_hum_el.appendChild(rel_hum_wrapper);

    // wind
    wind_el = document.createElement("td");
    wind_el.innerHTML = period.windDirection + " " + period.windSpeed;
    wind_el.classList.add("data");
    wind_el.style.textAlign = "left";

    // chance of precipitation
    cha_prec_el = document.createElement("td");
    cha_prec_el.innerHTML = cha_prec_text + " %";
    cha_prec_el.classList.add("data");

    if (cha_prec_text == 0) {
        cha_prec_el.style.color = "#DEDEDE"
    }

    // short forecast (conditions)
    cond_el = document.createElement("td");
    cond_el.innerHTML = period.shortForecast;
    cond_el.style.flexGrow = 1;

    this_row.appendChild(pname_el);
    this_row.appendChild(temp_el);
    this_row.appendChild(rel_hum_el);
    this_row.appendChild(wind_el);
    this_row.appendChild(cha_prec_el);
    this_row.appendChild(cond_el);
    table.appendChild(this_row);

    // return hour24 so we can get next 24 hours
    return hour24;
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


function showCity(pCities) {
    let in_city = document.querySelector("#location_input").value;
    let city_loc = pCities.data.filter((city) => city[0] == in_city);
    let loc_out = document.querySelector("#loc_out");
    loc_out.innerHTML = city_loc[0][1] + ", " + city_loc[0][2];
}

function init(cities) {
    document.querySelector("#location_go").onclick = function(){showCity(cities)}
}

function hourly_chart(periods) {
    let x = [];
    let y = [];
    for (period of periods.slice(0,23)){
        x.push(period.startTime);
        y.push(period.temperature);
    }

    let data = [
        {
            x: x,
            y: y,
            type: 'bar'
        }
    ];
    Plotly.newPlot('hourly-chart', data)
}

function get_icon(period_param){
    if(period_param.isDaytime){
        if (meteocons_day[period_param.shortForecast] != undefined) {
            return "./meteocons/" + meteocons_day[period_param.shortForecast];
        }
        else {
            return "./meteocons/code-red.png"
        }

    } else {
        if (meteocons_night[period_param.shortForecast] != undefined) {
            return "./meteocons/" + meteocons_night[period_param.shortForecast];
        }
        else {
            return "./meteocons/code-red.png"
        }
    }
}

