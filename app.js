const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require("body-parser");
path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const studentRoutes = require("./routes/students.js");
app.use("/api/students", studentRoutes);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("gallery-front-end/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "gallery-front-end", "build", "index.html")
    );
  });
}

app.listen(port, (req, res) => {
  console.log(`The server is running at port - ${port}`);
});
