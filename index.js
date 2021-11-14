const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const port = 8000;
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded());

app.use(cookieParser());
app.use(expressLayouts);

//settig up static files
app.use(express.static("./assets"));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setting up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`error in loading the server :${port}`);
    return;
  }
  console.log(`System is up and running on port :${port}`);
});
