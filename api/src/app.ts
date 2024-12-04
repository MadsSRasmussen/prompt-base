import { Hono } from "hono";
import api from "./routes/index.ts";
const app = new Hono();

app.get("/", (c) => c.text("Application is running!"));
app.route("/api", api);

export { app };
