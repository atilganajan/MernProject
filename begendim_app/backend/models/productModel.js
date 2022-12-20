import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  image_id:{
    type:String,
    
  }

});

const Product = mongoose.model("Product", productSchema);

export default Product;
