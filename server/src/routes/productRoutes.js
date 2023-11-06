// CENTRAL ROUTE FILE
// Import express and router
const express = require('express');
const router = express.Router();

// Import modules
const ProductPolicy = require('../policies/productPolicy');
const FilePolicy = require('../policies/filePolicy');
const fileServerUpload = require('../middleware/fileServerUpload');
const ProductController = require('../controllers/productController');

// Setup routes within export function
module.exports = () => {
  // GET ALL Products
  router.get('/', ProductController.getAllProducts);

  // GET onSALE Products

  // POST Product
  router.post(
    '/',
    [
      ProductPolicy.validateProduct,
      FilePolicy.filePayloadExists,
      FilePolicy.fileSizeLimiter,
      FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']),
      fileServerUpload,
    ],
    ProductController.postProduct
  );
  // GET BY ID Product
  router.get('/:id', ProductController.getProductById);
  // UPDATE BY ID Product
  router.put(
    '/:id',
    [
      ProductPolicy.validateProduct,
      FilePolicy.filePayloadExists,
      FilePolicy.fileSizeLimiter,
      FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']),
      fileServerUpload,
    ],
    ProductController.putProductById
  );
  // DELETE BY ID Product
  router.delete('/:id', ProductController.deleteProductById);

  return router;
};
