import mongoose from "mongoose";
import { PoliciesModel } from "@/models/policies-model";


let isConnected = false;

export async function connect() {
  console.log(isConnected);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.DB_HOST!);
    isConnected = true;
    await PoliciesModel.ensureDefaults();
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB formError: ", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}
