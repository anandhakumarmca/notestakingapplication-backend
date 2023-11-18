import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dataBaseConnection } from "./config/database.js";
import { indexRoutes } from "./routes/index.js";
import customErrorHandler from "./middleware/customErrorHandler.js";

//Configuring the environmental variable
dotenv.config();

//Server Setup
const app = express();
const PORT = process.env.PORT || 5010;

//Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(customErrorHandler);

//Database Connection
dataBaseConnection();

//Test Route
app.get("/", async (req, res) => {
  return res.status(200).send("API of Notes Taking Application Backend");
});

//Routes
app.use("/api", indexRoutes);

//Listening the Server
app.listen(PORT, () => {
  console.log(`Server is listening -> http://localhost:${PORT}`);
});
