const afd_url = "https://api.weather.gov/products/types/AFD/locations/BOX"

async function get_afd() {
    const resp = await fetch(afd_url);
    const data = await resp.json();
    console.log(data);

    let last_afd = data["@graph"][0].id;

    let prod_url = "https://api.weather.gov/products/";
    let last_afd_url = prod_url + last_afd;

    const last_afd_resp = await fetch(last_afd_url);
    const last_afd_data = await last_afd_resp.json();

    // Build AFD sections
    let afd_split = last_afd_data.productText.split("&&")

    for(section of afd_split){
        // remove credits section
        if(section.includes("$$")){
            continue
        }
        if(section.includes("NEAR TERM")){
            let section_splitlines = section.split(/[\r\n]+/);
            
            let near_term_acc_button = document.querySelector("#near-term-acc-button");
            for(line of section_splitlines){
                if(line){near_term_acc_button.innerHTML = line; 
                    section.replace(line, '');
                    break}
            }
            

            let acc_near_term = document.querySelector("#acc-near-term");
            acc_near_term.innerHTML = "<p style='white-space: pre-line;'>" + 
                                        section + 
                                        "</p>";
        }
        if(section.includes("SHORT TERM")){
            let section_splitlines = section.split(/[\r\n]+/);
            
            let near_term_acc_button = document.querySelector("#short-term-acc-button");
            for(line of section_splitlines){
                if(line){near_term_acc_button.innerHTML = line; 
                    section.replace(line, '');
                    break}
            }
            
            let acc_short_term = document.querySelector("#acc-short-term");
            acc_short_term.innerHTML = "<p style='white-space: pre-line;'>" + 
                                        section + 
                                        "</p>";
        }
        if(section.includes("LONG TERM")){
            let section_splitlines = section.split(/[\r\n]+/);
            
            let near_term_acc_button = document.querySelector("#long-term-acc-button");
            for(line of section_splitlines){
                if(line){near_term_acc_button.innerHTML = line; 
                    section.replace(line, '');
                    break}
            }
            let acc_long_term = document.querySelector("#acc-long-term");
            acc_long_term.innerHTML = "<p style='white-space: pre-line;'>" + 
                                        section + 
                                        "</p>";
        }
    }

}