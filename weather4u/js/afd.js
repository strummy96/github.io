fetch("https://api.weather.gov/products/types/AFD/locations/BOX")
    .then(resp => resp.json())
    .then(console.log(resp))