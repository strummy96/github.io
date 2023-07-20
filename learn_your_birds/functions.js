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
		newBox.className = "mc_settings";
		mc_div.appendChild(newIn);
		mc_div.appendChild(newBox);
		mc_div.appendChild(document.createElement('br'))
	}
}

get_data()

// things to do when 'Multiple Choice' button is clicked
let multiple_choice = function() {
	let x = document.getElementsByClassName('mc_settings');
	for(i=0;i<x.length;i++){
		x[i].style.display = 'inline'
	}
	let y = document.getElementsByClassName('open_page');
	for(i=0;i<y.length;i++){
		y[i].style.display = 'none'
	}
	let but=document.getElementById('back_to_mm'); but.style.display="inline"
}

// functions for highligh on hover
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
		if(cboxes[i].checked){spp.push(cboxes[i].id)}
	}
	console.log(spp)
}
		