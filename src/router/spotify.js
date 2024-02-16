const express = require("express");
const router = express.Router();
const spotify = require("../controllers/spotifyController");
const isAuthenticated = require("../middleware/auth");

router.route("/add").post(isAuthenticated, spotify.addPlaylist);
router.route("/categories").get(spotify.fetchCategories);
router.route("/playlist").post(spotify.getPlaylist);

module.exports = router;
