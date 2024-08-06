import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;
import indexRouter from "./src/routes/index.js";
import apiRouter from "./src/routes/api.js"
import adminRouter from "./src/routes/admin.js"

const __dirname = dirname(fileURLToPath(import.meta.url));

//Middleware pour parser le corps des requetes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", join(__dirname, "src", "views"));

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
