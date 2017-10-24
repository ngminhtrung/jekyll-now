var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var ForecasteIo = require("forecastio");

var app = express();
var weather = new ForecasteIo("c9e77d2af4f3c93dac4d35a0701434e4");

// serves stati files out of public
app.use(express.static(path.resolve(__dirname,"public")));

// use EJS as the view engine,
// and serves the views out of a folder "views"
app.set("views", path.resolve(__dirname,"views"));
app.set("view engine", "ejs");

//renders the index view if yu hit the homepage
app.get("/", function(req, res) {
    res.render("index");
});

app.get(/^\/(\d{5})$/, function(req,res,next){
    var zipcode = req.param[0];
    var location = zipdb.zipcode(zipcode);
    if (!location.zipcode) {
        next();
        return;
    }

    var latitude = location.latitude;
    var longtitude = location.longtitude;

    weather.forecase(latitude,longtitude,function(err,data){
        if (err) {
            next();
            return;
        }

        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        });
    });

    console.log(res.json);
});

app.use(function(req, res){
    res.status(404).render("404");
})

app.listen(3000);
