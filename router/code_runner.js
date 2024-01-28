const express = require("express");
const router = express.Router();
const { Run_code, Status } = require("../controller/code_runner");

router.get("/status", Status);
router.post("/run", Run_code);

module.exports = router;
