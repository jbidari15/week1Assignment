const express = require("express");
const router = express.Router();
const db = require("../models");
const api_key = require("../config/keys").api_key;
const api_secret = require("../config/keys").api_secret;
const ExifImage = require("exif").ExifImage;

var multer = require("multer");
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dsf9xrrux",
  api_key,
  api_secret
});

router.get("/", (req, res) => {
  db.Student.find()
    .then(students => {
      res.json(students);
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/", upload.single("src"), (req, res) => {
  cloudinary.uploader.upload(req.file.path, function(result) {
    try {
      new ExifImage({ image: req.file.path }, function(error, exifData) {
        if (error) console.log("Error: " + error.message);
        else {
          const formData = {
            ...req.body,
            src: result.secure_url,
            imageData: exifData
          };
          db.Student.create(formData)
            .then(student => {
              res.status(201).json(student);
            })
            .catch(err => {
              res.send(err);
            });
        }
      });
    } catch (error) {
      console.log("Error: " + error.message);
    }
  });
});

module.exports = router;
