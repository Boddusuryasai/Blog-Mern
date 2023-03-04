const app = require("./index");
const PORT = process.env.PORT || 4000;
const cloudinary = require("cloudinary");
cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
