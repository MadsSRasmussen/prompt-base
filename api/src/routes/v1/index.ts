import { Hono } from "hono";
import prompts from "./prompts.ts";
import collections from "./collections.ts";
import keys from "./keys.ts";

const v1 = new Hono();

v1.route("/prompts", prompts);
v1.route("/collections", collections);
v1.route("/keys", keys);

export default v1;
