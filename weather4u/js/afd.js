const afd_url = "https://api.weather.gov/products/types/AFD/locations/BOX"

const b_words = [
    "HOT",
    "HEAT",
    "WARM",
    "WARMTH",
    "MILD",
    "COOL",
    "COLD",

    " RAIN ",
    "RAINY",
    " SHOWER ",
    "SHOWERS",
    "DRY",

    "THUNDERSTORM ",
    "THUNDERSTORMS",
    "LIGHTNING",
    "INSTABILITY",
    "STORMS",

    " STRONG ",
    "SEVERE",
    "UNSETTLED",

    "WINDY",
    "BREEZY",
    "BREEZE",

]

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

        if(section.includes("SYNOPSIS")){
            let section_splitlines = section.split(/[\r\n]+/);
            
            let syn_acc_button = document.querySelector("#synopsis-acc-button");
            for(line of section_splitlines){
                if(line.includes("SYNOPSIS")){syn_acc_button.innerHTML = line; 
                    section.replace(line, '');
                    break}
            }
            
            let acc_synopsis = document.querySelector("#acc-synopsis");
            acc_synopsis.innerHTML = "<p style='white-space: pre-line;'>" + 
                                        bold_words(section) + 
                                        "</p>";
        }

        if(section.includes("NEAR TERM")){
            let section_splitlines = section.split(/[\r\n]+/);
            
            let near_term_acc_button = document.querySelector("#near-term-acc-button");
            for(line of section_splitlines){
                if(line != ""){
                    near_term_acc_button.innerHTML = line; 
                    section.replace(line, '');
                    break
                }
            }
            

            let acc_near_term = document.querySelector("#acc-near-term");
            acc_near_term.innerHTML = "<p style='white-space: pre-line;'>" + 
                                        bold_words(section) + 
                                        "</p>";
        }
        
        if(section.includes("SHORT TERM")){
            let section_splitlines = section.split(/[\r\n]+/);
            
            let short_term_acc_button = document.querySelector("#short-term-acc-button");
            for(line of section_splitlines){
                if(line != ""){short_term_acc_button.innerHTML = line; 
                    section.replace(line, '');
                    break}
            }
            
            let acc_short_term = document.querySelector("#acc-short-term");
            acc_short_term.innerHTML = "<p style='white-space: pre-line;'>" + 
                                        bold_words(section) + 
                                        "</p>";
        }
        if(section.includes("LONG TERM")){
            let section_splitlines = section.split(/[\r\n]+/);
            
            let long_term_acc_button = document.querySelector("#long-term-acc-button");
            for(line of section_splitlines){
                if(line != ""){long_term_acc_button.innerHTML = line; 
                    section.replace(line, '');
                    break}
            }
            let acc_long_term = document.querySelector("#acc-long-term");
            acc_long_term.innerHTML = "<p style='white-space: pre-line;'>" + 
                                        bold_words(section) + 
                                        "</p>";
        }
    }

}

function bold_words(section) {
    let b_section = section;
    b_words.forEach((word) => {
        const regex = new RegExp(word, "i");
        b_section = b_section.replace(regex, "<strong>" + word.toLowerCase() + "</strong>");

        // capitalize first letter if necessary
        const cap_regex = new RegExp(/(?<=\. )([a-z])/, "g");
        function replacer(match) { return match.toUpperCase() }
        b_section = b_section.replace(cap_regex, replacer);
    });
    return b_section;
}

