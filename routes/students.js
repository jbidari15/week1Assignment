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
  const gpsToDecimal = (gpsData, hem) => {
    let d =
      parseFloat(gpsData[0]) +
      parseFloat(gpsData[1] / 60) +
      parseFloat(gpsData[2] / 3600);
    return hem === "S" || hem === "W" ? (d *= -1) : d;
  };
  cloudinary.uploader.upload(req.file.path, function(result) {
    try {
      new ExifImage({ image: req.file.path }, function(error, exifData) {
        if (error) console.log("Error: " + error.message);
        else {
          const formData = {
            ...req.body,
            src: result.secure_url,
            lat: gpsToDecimal(
              exifData.gps.GPSLatitude,
              exifData.gps.GPSLatitudeRef
            ),
            lng: gpsToDecimal(
              exifData.gps.GPSLongitude,
              exifData.gps.GPSLongitudeRef
            )
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

router.put("/:studentId", upload.single("src"), (req, res) => {
  const gpsToDecimal = (gpsData, hem) => {
    let d =
      parseFloat(gpsData[0]) +
      parseFloat(gpsData[1] / 60) +
      parseFloat(gpsData[2] / 3600);
    return hem === "S" || hem === "W" ? (d *= -1) : d;
  };
  cloudinary.uploader.upload(req.file.path, function(result) {
    try {
      new ExifImage({ image: req.file.path }, function(error, exifData) {
        if (error) console.log("Error: " + error.message);
        else {
          const formData = {
            ...req.body,
            src: result.secure_url,
            lat: gpsToDecimal(
              exifData.gps.GPSLatitude,
              exifData.gps.GPSLatitudeRef
            ),
            lng: gpsToDecimal(
              exifData.gps.GPSLongitude,
              exifData.gps.GPSLongitudeRef
            )
          };
          db.Student.findOneAndUpdate({ _id: req.params.studentId }, formData, {
            new: true
          })
            .then(updatedStudent => {
              res.json(updatedStudent);
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

router.delete("/:studentId", (req, res) => {
  db.Student.remove({ _id: req.params.studentId })
    .then(() => {
      res.send({ message: "The student is deleted from the database" });
    })
    .catch(err => {
      res.send(err);
    });
});
router.get("/:title", (req, res) => {
  db.Student.find({ title: req.params.title })
    .then(students => {
      res.json(students);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
