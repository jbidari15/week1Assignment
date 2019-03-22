const mongoose = require("mongoose");
const mongoURI = "mongodb://jkb:jaya123@ds141674.mlab.com:41674/assignment";
mongoose.set("debug", true);
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

module.exports.Student = require("./student");
