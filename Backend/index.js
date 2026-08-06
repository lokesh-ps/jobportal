import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
dotenv.config();
const app = express();

//middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies from incoming requests
const corsOptions = {
  origin: "http://localhost:5121",
  credentials: true,
};
app.use(cors(corsOptions)); // Enable CORS with the specified options
const PORT = process.env.PORT || 5001;

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Server is running" });
// });
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
