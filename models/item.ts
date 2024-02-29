import mongoose from "mongoose";
import User from "./user";

// 1. Create an interface representing a document in MongoDB
export interface ReviewDocument {
  text: string;
  rating: number;
  user: mongoose.Types.ObjectId,
  image?: string;
}

export interface ItemDocument {
  itemId: string;
  itemName: string;
  itemPrice: number;
  itemRarity: string;
  itemImage: string;
  setName: string;
  setNumber: string;
  setTotal: number;
  availableStock: number;
  reviews: ReviewDocument[];
}

// 2. Create a Schema corresponding to the document interface.
const reviewSchema = new mongoose.Schema<ReviewDocument>(
  {
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const itemSchema = new mongoose.Schema<ItemDocument>(
  {
    itemId: {
      type: String,
      unique: true,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    itemRarity: {
      type: String,
      required: true,
    },
    itemImage: {
      type: String,
      required: true,
    },
    setName: {
      type: String,
      required: true,
    },
    setNumber: {
      type: String,
      required: true,
    },
    setTotal: {
      type: Number,
      required: true,
    },
    availableStock: {
      type: Number,
      required: true,
      default: 5,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  },
);

// 3. Create a Model.
export default mongoose.model<ItemDocument>("Item", itemSchema);
