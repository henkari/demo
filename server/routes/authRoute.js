const { Signup } = require("../controllers/Authorization");
const router = require("express").Router();

router.post("/signup", Signup);

module.exports = router;