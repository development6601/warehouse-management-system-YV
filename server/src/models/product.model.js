import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        sku: {
            type: String,
            required: true,
            unique: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            default: 0,
        },

        image: {
            type: String,
            default: "",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        creatorRole: {
            type: String,
            enum: ["ADMIN", "SUPPLIER"],
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

productSchema.index({ category: 1 });
productSchema.index({ createdAt: -1 });

export default mongoose.model(
    "Product",
    productSchema
);