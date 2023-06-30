// functions for interacting with the map

var set_cursor = function() {
	var cursor_button = document.getElementById('cursor_but')
	if (cursor_button.textContent=='Choose Locations'){
		// document.body.style.cursor = "url('./target.png'), auto";
		L.DomUtil.addClass(map._container, 'crosshair-cursor-enabled')
		cursor_button.textContent = 'Stop Choosing';
		cursor_button.style = "background-color: red; color: white"
	}
	else if (cursor_button.textContent=='Stop Choosing') {
		// document.body.style.cursor = "";
		L.DomUtil.removeClass(map._container, 'crosshair-cursor-enabled')
		cursor_button.textContent = 'Choose Locations';
		cursor_button.style = "background-color: blue; color: white"
	}
}


