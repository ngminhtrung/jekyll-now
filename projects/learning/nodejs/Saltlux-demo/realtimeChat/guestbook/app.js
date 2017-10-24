var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

// make an Express app
var app = express();

// tell Express that the views are in the folder "views"
app.set("views", path.resolve(__dirname,"views"));
// the views will use the EJS engine
app.set("view engine", "ejs");

// creates a global array to store all entries
var entries = [];
// make the entries array above available to all views
app.locals.entries = entries; 

// uses Morgan to log every request
app.use(logger("dev"));

// populate a variable called req.body if the user 
// is submitting a form
app.use(bodyParser.urlencoded({ extended: false }));

// when visit the siteroot, render the homepage
// at views/index.ejs
app.get("/", function(request, response) {
    response.render("index");
})

// render the "new entry" page (at views/index.ejs)
// when GETing the URL
app.get("/new-entry", function(request, response) {
    response.render("new-entry");
})

// define a route handler when you POST the "new-entry"
// URL in constrast to a GET
// this happens when you click the "Post entry" button
app.post("/new-entry", function(request, response) {
    // if user submits the form with no title
    // or no content, responds with a 400 error
    if (!request.body.title || !request.body.body) {
        response.status(400).send("Entries must have a title and a body.");
        return;
    }
    // adds a new entry to the list of entries
    entries.push({
        title: request.body.title,
        content: request.body.body,
        published: new Date()
    });
    // redirect to the homepage to see your new entry
    response.redirect("./");
});

// render a 404 page because you're requesting 
// an unknown source
app.use(function(request,response){
    response.status(404).render("404");
});

// starts the server on port 3000
http.createServer(app).listen(3000, function() {
    console.log("Guestbook app started on port 3000.");
})