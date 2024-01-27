const express = require("express");
const router = express.Router();
const codeRun = require("../controller/code_runner");
router.post("/run", codeRun);

module.exports = router;
