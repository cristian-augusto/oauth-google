import cookieParser from "cookie-parser";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import AppConfig from "./config/AppConfig";
import "./config/containers";
import errorHandler from "./middlewares/error-handler.middleware";
import appRoutes from "./routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

app.use("/api", appRoutes);

app.use(errorHandler);

const PORT = AppConfig.App.PORT;
app.listen(PORT, () => console.log(`App started at PORT ${PORT}`));
