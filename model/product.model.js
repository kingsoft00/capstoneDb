var mongoose = require("mongoose");
mongoose.pluralize(null);           //avoid s post fix for collection. 

var ProductSchema = mongoose.Schema;

var ProductSchemaRef = new ProductSchema({
    _id:Number,
    name:String,
    size:String,
    color:String,
    image:String,
    gender:String,
    price:Number,
    brand: {type: ProductSchema.Types.ObjectId, ref: 'Brand'}
});

var ProductModel = mongoose.model("Product",ProductSchemaRef);
module.exports = ProductModel;