var express = require('express');
const PRODUCT = require('../models/product');
const CATEGORY = require('../models/category');
const SUBCATEGORY = require('../models/subcategory');
var router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + file.originalname)
  }
})
const upload = multer({ storage: storage })

/* GET home page. */
// Home Page
router.get('/', async function(req, res, next) {
  try {
    let data = await PRODUCT.find()
    res.render('homepage', { data });
  } catch (error) {
    res.status(404).json({
      status:"FAIL",
      message:error.message
    })
  }
});

// All Product Page
router.get('/allproducts', async function(req, res, next) {
  try {
    let data = await PRODUCT.find()
    res.render('allproduct', { data });
  } catch (error) {
    res.status(404).json({
      status:"FAIL",
      message:error.message
    })
  }
});

// Electronics Page
router.get('/electronics', async function(req, res, next) {
  try {
    let subcatid=req.query.subcatid
    console.log(subcatid);
    let data = await PRODUCT.find({'subcategory':subcatid})
    console.log(data);
    res.render('electronics', { data });
  } catch (error) {
    res.status(404).json({
      status:"FAIL",
      message:error.message
    })
  }
});

// Grocery Page
router.get('/grocery', async function(req, res, next) {
  try {
    let subcatid=req.query.subcatid
    console.log(subcatid);
    let data = await PRODUCT.find({'subcategory':subcatid})
    console.log(data);
    res.render('grocery', { data });
  } catch (error) {
    res.status(404).json({
      status:"FAIL",
      message:error.message
    })
  }
});

// Add Product
router.post('/addproducts',upload.single('productimg'),async function(req, res, next) {
  try {
    req.body.productimg = req.file.filename
    let data = await PRODUCT.create(req.body)
    res.status(201).json({
      status:"Success",
      message:"Add Product Successfully...",
      data
    })
  } catch (error) {
    res.status(404).json({
      status:"FAIL",
      message:error.message
    })
  }
});

// Add Category
router.post('/addcategory',async function(req, res, next) {
  try {
    let data = await CATEGORY.create(req.body)
    res.status(201).json({
      status:"Success",
      message:"Add Category Successfully...",
      data
    })
  } catch (error) {
    res.status(404).json({
      status:"FAIL",
      message:error.message
    })
  }
});

// Add Sub-Category
router.post('/addsubcategory',async function(req, res, next) {
  try {
    let data = await SUBCATEGORY.create(req.body)
    res.status(201).json({
      status:"Success",
      message:"Add Sub-Category Successfully...",
      data
    })
  } catch (error) {
    res.status(404).json({
      status:"FAIL",
      message:error.message
    })
  }
});

module.exports = router;
