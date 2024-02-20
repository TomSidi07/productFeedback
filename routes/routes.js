import express from "express";
import getData from "../controllers/controller.js";
import suggestion from "../controllers/suggestion.js";
const DATA = getData();
const router = express.Router();
router.get("/", (req, res, next) => {
  res.render("index.ejs", { DATA ,renderCard:suggestion.upDateUI});
  next();
});
router.get("/details", (req, res, next) => {
  res.render("details.ejs");
  next();
});
router.get("/roadmap", (req, res, next) => {
  res.render("roadmap.ejs");
  next();
});

router.post("/submit", (req, res, next) => {
  res.send("Hello");
  res.redirect("/");

  next();
});

export default router;
