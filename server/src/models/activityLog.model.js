import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    action: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    details: {
        type: String
    }

}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model(
    "ActivityLog",
    activityLogSchema
);