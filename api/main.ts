import { app } from "./src/configs/app.ts";

app.listen({ port: Number(Deno.env.get('PORT')) || 8080 });

