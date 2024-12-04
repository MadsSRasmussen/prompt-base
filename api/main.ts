import { app } from "./src/app.ts";

Deno.serve({ port: Number(Deno.env.get("PORT")) || 8080 }, app.fetch);
