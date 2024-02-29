import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 6;

// 1. Create an interface representing a document in MongoDB
export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: string;
}


// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose.Schema<UserInput>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 3,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre("save", async function (next: (err?: Error) => void) {
  // 'this' is the user doc
  if (!this.isModified("password")) {
    return next();
  }
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

// 3. Create a Model.
export default mongoose.model<UserInput>("User", userSchema);
