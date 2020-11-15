var express = require("express");
var brandController = require("../controller/brand.controller.js");
var productController = require("../controller/product.controller.js");
var router = express.Router();


router.get("/brandFromDb",brandController.GetBrandFromDb); //sub path
router.post("/storeBrand",brandController.StoreBrandInfo); //use .post to store/add new product info
router.delete("/deleteBrandByBrand/:brand",brandController.DeleteBrandInfo);

router.get("/productFromDb",productController.GetProductFromDb); //sub path
router.get("/productInfoByGender/:gender",productController.GetProductByGender); //sub path using path params
// router.get("/productInfoByBrand/:brand",productController.GetProductByBrand);
router.post("/storeProduct",productController.StoreProductInfo); //use .post to store/add new product info
router.put("/updateProduct",productController.UpdateProductInfo); // use .put to update product info
router.delete("/deleteProductById/:id",productController.DeleteProductInfo);
/*

*/
module.exports = router;