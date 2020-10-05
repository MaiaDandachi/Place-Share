const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.Secret_Access_Key,
  accessKeyId: process.env.Access_Key_Id,
  region: "eu-west-2",
});

const s3 = new aws.S3({});

const fileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mern-proj-images",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_META_DATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = fileUpload;

// const multer = require("multer");
// const { v1: uuid } = require("uuid");

// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpg": "jpg",
//   "image/jpeg": "jpeg",
// };

// const fileUpload = multer({
//   limits: 500000,
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/images");
//     },
//     filename: (req, file, cb) => {
//       const ext = MIME_TYPE_MAP[file.mimetype];
//       cb(null, uuid() + "." + ext);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     const isValid = !!MIME_TYPE_MAP[file.mimetype];
//     let error = isValid ? null : new Error("Invalid mime type!");
//     cb(error, isValid);
//   },
// });

// module.exports = fileUpload;
