async function get_data() {
    wakefield_url = "https://api.weather.gov/gridpoints/BOX/64,46/forecast"
    const resp = await fetch(wakefield_url);
    const data = await resp.json();
    console.log(data)

    // Build forecast table
    let fc_table = document.querySelector("#fc_table");
    let fc_acc = document.querySelector("#fc-accordion");

    for (const period of data.properties.periods){
        let row = document.createElement("tr");

        let period_name = document.createElement("td");
        period_name.innerHTML = period.name;
        period_name.style.textAlign = "left";
        period_name.style.paddingLeft = "5px";

        let temp = document.createElement("td");
        temp.innerHTML = period.temperature;
        
        let rel_hum = document.createElement("td");
        const rel_hum_text = (() => {if(period.relativeHumidity.value==null) {return "0"} 
                        else {return period.relativeHumidity.value}})();
        rel_hum.innerHTML = rel_hum_text
        
        let cha_prec = document.createElement("td");
        const cha_prec_text = (() => {if(period.probabilityOfPrecipitation.value==null) {return "0"} 
                        else {return period.probabilityOfPrecipitation.value}})();
        cha_prec.innerHTML = cha_prec_text

        // conditions

        row.appendChild(period_name);
        row.appendChild(temp);
        row.appendChild(rel_hum);
        row.appendChild(cha_prec);
        // fc_table.appendChild(row);

        // accordion
        let collapse_id = "collapse" + String(period.number);
        console.log(collapse_id)
        console.log(period.number)

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
        acc_header_button_div.style.width = "100%";
        acc_header_button_div.style.display = "flex";
        // acc_header_button_div.style.justifyContent = "space-around";
        acc_header_button_div.style.flexDirection = "row";

        let pname_el = document.createElement("div");
        // pname_el.style.margin = "auto"
        pname_el.style.width = "30%"
        pname_el.innerHTML = period.name;

        let temp_el = document.createElement("div");
        // temp_el.style.margin = "auto"
        temp_el.innerHTML = period.temperature;
        temp_el.classList.add("data");

        let rel_hum_el = document.createElement("div");
        // rel_hum_el.style.margin = "auto"
        rel_hum_el.innerHTML = rel_hum_text;
        rel_hum_el.classList.add("data");

        let cha_prec_el = document.createElement("div");
        // cha_prec_el.style.margin = "auto"
        cha_prec_el.innerHTML = cha_prec_text
        cha_prec_el.classList.add("data");

        acc_header_button_div.appendChild(pname_el);
        acc_header_button_div.appendChild(temp_el);
        acc_header_button_div.appendChild(rel_hum_el);
        acc_header_button_div.appendChild(cha_prec_el);
        acc_header_button.appendChild(acc_header_button_div);
        


        let acc_collapse = document.createElement("div");
        acc_collapse.id = collapse_id;
        acc_collapse.classList.add("accordion-collapse","collapse");
        acc_collapse.setAttribute("data-bs-parent", "#fc_accordion");
        
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

    const resp_hourly = await fetch(wakefield_url + "/hourly");
    const data_hourly = await resp_hourly.json();
    console.log(data_hourly)
}

get_data()


