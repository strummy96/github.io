let active_class = "open_page"

// import data
async function get_data(){
	// pull in list of species
	const resp = await fetch('https://raw.githubusercontent.com/strummy96/github.io/main/learn_your_birds/data/species.json')
	const s = await resp.json()
	console.log(s.species)
	
	// add a checkbox element for each species
	let mc_div = document.getElementById('species_checkboxes');
	mc_div.appendChild(document.createElement('br'))
	for (let i=0; i<s.species.length; i++) {
		let newIn = document.createElement('input');
		newIn.type = "checkbox";
		newIn.id = s.species[i];
		newIn.name = s.species[i];
		newIn.className = "mc_settings sp_cbox"
		newIn.checked = true;
		
		let newLabel = document.createElement("label");
		newLabel.innerHTML = s.species[i]
		newLabel.htmlFor = s.species[i]
		// newLabel.addEventListener("mouseover", function(){border_elem(newLabel)}, true);
		// newLabel.addEventListener("mouseout", function(){unborder_elem(newLabel)}, true);
		newLabel.style.display = "none";
		newLabel.style.margin = "2px";
		// newLabel.style.padding = "3px";
		newLabel.className = "mc_settings sp_cbox_label";
		
		let newSpan = document.createElement("span");
		newSpan.className = "sp_cbox_span";
		// newSpan.style.padding = "3px";

		newLabel.appendChild(newIn);
		newLabel.appendChild(newSpan);
		mc_div.appendChild(newLabel);
	}
}

get_data()

// things to do when 'Multiple Choice' button is clicked
let multiple_choice = function() {
	
	set_active_elems(new_active_class="mc_settings", new_display="block")

}

// functions for highlight on hover
function border_elem(x) {x.style.border = "solid #000000 2px"; x.style.margin = "0px"}
function unborder_elem(x) {x.style.border = "none";  x.style.margin = "2px"}
	
function main_menu(){
	set_active_elems(new_active_class="open_page", new_display="block")
}

let mc_quiz = function(){
	window.location.href = "mc_quiz.html"

	// get list of species to include
	let cboxes = document.getElementsByClassName('sp_cbox')
	let spp = []

	for (i=0;i<cboxes.length;i++) {
		if(cboxes[i].checked){
			spp.push(cboxes[i].id)
		}
	}
	console.log(spp)
	
	// hide mc_settings elements
	set_active_elems(new_active_class="mc_quiz", new_display="block")
	
	// create quiz page elements
	let mc_quiz_div = document.getElementById("mc_quiz_div");
	let mc_img = document.createElement("img");
	mc_img.className = "mc_img_class mc_quiz";
	mc_img.width = 400;
	mc_quiz_div.appendChild(mc_img);
	mc_quiz_div.appendChild(document.createElement('br'));
	
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
	let mc_buttons_div = document.createElement("div");
	
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

		mc_quiz_div.appendChild(b_button);
		mc_quiz_div.appendChild(document.createElement('br'));
	}

	// 

}

let check_answer_mc = function(answer, correct_answer, button_clicked) {

	// checks whether a given answer in multiple choice is correct
	console.log("Correct answer: " + correct_answer)

	if (answer === correct_answer) {
		console.log("Correct!")

		// change button color
		button_clicked.style.background = "green";
		
	} else {
		console.log("Wrong! Try again.");
		button_clicked.style.background = "red";
	}
}

let next_page_mc = function() {
	console.log("Next Page placeholder")
}
let previous_page_mc = function() {
	console.log("previous Page placeholder")
}

let not_mc = document.querySelectorAll(":not(.mc_quiz)")
console.log(not_mc)

// function to make a class of elements visible and hide all others
let set_active_elems = function(new_active_class, new_display) {

	let show_elems = document.querySelectorAll("." + new_active_class);
	show_elems.forEach(function(currentValue){
		currentValue.style.display = new_display;
	})

	let hide_elems = document.querySelectorAll("." + active_class);
	hide_elems.forEach(function(currentValue){
		currentValue.style.display = 'none';
	})

	// set active_class placeholder to new active class
	active_class = new_active_class;

}

