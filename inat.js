// iNaturalist observations
      
const url='https://api.inaturalist.org/v1/observations?' + 				 
'place_id=8&user_login=sethstrumwasser&per_page=200&order=desc&order_by=created_at';


async function myFunc() {
    // get inat data
    const resp = await fetch(url)
    const inat_json = await resp.json()
    console.log(inat_json)

    // build GeoJSON 
    const test_coords = inat_json['results']['0']['location']
    const lon = parseFloat(test_coords.split(',')[0])
    const lat = parseFloat(test_coords.split(',')[1])
    console.log(lat)
    console.log(lon)
    const obs_json = {
        "type":"FeatureCollection",
            "crs":{"type":"name","properties":{"name":"EPSG:4326"}},
            "features":[]}
    for (let step = 0; step < 200; step++) {
        const obs = inat_json['results'][String(step)];
        obs_json.features[step] = obs
        obs_json.features[step]["type"] = "Feature"
        obs_json.features[step]["geometry"] = {"type":"Point", "coordinates":obs_json.features[step]["geojson"]["coordinates"]}
    }

    console.log(obs_json)

    const inat_geojson_text = 
    '{"type":"FeatureCollection",' +
        '"crs":{"type":"name","properties":{"name":"EPSG:4326"}},' +
        '"features":[' +
            '{"type":"Feature",' +
            '"geometry": {'+
                '"type":"Point",'+
                '"coordinates":[' + String(lat) + ',' + String(lon) + ', 0] },'+
        '"properties": {"name": "Seths observation"}}]}'
    const inat_geojson_JSON = JSON.parse(inat_geojson_text)
    console.log(inat_geojson_JSON)
    L.geoJSON(obs_json).addTo(map)
    }
myFunc()