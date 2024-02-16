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
		
		let newBox = document.createElement("label");
		newBox.innerHTML = s.species[i]
		newBox.htmlFor = s.species[i]
		newBox.addEventListener("mouseover", function(){border_elem(newBox)}, true);
		newBox.addEventListener("mouseout", function(){unborder_elem(newBox)}, true);
		newBox.style.display = "none";
		newBox.className = "mc_settings sp_cbox_label";
		
		let newSpan = document.createElement("span");
		newSpan.className = "sp_cbox_span"
		newBox.appendChild(newSpan)
		mc_div.appendChild(newIn);
		mc_div.appendChild(newBox);
		mc_div.appendChild(document.createElement('br'))
	}
}

get_data()

// things to do when 'Multiple Choice' button is clicked
let multiple_choice = function() {
	// make multiple choice elements visible
	let x = document.getElementsByClassName('mc_settings');
	for(i=0;i<x.length;i++){
		x[i].style.display = 'inline'
	}
	// make main menu elements invisible
	let y = document.getElementsByClassName('open_page');
	for(i=0;i<y.length;i++){
		y[i].style.display = 'none'
	}
	let but=document.getElementById('back_to_mm'); but.style.display="inline"
}

// functions for highlight on hover
function border_elem(x) {x.style.border = "solid #000000"}
function unborder_elem(x) {x.style.border = "none"}
	
function main_menu(){
	let mm_elems = document.getElementsByClassName('open_page')
	for(i=0;i<mm_elems.length;i++){mm_elems[i].style.display="inline"}
	let x = document.getElementsByClassName('mc_settings');
	for(i=0;i<x.length;i++){
		x[i].style.display = 'none'
	}
}

function mc_quiz(){
	// get list of species to include
	let cboxes = document.getElementsByClassName('sp_cbox')
	let spp = []

	for (i=0;i<cboxes.length;i++) {
		console.log(cboxes[i].checked); 

		if(cboxes[i].checked){
			spp.push(cboxes[i].id)
		}
	}
	console.log(spp)
	
	// hide mc_settings elements
	let x = document.getElementsByClassName('mc_settings');
	for(i in Array.from(x)){
		x[i].style.display = 'none'
	}
	
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
	console.log(sp_cboxes)

	let sp_cboxes_arr = Array.from(sp_cboxes)
	console.log(sp_cboxes_arr)

	for(i in sp_cboxes_arr) {

		// TO DO: make order random, expand list of possible birds
		name_from_list = sp_cboxes_arr[i].name;
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

