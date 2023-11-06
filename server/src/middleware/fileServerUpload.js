//Job: Uploads file to server
const ApiError = require('../utilities/ApiError');
const path = require('path');
const debugWRITE = require('debug')('app:write');
//piece of middle just of function
const fileServerUpload = (req, res, next) => {
  //1.check file has been uploaded
  if (req.files) {
    const file = req.files.image;
    debugWRITE(`Image:${file.name} received`);

    //2.APPEND UNIQUE FILE ID
    const filename = `${Date.now()}-${file.name}`;
    debugWRITE(`Unique Filename:${filename} created`);

    //3.Declare server storage directory path
    const uploadPath = path.join(__dirname, '../../public/uploads/', filename);

    //4.Move file to server storage directory
    file
      .mv(uploadPath)
      .then(() => {
        console.log(`File:${filename} moved to server storage`);
        res.locals.filename = filename;
        next();
      })
      .catch((err) => {
        if (err)
          return next(
            ApiError.internal('Your file could not be uploaded', err)
          );
      });
  } else {
    next();
  }
};

module.exports = fileServerUpload;
