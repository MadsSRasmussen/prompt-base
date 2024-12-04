import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

const authorizor = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    throw new HTTPException(401);
  }

  await next();
});

export default authorizor;
