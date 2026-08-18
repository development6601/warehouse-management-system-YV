import slugify from "slugify";
import Product from "../models/product.model.js";
import * as categoryService from "../services/category.service.js";

export const getAllCategories = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const categories = await categoryService.getCategories({
      search
    });

    return res.status(200).json({
      success: true,
      data: categories
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);

    if (!category)
      return res.status(404).json({
        message: "Category not found",
      });

    res.json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const data = {
      ...req.body,
      slug: slugify(req.body.name, {
        lower: true,
      }),
    };

    const category = await categoryService.createCategory(data);

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.body.name) {
      data.slug = slugify(req.body.name, {
        lower: true,
      });
    }

    const category = await categoryService.updateCategory(
      req.params.id,
      data
    );

    res.json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);

    res.json({
      message: "Category deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const category = await categoryService.updateStatus(req.params.id);

    res.json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getCategoryProducts = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.id
    })
      .populate("category", "name slug");

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};