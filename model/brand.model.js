var mongoose = require("mongoose");
mongoose.pluralize(null);           //avoid s post fix for collection. 

var BrandSchema = mongoose.Schema;

var BrandSchemaRef = new BrandSchema({
    brand:String
});

var BrandModel = mongoose.model("Brand",BrandSchemaRef);
module.exports = BrandModel;