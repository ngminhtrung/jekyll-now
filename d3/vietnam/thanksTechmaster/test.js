var polyline = require('@mapbox/polyline');

// returns an array of lat, lon pairs

overview_polyline = ["yfj_Ci__eSr@gDj@cD","ycj_Cui_eSe@jC","_ej_Cie_eSEVtBBxB?nID~IC"]

data = [];

for (var i=0; i<overview_polyline.length; i++) {

    data.push(polyline.decode(overview_polyline[i]));

}


console.log(data);

// node test.js