var express = require("express");
var path = require("path");
var fs = require("fs");
var morgan = require("morgan");

// creats an Express application and 
// puts it inside the app variable
var app = express();

// logs all incoming requests
// app.use(function(req,res,next) {
//     console.log("Request IP: " + req.url);
//     console.log("Request data: " + new Date());
//     next();
// });
app.use(morgan("short"));

var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));

// app.use(function(req,res,next) {
//     var filePath = path.join(__dirname,"static", req.url);
//     fs.stat(filePath, function(err, fileInfo) {
//         // if fs.stat fails,
//         // continute to the next middleware
//         if (err) {
//             next();
//             return;
//         }
//         // if the file exists, call 
//         // res.sendFile
//         if (fileInfo.isFile()) {
//             res.sendFile(filePath);
//         } else {
//             // otherwise, continues to
//             // the next middleware
//             next();
//         }
//     })
// })

app.use(function(req,res) {
    res.status(404);
    res.send("File not found!");
})

app.listen(3000,function() {
    console.log("App started on port 3000!");
});