import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });
    app.listen(PORT || 4000, () => {
      console.log(`Server running at PORT : $${PORT}`);
    });
  })
  .catch((error) => console.log("MONGO DB Conneciton failed !!", error));
