import { Router } from "express";
import { handleHealthCheck, handleLiveCheck } from "./health.controllers.js";

const healthRouter = Router();

healthRouter.get("/", handleHealthCheck);
healthRouter.get("/live", handleLiveCheck);

export default healthRouter;