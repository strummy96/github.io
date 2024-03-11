let active_class = "mc_quiz";

window.onload = function() {
       
    // get data from localStorage
    let spp = localStorage.getItem("spp_list").replaceAll(" ","_").split(",");
    console.log(spp)

    // create quiz page elements
    let mc_quiz_div = document.getElementById("mc_quiz_container");
    let img_container = document.querySelector("#img_container");
    let mc_img = document.createElement("img");
    mc_img.className = "mc_img_class mc_quiz";
    img_container.append(mc_img);

    // get random index to pick which bird to display
    let rand_int = Math.floor(Math.random() * spp.length);

    let bird_name = spp[rand_int];
    let bird_name_underscore = bird_name.replace(" ","_")
    console.log(bird_name);
    let correct_answer = bird_name

    // update source of img element with the bird from rand_int
    mc_img.src = "https://raw.githubusercontent.com/strummy96/github.io/main/learn_your_birds/imgs/" + 
        bird_name_underscore + "/" + bird_name_underscore + ".JPG";

    // buttons and text
    let mc_choices_conatiner = document.querySelector("#mc_choices_container")	

    // pick random birds for buttons
    let bird_options = []

    let sp_cboxes = document.getElementsByClassName("sp_cbox")

    for(i in Array.from(sp_cboxes)) {

        // TO DO: make order random, expand list of possible birds
        name_from_list = sp_cboxes[i].name;
        bird_options.push(name_from_list)
    }

    // add buttons
    for (b in bird_options) {

        let b_button = document.createElement("button");
        b_button.innerHTML = bird_options[b];
        b_button.className = "mc_quiz mc_quiz_button";
        b_button.id = "mc_quiz_button_" + bird_options[b].replace(" ","_");
        b_button.onclick = function() {
            check_answer_mc(answer=b_button.innerHTML, correct_answer=correct_answer, button_clicked=b_button)
        };

        mc_choices_conatiner.appendChild(b_button);
    }

    console.log("window on load set active elems")
    set_active_elems("mc_quiz")
}

let set_active_elems = function(new_active_class, new_display) {

	let show_elems = document.querySelectorAll("." + new_active_class);
	show_elems.forEach(function(currentValue){
		console.log(currentValue)
		currentValue.style.display = 'block';
	})

	// let hide_elems = document.querySelectorAll("." + active_class);
	// hide_elems.forEach(function(currentValue){
	// 	console.log(currentValue)
	// 	currentValue.style.display = 'none';
	// })

	// set active_class placeholder to new active class
	active_class = new_active_class;

}
