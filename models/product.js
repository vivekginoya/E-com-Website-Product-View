const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category:{ type: Schema.Types.ObjectId, ref: 'category' },
  subcategory:{ type: Schema.Types.ObjectId, ref: 'subcategory' },
  productimg:String,
  productname:String,
  price:Number,
  productdetail:String
});

const PRODUCT = mongoose.model('product', ProductSchema);
module.exports = PRODUCT