const router = require("express").Router();
const auth = require("./auth");
const spotify = require("./spotify");

router.use("/auth", auth);
router.use("/spotify", spotify);

module.exports = router;
