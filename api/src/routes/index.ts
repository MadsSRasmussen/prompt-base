import { Hono } from "hono";
import authorizor from "../middlewares/authorizor.ts";
import v1 from "./v1/index.ts";

const api = new Hono();

api.use(authorizor);

api.route("/v1", v1);

export default api;
