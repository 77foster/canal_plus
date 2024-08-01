const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
var indexRouter = require('./routes/index');

//Middleware pour parser le corps des requetes
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "src", "views"));

app.use('/', indexRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
