// Import modules
const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');

const debugREAD = require('debug')('app:read');
const debugWRITE = require('debug')('app:write');
const {
  storageBucketUpload,
  deleteFileFromBucket,
  getFileFromUrl,
} = require('../utilities/bucketServices');
module.exports = {
  // [1A] GET ALL Products
  async getAllProducts(req, res, next) {
    try {
      // Store the collection reference in variable
      const productRef = db.collection('products');
      // Fetch ALL Currencies and store response in "snapshot"
      const snapshot = await productRef.orderBy('name').get();

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (snapshot.empty) {
        return next(
          ApiError.badRequest('The items you were looking for do not exist')
        );

        // SUCCESS: Push object properties to array and send to client
      } else {
        let docs = [];
        snapshot.forEach((doc) => {
          docs.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            category: doc.data().category,
            price: doc.data().price,
            sizes: doc.data().sizes,
            brand: doc.data().brand,
            onSale: doc.data().onSale,
            smartphone: doc.data().smartphone,
            image: doc.data().image,
          });
        });
        res.send(docs);
      }
      // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch (err) {
      return next(
        ApiError.internal('The items selected could not be found', err)
      );
    }
  },

  // [1B] GET onSale Products

  // [2] POST Product
  async postProduct(req, res, next) {
    debugWRITE(req.files);
    debugWRITE(res.locals);
    debugWRITE(req.body);
    //SAVE TO BUCKET(file/image)
    let downloadURL = null;

    try {
      const filename = res.locals.filename;
      downloadURL = await storageBucketUpload(filename);
    } catch (error) {
      return next(
        ApiError.internal(
          'An error occurred in uploading image to storage',
          err
        )
      );
    }
    //SAVE TO FIRESTORE(ALL DATA)
    try {
      const productRef = db.collection('products');
      const response = await productRef.add({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: Number(req.body.price),
        sizes: req.body.sizes,
        brand: req.body.brand,
        onSale: req.body.onSale,
        smartphone: req.body.smartphone,
        image: downloadURL,
      });
      console.log(`Added Product ID:${response.id} to Firestore}`);
      res.send(response.id);
    } catch (error) {
      return next(ApiError.internal('You request is not processed', err));
    }
  },
  // [3] GET Product BY ID
  async getProductById(req, res, next) {
    // Test: Check ID passed via URL query string parameters
    debugREAD(req.params);

    try {
      // Store the document query in variable & call GET method for ID
      const productRef = db.collection('products').doc(req.params.id);
      const doc = await productRef.get();

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (!doc.exists) {
        return next(
          ApiError.badRequest('The item you were looking for does not exist')
        );

        // SUCCESS: Send back the specific document's data
      } else {
        res.send(doc.data());
      }

      // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch (err) {
      return next(
        ApiError.internal(
          'Your request could not be processed at this time',
          err
        )
      );
    }
  },

  // [4] PUT Product BY ID
  async putProductById(req, res, next) {
    // (a) Validation (JOI) Direct from Form (refactored)
    debugWRITE(req.params);
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);

    // (b1) File Upload to Storage Bucket
    // IMAGE CHANGED: If the image is updated, a new file will be saved under req.files
    // NOTE: We will call standard file uploader + we will ALSO need to delete the OLD image URL from the storage location (if there is one)
    let downloadURL = null;
    try {
      if (req.files) {
        // (i) Storage-Upload
        const filename = res.locals.filename;
        downloadURL = await storageBucketUpload(filename);

        // (ii) Delete OLD image version in Storage Bucket, if it exists
        if (req.body.uploadedFile) {
          debugWRITE(`Deleting old image in storage: ${req.body.uploadedFile}`);
          const bucketResponse = await deleteFileFromBucket(
            req.body.uploadedFile
          );
        }

        // (b2) IMAGE NOT CHANGED: We just pass back the current downloadURL and pass that back to the database, unchanged!
      } else {
        console.log(`No change to image in DB`);
        downloadURL = req.body.image;
      }

      // [500 ERROR] Checks for Errors in our File Upload
    } catch (err) {
      return next(
        ApiError.internal(
          'An error occurred in saving the image to storage',
          err
        )
      );
    }

    // (c) Store the document query in variable & call UPDATE method for ID
    try {
      const productRef = db.collection('products').doc(req.params.id);
      const response = await productRef.update({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: Number(req.body.price),
        sizes: req.body.sizes,
        brand: req.body.brand,
        onSale: req.body.onSale,
        smartphone: req.body.smartphone,
        image: downloadURL,
      });
      res.send(response);
      console.log(response);
      // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch (err) {
      return next(
        ApiError.internal(
          'Your request could not be processed at this time',
          err
        )
      );
    }
  },

  // [5] DELETE Product BY ID
  async deleteProductById(req, res, next) {
    // (a) Delete document image file from storage
    try {
      // (i) Store the document query in variable & call GET method for ID
      const productRef = db.collection('products').doc(req.params.id);
      const doc = await productRef.get();

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (!doc.exists) {
        return next(
          ApiError.badRequest('The item you were looking for does not exist')
        );
      }

      // (ii) Store downloadURL and obtain uploadedFile in storage bucket
      const downloadURL = doc.data().image;
      const uploadedFile = getFileFromUrl(downloadURL);

      // (iii) Call storage bucket delete function & delete previously uploadedFile
      const bucketResponse = await deleteFileFromBucket(uploadedFile);

      // (b) Delete document from Cloud Firestore
      if (bucketResponse) {
        // Call DELETE method for ID (with PRECONDITION parameter to check document exists)
        // NOTE: We defined Ref earlier!
        const response = await productRef.delete({ exists: true });

        // SUCCESS: Issue back response for timebeing
        res.send(response);
      }

      // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch (err) {
      return next(
        ApiError.internal('Your request could not be saved at this time', err)
      );
    }
  },
};
