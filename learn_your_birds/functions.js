// import data
async function get_data(){
	console.log('Getting json data')
	const resp = await fetch('https://raw.githubusercontent.com/strummy96/github.io/main/learn_your_birds/data/species.json')
	const s = await resp.json()
	console.log(s.species)
	let mc_div = document.getElementById('species_checkboxes');
	mc_div.appendChild(document.createElement('br'))
	for (let i=0; i<s.species.length; i++) {
		console.log(s.species[i])
		let newBox = document.createElement("label");
		newBox.innerHTML = "<input class='mc_settings checkbox' type='checkbox'>" + s.species[i] + "</input>";
		newBox.addEventListener("mouseover", function(){border_elem(newBox)}, true);
		newBox.addEventListener("mouseout", function(){unborder_elem(newBox)}, true);
		newBox.style.display = "none";
		newBox.className = "mc_settings";
		mc_div.appendChild(newBox)
		mc_div.appendChild(document.createElement('br'))
	}
}
get_data()
let open_to_settings = function(){
	let x = document.getElementsByClassName("open_page")
	for (let i = 0; i<3; i++){
		x[i].style.display = 'none'
		}
}

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

// let setup = function() {
	// import data from './data.species.json'
// console.log(data)}
	// for 
		// let newCheck = document.createElement(input, {type: "checkbox"})
		// let content = document.createTextNode(sp_name)
		
function border_elem(x) {
	x.style.border = "solid #000000"}
	
function unborder_elem(x) {
	x.style.border = "none"}
	
function main_menu(){
	let mm_elems = document.getElementsByClassName('open_page')
	for(i=0;i<mm_elems.length;i++){mm_elems[i].style.display="inline"}
	let x = document.getElementsByClassName('mc_settings');
	for(i=0;i<x.length;i++){
		x[i].style.display = 'none'
	}
}