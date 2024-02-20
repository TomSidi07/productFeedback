// Import from Librairies
import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
// Local imports
import router from "./routes/routes.js";
// Directory stup for ES6
import { fileURLToPath } from "url";
import { dirname } from "path";
import getData from "./controllers/controller.js";
import suggestion from "./controllers/suggestion.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Server
const app = express();
const PORT = process.env.PORT || 3000;
// Middlewares
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Routes use
app.use("/", router);
// Serving Static files
app.use(express.static(path.join(__dirname, "public")));
// Const Data
const DATA = getData()

// Server Listening
const server = app.listen(PORT, () =>
  console.log(`App listenning on  : http://localhost:${PORT}`)
);
