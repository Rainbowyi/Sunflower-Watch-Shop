// Import Joi Validation module
const Joi = require('joi');
const ApiError = require('../utilities/ApiError');
const debugJoi = require('debug')('app:joi');
// The productPolicy is a piece of middleware that validates the product form

module.exports = {
  // [1] POST Validation
  validateProduct(req, res, next) {
    console.log(req.body);
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(3).max(2000).required(),
      category: Joi.string().required(),
      price: Joi.number().required(),
      brand: Joi.string().min(3).max(50).required(),
      onSale: Joi.boolean().required(),
      smartphone: Joi.boolean().required(),
      image: Joi.any(),
      uploadedFile: Joi.string(),
    });

    // Return one of two values
    const { error, value } = schema.validate(req.body);

    // ON VALIDATION ERROR: We call Error Middleware & Pass Bad Request with Dynamic Validation Error Message
    if (error) {
      debugJoi(error);
      switch (error.details[0].context.key) {
        case 'name':
          next(
            ApiError.badRequest('You must provide a valid name for the product')
          );
          break;

        case 'description':
        case 'category':
        case 'brand':
          next(
            ApiError.badRequest(
              'You must provide a valid product information including description, category and brand'
            )
          );
          break;

        case 'price':
          next(
            ApiError.badRequest(
              'You must provide valid pricing for the product'
            )
          );
          break;

        case 'onSale':
        case 'smartphone':
          next(
            ApiError.badRequest(
              'You must check whether the product is on sale and/or phone is smartphone ?'
            )
          );
          break;

        case 'image':
        case 'uploadedFile':
          next(
            ApiError.badRequest(
              'The existing image URL or path are not in a valid format - please re-upload the image'
            )
          );
          break;

        default:
          next(
            ApiError.badRequest(
              'Invalid Form Information - please check form information and submit again'
            )
          );
      }

      // ON SUCCSSS: We pass to next middleware
    } else {
      next();
    }
  },
};
