import mongoose from "mongoose";

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

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error: ", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}
