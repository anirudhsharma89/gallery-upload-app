const express = require("express");
const router = express.Router();
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// require("dotenv").config();

const cors = require("cors");
const app = express();

app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
const jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 20,
  type: "application/json"
});

const urlencodedParser = bodyParser.urlencoded({
  extended: true,
  limit: 1024 * 1024 * 20,
  type: "application/x-www-form-urlencoding"
});

app.use(jsonParser);
app.use(urlencodedParser);
app.use(logger("dev"));

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "/frontend/dist")));

app.use(cookieParser());
// const indexRouter = require("./routes/index")(app, router);

//Admin Route
// require("./routes/admin/admin.route.js")(app, router);

app.get("/", function(req, res) {
  return res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});
app.get("/*", function(req, res) {
  return res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, function() {
  console.log("Gallery app listening on port 3000!");
});

module.exports = app;
