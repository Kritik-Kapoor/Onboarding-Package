import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//import routers
import userRouter from "./routes/user.routes.js";

//router declarations
app.use("/api/v1/users", userRouter);

export default app;
