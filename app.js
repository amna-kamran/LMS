var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose"); // Add mongoose

//define the routers
//e.g
// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
var studentRouter = require("./routes/student");

var app = express();

// MongoDB Connection
// const uri =
//   "mongodb+srv://amnakamran139:vgDCvSZfo8XtnrAB@cluster0.qg8esqx.mongodb.net/?retryWrites=true&w=majority";
// mongoose
//   .connect(uri)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.warn("An error occurred", err));

const uri =
  "mongodb://127.0.0.1:27017/assignment2LMS";
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.warn("An error occurred", err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//define the usage of the routers
//e.g
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/student", studentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Server Listening
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is Successfully Running on ${PORT}`)
);

module.exports = app;
