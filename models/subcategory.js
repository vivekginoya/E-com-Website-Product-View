const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  category:{ type: Schema.Types.ObjectId, ref: 'category' },
  subcategory:String
});

const SUBCATEGORY = mongoose.model('Subcategory', SubCategorySchema);
module.exports = SUBCATEGORY