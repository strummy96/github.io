// import data
async function get_data(){
	console.log('Getting json data')
	const resp = await fetch('./data/species.json')
	const species = await resp.json()
	console.log(species)
}
get_data()
let open_to_settings = function(){
	let x = document.getElementsByClassName("open_page")
	for (let i = 0; i<3; i++){
		x[i].style.display = 'none'
		}
}

let unhide_buttons = function() {
	let x = document.getElementsByClassName("open_page")
	for (let i = 0; i<3; i++){
		x[i].style.display = 'inline'
		}
}

let multiple_choice = function() {
	let x = document.getElementsByClassName('mc_settings')
	for (let i=0; i<x.length + 1; i++) {
		x[i].style.display = 'inline'
}}

// let setup = function() {
	// import data from './data.species.json'
// console.log(data)}
	// for 
		// let newCheck = document.createElement(input, {type: "checkbox"})
		// let content = document.createTextNode(sp_name)