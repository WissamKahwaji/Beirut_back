import { Product } from "../models/product/product_model.js";
import { productTypeModel } from "../models/product/product_type_model.js";

export const getProductData = async (req, res) => {
  try {
    const productData = await Product.find().populate("type");

    return res.status(200).json(productData);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const getProductsAndTypes = async (req, res) => {
  try {
    const { type } = req.query;
    let products;
    if (type) {
      products = await productTypeModel
        .find({ _id: type })
        .populate("products");
    } else {
      products = await productTypeModel.find().populate("products");
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const getProductDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await Product.findById(id).populate("type");

    return res.status(200).json(productData);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const getProductTypeData = async (req, res) => {
  try {
    const productTypeData = await productTypeModel.find();

    return res.status(200).json(productTypeData);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const addProductTypeData = async (req, res) => {
  try {
    const { name } = req.body;
    const newType = new productTypeModel({ name });
    await newType.save();

    return res.status(201).json(newType);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const editProductTypeData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const type = await productTypeModel.findById(id);
    if (!type) {
      return res.status(404).json("Product Type not found");
    }
    type.name = name;

    await type.save();
    return res.status(201).json(type);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const deleteProductTypeData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productTypeModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json("Product Type not found");
    }

    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, type, desc, deepDetails } = req.body;

    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrl = imgPath
      ? "https://beirutback.siidevelopment.com/" + imgPath.replace(/\\/g, "/")
      : null;

    const imgs = {};
    ["first", "second", "third"].forEach(key => {
      const imgKey = `imgs[${key}]`;
      console.log(imgKey);
      const imgPath =
        req.files && req.files[imgKey] ? req.files[imgKey][0].path : null;
      imgs[key] = imgPath
        ? "https://beirutback.siidevelopment.com/" + imgPath.replace(/\\/g, "/")
        : null;
      console.log(imgs);
    });
    console.log(imgs);
    // Create a new Product instance
    const newProduct = new Product({
      img: imgUrl,
      imgs: imgs,
      title,
      type,
      desc,
      deepDetails,
    });

    // Save the new Product to the database
    await newProduct.save();
    await productTypeModel.findByIdAndUpdate(type, {
      $push: { products: newProduct._id },
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const getProductsByType = async (req, res) => {
  try {
    const { type } = req.query;
    const products = await Product.find({ type: type });

    if (!products || products.length === 0) {
      return res.status(404).json("Products not found for the given type");
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, desc } = req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json("Product not found");
    }

    if (title) {
      existingProduct.title = title;
    }

    if (type) {
      existingProduct.type = type;
    }

    if (desc) {
      existingProduct.desc = desc;
    }

    if (req.files && req.files["img"]) {
      const imgPath = req.files["img"][0].path;
      existingProduct.img =
        "https://beirutback.siidevelopment.com/" + imgPath.replace(/\\/g, "/");
    }

    if (req.files && req.files["imgs"]) {
      ["first", "second", "third"].forEach(key => {
        const imgKey = `imgs[${key}]`;
        if (req.files[imgKey]) {
          const imgPath = req.files[imgKey][0].path;
          existingProduct.imgs[key] =
            "https://beirutback.siidevelopment.com/" +
            imgPath.replace(/\\/g, "/");
        }
      });
    }

    await existingProduct.save();

    return res.status(200).json(existingProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const deleteProductData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json("Product not found");
    }

    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};
