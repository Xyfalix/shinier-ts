import mongoose from "mongoose";
import User from "./user";
import Item, {ItemDocument} from "./item";

export interface LineItemInput {
  qty: number;
  item: mongoose.Types.ObjectId | ItemDocument;
}

export interface LineItemExtPrice extends LineItemInput, mongoose.Document{
  extPrice: number;
}

const lineItemSchema = new mongoose.Schema(
  {
    qty: {
      type: Number,
      required: true,
      default: 1,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Item,
      required: true,
    },
  },
  {
    timestamps: true,
    toJson: { virtuals: true },
  },
);

lineItemSchema.virtual("extPrice").get(function (this: LineItemExtPrice) {
  // Check if item is populated
  if (this.item && (this.item as ItemDocument) .itemPrice) {
    return this.qty * (this.item as ItemDocument).itemPrice;
  } else {
    return 0; // Handle cases where item is not populated or itemPrice is missing
  }
});

interface OrderDocument extends mongoose.Document {
  lineItems: LineItemExtPrice[];
  orderStatus: string;
  user: mongoose.Types.ObjectId;
}

const orderSchema = new mongoose.Schema(
  {
    lineItems: [lineItemSchema],
    orderStatus: {
      type: String,
      required: true,
      default: "pending payment",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
    toJson: { virtuals: true },
  },
);

orderSchema.virtual("orderTotal").get(function (this: OrderDocument) {
  return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual("totalQty").get(function (this: OrderDocument) {
  return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

orderSchema.virtual("orderId").get(function (this: OrderDocument) {
  return this.id.slice(-6).toUpperCase();
});

const Order = mongoose.model<OrderDocument>("Order", orderSchema);

module.exports = Order;
