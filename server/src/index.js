import dotenv from "dotenv";
import { PORT } from "./constants.js";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });
    app.listen(PORT || 4000, () => {
      console.log(`Server running at PORT : ${PORT}`);
    });
  })
  .catch((error) => console.log("MONGO DB Conneciton failed !!", error));
