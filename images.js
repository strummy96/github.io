// functions for handling images

var image_index = 0

var loadFile = function(event) {
	var image_elem = document.getElementById('output');
	var images = event.target.files
	image_elem.src = URL.createObjectURL(images[image_index]);
	document.getElementById("current_photo").textContent = "Current photo: " + images[0].textContent
};

var next_image = function(event) {
	var images = document.getElementById('file').files
	var image_elem = document.getElementById('output');
	console.log(images)
	console.log(images.length)
	if (image_index < images.length - 1) {
		image_elem.src = URL.createObjectURL(images[image_index += 1])
		}
	console.log("image_index", image_index)
	}

var previous_image = function(event) {
	var images = document.getElementById('file').files
	var image_elem = document.getElementById('output');
	if (image_index > -1) {
		image_elem.src = URL.createObjectURL(images[image_index -= 1])
		console.log("image index changed")
		}
	else {}
	console.log("image_index", image_index)
	}

var clear_images = function(event) {
	var image_elem = document.getElementById('output')
	image_elem.src = ""
	var input_elem = document.getElementById('file')
	input_elem.value = ""
	}