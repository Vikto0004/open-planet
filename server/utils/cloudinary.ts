import { v2 as cloudinary } from "cloudinary";

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
console.log(CLOUD_NAME);

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export default cloudinary;
