import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const createProduct = async (req, res) => {
  try {
    const { name, description, image, companyName } = req.body;

    if (name == "" || description == "" || image == "" || companyName == "") {
      res.status(400).json({
        message: "Lütfen tüm alanları doldurunuz",
      });
    } else {
      const result = await cloudinary.uploader.upload(image, {
        use_filename: true,
        folder: "begendim",
      });

      const createdProduct = await Product.create({
        name,
        companyName,
        description,
        image: result.secure_url,
        image_id: result.public_id
      });
      res.status(200).json(createdProduct);
    }
  } catch (error) {
    res.status(500).json({
      message: "Ürün oluşturulamadı",
      error,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const getAProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });

    res.status(200).json({
      product,
      id:req.params.id
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);
    const imageId = product.image_id;

    await cloudinary.uploader.destroy(imageId);
    await Product.findOneAndRemove({ _id: req.params.id })

    res.status(200).json({
      succeded: true
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const putProduct = async (req, res) => {
  
  try {
    const product = await Product.findByIdAndUpdate(req.body.id,req.body)

    const imageId = product.image_id;

    await cloudinary.uploader.destroy(imageId);
    
    res.json(req.body)
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });


  }


}

export { createProduct, getAllProducts, getAProduct, deleteProduct, putProduct };
