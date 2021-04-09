

              const mongoose = require('mongoose');
              const Schema = mongoose.Schema;
              const ProductShema = new Schema({
                  name: { type: String, required: true },
                  description: { type: String, required: true },
                  price: { type: Number, required: true },
                  inStock :{ type: Boolean, required:true}
              });
  
              module.exports = Product = mongoose.model('product',ProductShema);
  
  