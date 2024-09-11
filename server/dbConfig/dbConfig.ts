import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.DB_HOST!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("Mongodb error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");

    console.log(error);
  }
}
