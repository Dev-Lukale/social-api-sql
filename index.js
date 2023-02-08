import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users-route.js";
const app = express();

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "https://tyson-social-api-sql.up.railway.app/",
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome to social sql api");
});
app.get("/users", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("API working!");
});
