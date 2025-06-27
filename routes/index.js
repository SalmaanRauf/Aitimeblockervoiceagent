var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  // Always serve the built client application
  return res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

module.exports = router;
