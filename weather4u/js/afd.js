const afd_url = "https://api.weather.gov/products/types/AFD/locations/BOX"

async function get_afd() {
    const resp = await fetch(afd_url);
    const data = await resp.json();
    console.log(data);

    let last_afd = data["@graph"][0].id;
    console.log(last_afd);

    let prod_url = "https://api.weather.gov/products/";
    let last_afd_url = prod_url + last_afd;

    const last_afd_resp = await fetch(last_afd_url);
    const last_afd_data = await last_afd_resp.json();
    console.log(last_afd_data);
    console.log(last_afd_data.productText);

    // Build AFD sections
    let afd_split = last_afd_data.productText.split("&&")
    console.log(afd_split)

    for(section of afd_split){
        // remove credits section
        if(section.includes("$$")){
            continue
        }
        if(section.includes("NEAR TERM")){
            let acc_near_term = document.querySelector("#acc-near-term");
            acc_near_term.innerHTML = "<p style='white-space: pre-line;'>" + 
                                        section + 
                                        "</p>";
        }
        if(section.includes("SHORT TERM")){
            let acc_short_term = document.querySelector("#acc-short-term");
            acc_short_term.innerHTML = section;
        }
        if(section.includes("LONG TERM")){
            let acc_long_term = document.querySelector("#acc-long-term");
            acc_long_term.innerHTML = section;
        }
    }

} get_afd()