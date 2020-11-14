
var BrandModel = require("../model/brand.model.js");

//Retrieve Product Details From Db 

var GetBrandFromDb = (req,res)=>{
    BrandModel.find({},(err,data)=>{
        if(err) throw err;
            
            res.json(data);
    
        })
}

var StoreBrandInfo =(req,res)=>{
    let brand = new BrandModel({
        brand:req.body.brand
    });
    brand.save((err,result)=>{
        if(err) {
            res.json({"msg":"This brand existed, try another brand"})
        } else {
            res.json({"msg":"Record stored successfully"})
        }
    })
}

var DeleteBrandInfo = (req,res) =>{ //dont use any in header and body, delete all such as content-type or application.json
    var deleteBrand = req.params.brand;
    BrandModel.deleteOne({brand:deleteBrand},(err,result)=>{
        if(err) throw err;
        if(result.deletedCount > 0) {
            res.json({"msg":"Delete successfully"});
        } else {
           res.json({"msg":"Delete Failed"});
        }
    })
}

module.exports = {GetBrandFromDb, StoreBrandInfo, DeleteBrandInfo};
