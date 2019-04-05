const express = require("express"),
  app = express(),
  https = require("https"),
  fs = require("fs");
const users = require("./routes/users");
const passport = require("passport");
const helmet = require("helmet");
// (port = process.env.PORT || 3001),
bodyParser = require("body-parser");
path = require("path");

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const sslkey = fs.readFileSync("./app/ssl-key.pem");
const sslcert = fs.readFileSync("./app/ssl-cert.pem");
const http = require("http");

const options = {
  key: sslkey,
  cert: sslcert
};

https.createServer(options, app).listen(3000);

http
  .createServer((req, res) => {
    res.writeHead(301, { Location: "https://localhost:3000" + req.url });
    res.end();
  })
  .listen(8080);

app.use((req, res, next) => {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect("https://" + req.headers.host + req.url);
  }
});

app.use(passport.initialize());
require("./config/passport")(passport);

const studentRoutes = require("./routes/students.js");
app.use("/api/students", studentRoutes);
app.use("/api/users", users);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("gallery-front-end/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "gallery-front-end", "build", "index.html")
    );
  });
}
