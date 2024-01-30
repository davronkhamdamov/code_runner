const express = require("express");
const app = express();
const PORT = process.env.PORT;
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const codeRun = require("./router/code_runner");
const cors = require("cors");
require("./config/mongoose");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/code", codeRun);

app.get("/", (req, res) => {
  res.send({
    message: "Hello Server!",
  });
});

app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log("Server is running on the PORT " + PORT);
});

module.exports = app;
