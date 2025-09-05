// multer is a middleware for handling multipart/form-data, which is primarily used for file uploads

import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,                  //only images allowed. Videos, PDF's other files rejected.
    limits: { fileSize: 5 * 1024 * 1024 },   //5 MB max Image file size allowed
})

export default upload;