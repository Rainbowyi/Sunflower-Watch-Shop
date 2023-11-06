const ApiError = require('../utilities/ApiError');
const path = require('path');
//The filePolicy is a piece of middleware that validator the file upload

//1.check file exists
const filePayloadExists = (req, res, next) => {
  if (!req.files && !req.body.uploadFile) {
    return next(ApiError.badRequest('No file was uploaded'));
  }
  next();
};
//2.check file size
const fileSizeLimiter = (req, res, next) => {
  const MB = 5; // 5MB limit
  const FILE_SIZE_LIMIT = MB * 1024 * 1024;
  if (req.files) {
    const file = req.files.image;
    if (file.size > FILE_SIZE_LIMIT) {
      return next(ApiError.tooLarge(message));
    }
    next();
  }
};
//3.check file extension/type
const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    if (req.files) {
      const file = req.files.image;
      const fileExtension = path.extname(file.name);
      if (!allowedExtArray.includes(fileExtension)) {
        return next(ApiError.badRequest('File type not allowed'));
      }
    }
    next();
  };
};

const filePolicy = {
  filePayloadExists,
  fileSizeLimiter,
  fileExtLimiter,
};

module.exports = filePolicy;
