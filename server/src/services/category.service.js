import Category from "../models/Category.model.js"
import Product from "../models/product.model.js";

export const getCategories = async ({
    search = ""
} = {}) => {
    const filter = {};
    if (search?.trim()) {
        filter.$or = [
            {
                name: {
                    $regex: search.trim(),
                    $options: "i"
                }
            },
            {
                slug: {
                    $regex: search.trim(),
                    $options: "i"
                }
            }
        ];
    }
    return await Category.find(filter)
        .sort({ createdAt: -1 });
};


export const getCategoryById = (id) => {
    return Category.findById(id);
};

export const createCategory = (data) => {
    return Category.create(data);
}

export const updateCategory = (id, data) => {
    return Category.findByIdAndUpdate(id, data, {
        new: true,
    });
};

export const deleteCategory = async (id) => {
    const productExists = await Product.exists({
        category: id,
    });

    if (productExists) {
        throw new Error(
            "Cannot delete category because it is assigned to one or more products."
        );
    }
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

export const updateStatus = async (id) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error("Category not found");
    }
    category.status = !category.status;
    await category.save();
    return category;
};