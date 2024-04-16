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
    pname_el.textContent = hour + ":00" + am_pm;        
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
    temp_text.innerHTML = period.temperature + "&deg;";
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
    rel_hum_text_el.textContent = rel_hum_text + " %";

    rel_hum_wrapper.appendChild(rel_hum_circle);
    rel_hum_wrapper.appendChild(rel_hum_text_el);
    rel_hum_el.appendChild(rel_hum_wrapper);

    // wind
    wind_el = document.createElement("td");
    wind_el.textContent = period.windDirection + " " + period.windSpeed;
    wind_el.classList.add("data");
    wind_el.style.textAlign = "left";

    // chance of precipitation
    cha_prec_el = document.createElement("td");
    cha_prec_el.textContent = cha_prec_text + " %";
    cha_prec_el.classList.add("data");

    if (cha_prec_text == 0) {
        cha_prec_el.style.color = "#DEDEDE"
    }

    // short forecast (conditions)
    cond_el = document.createElement("td");
    cond_el.textContent = period.shortForecast;
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