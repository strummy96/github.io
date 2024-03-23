async function get_data() {
    // cities data
    // const city_fetch = await fetch("./data/city_coords.csv");
    // const city_coords = await city_fetch.json();
    // console.log(city_coords)

    // forecast data
    wakefield_url = "https://api.weather.gov/gridpoints/BOX/64,46/forecast"
    const resp = await fetch(wakefield_url);
    const data = await resp.json();
    console.log(data)

    // get min and max temps
    let temps = data.properties.periods.map(({temperature}) => temperature);
    let min_temp = Math.min.apply(null, temps);
    let max_temp = Math.max.apply(null, temps);

    // Build forecast table
    let fc_table = document.querySelector("#fc_table");
    let fc_acc = document.querySelector("#fc-accordion");

    for (const period of data.properties.periods){
  
        const rel_hum_text = (() => {if(period.relativeHumidity.value==null) {return "0"} 
                        else {return period.relativeHumidity.value}})();
        const cha_prec_text = (() => {if(period.probabilityOfPrecipitation.value==null) {return "0"} 
                        else {return period.probabilityOfPrecipitation.value}})();
 
        // accordion
        let collapse_id = "collapse" + String(period.number);

        let acc_item = document.createElement("div");
        acc_item.classList.add("accordion-item");

        let acc_header = document.createElement("h2");
        acc_header.classList.add("accordion-header");

        let acc_header_button = document.createElement("button");
        acc_header_button.classList.add("accordion-button","collapsed");
        acc_header_button.type = "button";
        acc_header_button.setAttribute("data-bs-toggle","collapse");
        acc_header_button.setAttribute("data-bs-target", "#" + collapse_id);
        acc_header_button.setAttribute("aria-expanded", "true");
        acc_header_button.setAttribute("aria-controls", "#" + collapse_id);

        let acc_header_button_div = document.createElement("div");
        acc_header_button_div.classList.add("accordion-row")
        acc_header_button_div.style.width = "100%";
        acc_header_button_div.style.display = "flex";
        acc_header_button_div.style.flexDirection = "row";

        // period name i.e. "Tuesday Night"
        let pname_el = document.createElement("div");
        pname_el.style.width = "15%"
        pname_el.innerHTML = period.name;
        
        // temperature element - includes wrapper, bar, and text
        let temp_el = document.createElement("div");
        temp_el.classList.add("data");

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
        temp_bar_con.style.backgroundColor = "#DEDEDE";
        temp_bar_con.style.width = "100%";
        temp_bar_con.style.height = "80%";
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
        temp_text.innerHTML = period.temperature;
        temp_text.style.display = "inline";
        // temp_text.style.flexBasis = "20%";

        // appending children
        temp_bar_con.appendChild(temp_bar);
        temp_wrapper.appendChild(temp_bar_con);
        temp_wrapper.appendChild(temp_text);
        temp_el.appendChild(temp_wrapper);

        // relative humidity
        let rel_hum_el = document.createElement("div");
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
        console.log(typeof(period.relativeHumidity.value));
        rel_hum_circle.style.width = "0.8em";
        rel_hum_circle.style.height = rel_hum_circle.style.width;

        let rel_hum_text_el = document.createElement("div");
        rel_hum_text_el.innerHTML = rel_hum_text + " %";

        rel_hum_wrapper.appendChild(rel_hum_circle);
        rel_hum_wrapper.appendChild(rel_hum_text_el);
        rel_hum_el.appendChild(rel_hum_wrapper);

        // wind
        let wind_el = document.createElement("div");
        wind_el.innerHTML = period.windDirection + " " + period.windSpeed;
        wind_el.classList.add("data");
        wind_el.style.textAlign = "left";

        // chance of precipitation
        let cha_prec_el = document.createElement("div");
        cha_prec_el.innerHTML = cha_prec_text + " %";
        cha_prec_el.classList.add("data");

        if (cha_prec_text == 0) {
            cha_prec_el.style.color = "#DEDEDE"
        }

        // short forecast (conditions)
        let cond_el = document.createElement("div");
        cond_el.innerHTML = period.shortForecast;
        cond_el.style.width = "30%"

        acc_header_button_div.appendChild(pname_el);
        acc_header_button_div.appendChild(temp_el);
        acc_header_button_div.appendChild(rel_hum_el);
        acc_header_button_div.appendChild(wind_el);
        acc_header_button_div.appendChild(cha_prec_el);
        acc_header_button_div.appendChild(cond_el);
        acc_header_button.appendChild(acc_header_button_div);
        

        let acc_collapse = document.createElement("div");
        acc_collapse.id = collapse_id;
        acc_collapse.classList.add("accordion-collapse","collapse");
        acc_collapse.setAttribute("data-bs-parent", "#fc-accordion");
        
        let acc_body = document.createElement("div");
        acc_body.classList.add("accordion-body");
        acc_body.innerHTML = "CONTENT";

        acc_collapse.appendChild(acc_body);
        acc_header.appendChild(acc_header_button);
        acc_item.appendChild(acc_header);
        acc_item.appendChild(acc_collapse);
        fc_acc.appendChild(acc_item);

        // console.log(period)
    }

    // const resp_hourly = await fetch(wakefield_url + "/hourly");
    // const data_hourly = await resp_hourly.json();
    // console.log(data_hourly)
}

get_data()

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


let cities = Papa.parse("./data/city_coords.csv")
console.log(cities)


