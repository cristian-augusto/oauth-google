import { Router } from "express";
import SessionController from "./controllers/session.controller";

const appRoutes = Router();

appRoutes.get("/session/oauth/google", SessionController.google);

export default appRoutes;
