import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import indexRouter from "./src/routes/index.js";
import apiRouter from "./src/routes/api.js"
import adminRouter from "./src/routes/admin.js"
const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

//Middleware pour parser le corps des requetes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", join(__dirname, "src", "views"));

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
