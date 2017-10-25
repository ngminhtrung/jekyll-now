var express = require("express");

var app = express();

// creates an Express routing 
// for handling the GET requests
app.get("/random/:min/:max", function(req, res) {
    // parses out the numbers using 
    // built-in JavaScript parseInt function
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);

    // checks if either of numbers is NaN
    if (isNaN(min) || isNaN(max)) {
        // set the HTTP status code 400
        res.status(400);
        // send a JSON object
        res.json({error: "Bad request."});
        // with return, the next code will be ran. 
        return;
    }
    var result = Math.round((Math.random() * (max - min)) + min);
    res.json({result:result});
});

app.listen(3000, function() {
    console.log("App started on port 3000");
})