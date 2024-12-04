import { Hono } from "hono";
import prompts from "./prompts.ts";
import collections from "./collections.ts";

const v1 = new Hono();

v1.route("/prompts", prompts);
v1.route("/collections", collections);

export default v1;
