import mongoose, { Connection } from "mongoose";
import debug from "debug";

mongoose.set("debug", true);
mongoose.connect(process.env.DATABASE_URL as string)

const db: Connection = mongoose.connection;

db.on("connected", function () {
  debug(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
