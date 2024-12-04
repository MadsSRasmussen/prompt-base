import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import db from "../../services/db/index.ts";
import { Collection } from "#types";

const collections = new Hono();

collections.get("/", async (c) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) throw new HTTPException(401);

  const authHeaderSplits = authHeader.split("-");
  if (authHeaderSplits.length < 2) {
    throw new HTTPException(401);
  }

  const orgQuery = c.req.queries("org");
  const idQuery = c.req.queries("id");
  const nameQuery = c.req.queries("name");

  switch (authHeaderSplits[0]) {
    case "Bearer st": {
      if (!orgQuery) throw new HTTPException(400);

      const promises: Promise<
        { orgId: string; collections: (Collection | null)[] | null } | null
      >[] = [];
      orgQuery.forEach((org) => {
        const getCollections = async () => {
          if (idQuery) {
            const idPromises: Promise<Collection | null>[] = [];
            idQuery.forEach((id) =>
              idPromises.push(db.collections.getById(Number(id)))
            );
            const colls = await Promise.all(idPromises);
            return {
              orgId: org,
              collections: colls,
            };
          } else if (nameQuery) {
            const namePromises: Promise<Collection | null>[] = [];
            nameQuery.forEach((name) =>
              namePromises.push(db.collections.getByName(Number(org), name))
            );
            const colls = await Promise.all(namePromises);
            return {
              orgId: org,
              collections: colls,
            };
          } else {
            const colls = await db.collections.getByOrgId(Number(org));
            return {
              orgId: org,
              collections: colls,
            };
          }
        };
        promises.push(getCollections());
      });
      const organisationCollections = await Promise.all(promises);
      return c.json(organisationCollections);
    }
    case "Bearer sk": {
      throw new HTTPException(400);
    }
    default: {
      throw new HTTPException(401);
    }
  }
});

collections.get("/:id", async (c) => {
  const collId = c.req.param("id");
  const coll = await db.collections.getById(Number(collId));
  return c.json(coll);
});

collections.get("/:id/prompts", async (c) => {
  const collId = c.req.param("id");
  const prompts = await db.prompts.getByCollection(Number(collId));
  return c.json(prompts);
});

export default collections;
