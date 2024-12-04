import { RowDataPacket } from "mysql2";
import { createDbConnection } from "../src/configs/mysql.ts";

const fb_user_id = "yhuqsg8U2YXzUPIfTP6n9q0Hzox2";

const conn = await createDbConnection();

await conn.query("DROP TABLE IF EXISTS Prompt");
await conn.query("DROP TABLE IF EXISTS Collection");
await conn.query("DROP TABLE IF EXISTS Organisation");

// Create Organisation table
await conn.query(
  "CREATE TABLE IF NOT EXISTS Organisation ( " +
    "id SERIAL PRIMARY KEY ," +
    "name VARCHAR(255) UNIQUE NOT NULL " +
    ");",
);

// Create ApiKey table
await conn.query(
  "CREATE TABLE IF NOT EXISTS ApiKey ( " +
    "hashed_value VARCHAR(255) PRIMARY KEY, " +
    "name VARCHAR(255), " +
    "organisation_id BIGINT UNSIGNED NOT NULL, " +
    "FOREIGN KEY (organisation_id) REFERENCES Organisation (id) " +
    ");",
);

// Create Collection table
await conn.query(
  "CREATE TABLE IF NOT EXISTS Collection ( " +
    "id SERIAL PRIMARY KEY, " +
    "name VARCHAR(255) NOT NULL, " +
    "public BOOLEAN NOT NULL DEFAULT 0, " +
    "fb_user_id VARCHAR(28) NOT NULL, " +
    "organisation_id BIGINT UNSIGNED NOT NULL, " +
    "FOREIGN KEY (organisation_id) REFERENCES Organisation (id) " +
    ");",
);

// Create Prompt table
await conn.query(
  "CREATE TABLE IF NOT EXISTS Prompt ( " +
    "id SERIAL PRIMARY KEY, " +
    "name VARCHAR(255) NOT NULL, " +
    "content TEXT NOT NULL, " +
    "collection_id BIGINT UNSIGNED NOT NULL, " +
    "FOREIGN KEY (collection_id) REFERENCES Collection (id) " +
    ");",
);

// Delete entries of tables if they exist
await conn.query("DELETE FROM Organisation");
await conn.query("DELETE FROM Collection");
await conn.query("DELETE FROM Prompt");

// Insert placeholder organisations
await conn.query(
  "INSERT INTO Organisation (name) VALUES (?)",
  ["development-organisation"],
);

// Insert placeholder apikeys
await conn.query(
  "INSERT INTO ApiKey (hashed_value, name, organisation_id) VALUES (?, ?, ?)",
  ["MOCK-HASH", "development-key", 1],
);

// Insert placeholder collections
await conn.query(
  "INSERT INTO Collection (name, fb_user_id, organisation_id) VALUES " +
    "(?, ?, ?), (?, ?, ?), (?, ?, ?)",
  [
    "first_collection",
    fb_user_id,
    1,
    "second_collection",
    fb_user_id,
    1,
    "thrid_collection",
    fb_user_id,
    1,
  ],
);

const promptPrefixes: string[] = [
  "random_prompt_alpha",
  "unique_prompt_beta",
  "creative_prompt_gamma",
  "dynamic_prompt_delta",
  "mystery_prompt_epsilon",
  "surprise_prompt_zeta",
  "unexpected_prompt_eta",
  "curious_prompt_theta",
  "enigmatic_prompt_iota",
];

const promptContent: string[] = [
  "This is the content for a good prompt.",
  "This is the content for an even better prompt.",
  "This is the content for a creative prompt.",
  "This is the content for a dynamic prompt.",
  "This is the content for a mystery prompt.",
  "This is the content for a surprise prompt.",
  "This is the content for an unexpected prompt.",
  "This is the content for a curious prompt.",
  "This is the content for an enigmatic prompt.",
];

function getRandomPrefix(): string {
  const randomIndex = Math.floor(Math.random() * promptPrefixes.length);
  return promptPrefixes[randomIndex];
}

function getRandomContent(): string {
  const randomIndex = Math.floor(Math.random() * promptContent.length);
  return promptContent[randomIndex];
}

// Insert into Prompt
const [rows] = await conn.query<RowDataPacket[]>("SELECT * FROM Collection");
for (const row of rows) {
  const arr: string[] = [];

  for (let i = 0; i < 3; i++) {
    arr.push(getRandomPrefix(), getRandomContent(), row.id);
  }

  await conn.query(
    "INSERT INTO Prompt (name, content, collection_id) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)",
    arr,
  );
}

conn.end();
Deno.exit();
