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
		newLabel.style.display = "none";
		newLabel.style.margin = "2px";
		// newLabel.style.padding = "3px";
		newLabel.className = "mc_settings sp_cbox_label default_display_block";
		
		let newSpan = document.createElement("span");
		newSpan.className = "sp_cbox_span mc_settings";
		// newSpan.style.padding = "3px";

		newLabel.appendChild(newIn);
		newLabel.appendChild(newSpan);
		mc_div.appendChild(newLabel);
	}

	localStorage.setItem("spp_list", s.species)
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
	// store quiz settings in localStorage
	localStorage.setItem("my_test", "my_data")
	// localStorage.setItem("spp", spp)

	window.location.href = "mc_quiz.html"
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

// function to make a class of elements visible and hide all others
let set_active_elems = function(new_active_class, new_display) {

	let show_elems = document.querySelectorAll("." + new_active_class);
	show_elems.forEach(function(currentValue){
		console.log(currentValue)
		currentValue.style.display = 'block';
	})

	let hide_elems = document.querySelectorAll("." + active_class);
	hide_elems.forEach(function(currentValue){
		console.log(currentValue)
		currentValue.style.display = 'none';
	})

	// set active_class placeholder to new active class
	active_class = new_active_class;

}

