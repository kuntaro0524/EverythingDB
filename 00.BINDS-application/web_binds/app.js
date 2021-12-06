
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

/* normally required */
app.use(bodyParser.urlencoded({
  extended: true
}));

/* JSONデータを読むために必要 */
app.use(bodyParser.json());

/* Mongoose DB を読み込む */
mongoose.connect("mongodb://localhost:27017/binds", {
  useNewUrlParser: true
});

app.use(express.static("public"));

var cors = require('cors');
app.use(cors());

const app_schema = {
        "id" : Number ,
        "oldid" : String,
        "pdis" : String,
        "consul_date" : String,
        "apply_date" : String,
        "start_date" : String,
        "complete_date" : String,
        "category" : String,
        "status" : String,
        "username" : String,
        "email" : String,
        "affiliation" : String,
        "affiliation2" : String,
        "position" : String,
        "beamtime_id" : String,
        "title" : String,
        "amed_related" : String,
        "division" : String,
        "designated_staff_name" : String,
        "corresponding_division" : String,
        "main_staff" : String,
        "division_pi" : String,
        "corresponding_division2" : String,
        "sub_staffs" : String,
        "isRieki" : String 
 }

/* definitions of data record on the database: 'mesurements'*/
const AppInfo = mongoose.model("pppp", app_schema, 'application');

app.get("/allapp", function(req, res) {
   AppInfo.find(function(err, foundItems) {
	res.send(foundItems);
   });
});


// BINDS project application DB
app.listen(4649, function() {
  console.log("Server srated on port 4649")
});
