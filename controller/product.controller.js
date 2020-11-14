
var ProductModel = require("../model/product.model.js");

//Retrieve Product Details From Db 

var GetProductFromDb = (req,res)=>{
    ProductModel.find({},(err,data)=>{
        if(err) throw err;
            
            res.json(data);
    
        })
}
var GetProductByGender = (req,res)=>{ //productInfoById/100 or another id number
    var genderInfor = req.params.gender;
    ProductModel.find({gender:genderInfor},(err,data)=>{
        if(err) throw err;
            
            res.json(data);
    
        })
}
var GetProductByBrand = (req,res)=>{ //productInfoById/100 or another id number
    var brandInfor = req.params.brand;
    ProductModel.find({brand:brandInfor},(err,data)=>{
        if(err) throw err;
            
            res.json(data);
    
        })
}

var StoreProductInfo =(req,res)=>{ //{_id:106,pname:"Computer",price:2000"}
    let product = new ProductModel({
        _id:req.body._id,
        name:req.body.name,
        size:req.body.size,
        color:req.body.color,
        image:req.body.image,
        forType:req.body.forType,
        price:req.body.price,
        brand:req.body.brand
    });
    product.save((err,result)=>{
        if(err) {
            res.json({"msg":"Id must be unique, try another Id"})
        } else {
            res.json({"msg":"Record stored successfully"})
        }
    })
}
var UpdateProductInfo = (req,res) =>{ //{"_id":100,"price":22500}
    var updateId = req.body._id;
    var updateSize = req.body.size;
    var updatePrice = req.body.price;
    ProductModel.update({_id:updateId},{$set:{size:updateSize,price:updatePrice}},(err,result) =>{
        if(err) throw err;
        if(result.nModified > 0) {
            res.json({"msg":"Update successfully"});
        } else {
            res.json({"msg":"Update Failed"});
        }
    });
}
var DeleteProductInfo = (req,res) =>{ //dont use any in header and body, delete all such as content-type or application.json
    var deleteId = req.params.id;
    ProductModel.deleteOne({_id:deleteId},(err,result)=>{
        if(err) throw err;
        if(result.deletedCount > 0) {
            res.json({"msg":"Delete successfully"});
        } else {
           res.json({"msg":"Delete Failed"});
        }
    })
}

module.exports = {GetProductFromDb, GetProductByGender, StoreProductInfo, UpdateProductInfo, DeleteProductInfo, GetProductByBrand};
