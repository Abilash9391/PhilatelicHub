import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import productRoute from "./routes/productRoute.js";
import postRoute from "./routes/postRoute.js"
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import newsRoute from "./routes/newsRoute.js";

const app = express();

app.use(cors({ origin: true })); 
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/posts",postRoute);
app.use("/api/news", newsRoute);

mongoose
  .connect(process.env.MONGODB_DB_CONNECTION_STRING)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});



// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import productRoute from "./routes/productRoute.js";
// import userRoute from "./routes/userRoute.js";
// import cartRoute from "./routes/cartRoute.js";
// import orderRoute from "./routes/orderRoute.js";
// import newsRoute from "./routes/newsRoute.js";
// import { v2 as cloudinary } from "cloudinary";

// const app = express();

// app.use(cors({origin : true}));
// app.use(express.json({ limit: '50mb' }));

// app.use("/api/product", productRoute);
// app.use("/api/user", userRoute);
// app.use("/api/cart", cartRoute);
// app.use("/api/order", orderRoute);
// app.use("/api/news", newsRoute);

// mongoose.connect(process.env.MONGODB_DB_CONNECTION_STRING)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log(`connected to the database and listening on port ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });