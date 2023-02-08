import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users-route.js";
import authRoutes from "./routes/auth-route.js";
const app = express();

//middlewares
dotenv.config()
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());

app.use(
  cors(
    {
    origin: "https://tyson-social-api-sql.up.railway.app",
    origin: "localhost:5000",
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome to social sql api");
});
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("API working!");
});
