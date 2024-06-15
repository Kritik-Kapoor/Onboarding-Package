import express from "express";
import cors from "cors";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//Routers
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

//import middlewares
import { errorHandler } from "./middlewares/error.middleware.js";

app.use(errorHandler);

export default app;
