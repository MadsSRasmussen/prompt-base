import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import { createDbConnection } from "./mysql.ts";

const app = new Application();

const _connection = await createDbConnection();

const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = { _connection };
});

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
