import { RowDataPacket } from "mysql2";
import { createDbConnection } from "../src/configs/mysql.ts";
import encryption from "../src/utils/encryption.ts";

const conn = await createDbConnection();

await conn.query("DROP TABLE IF EXISTS OrganisationUser");
await conn.query("DROP TABLE IF EXISTS User");
await conn.query("DROP TABLE IF EXISTS Prompt");
await conn.query("DROP TABLE IF EXISTS Collection");
await conn.query("DROP TABLE IF EXISTS ApiKey");
await conn.query("DROP TABLE IF EXISTS Organisation");

// Create Organisation table
await conn.query(
  "CREATE TABLE IF NOT EXISTS Organisation ( " +
    "id SERIAL PRIMARY KEY ," +
    "name VARCHAR(255) NOT NULL, " +
    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP " +
    ");",
);

// Create User table
await conn.query(
  "CREATE TABLE IF NOT EXISTS User( " +
    "id SERIAL PRIMARY KEY, " +
    "fb_user_id VARCHAR(28) UNIQUE NOT NULL, " +
    "personal_organisation_id BIGINT UNSIGNED NOT NULL, " +
    "display_name VARCHAR(255), " +
    "email VARCHAR(255), " +
    "FOREIGN KEY (personal_organisation_id) REFERENCES Organisation (id) " +
    ");",
);

// Create OrganisationUser table
await conn.query(
  "CREATE TABLE IF NOT EXISTS OrganisationUser( " +
    "organisation_id BIGINT UNSIGNED NOT NULL, " +
    "user_id BIGINT UNSIGNED NOT NULL, " +
    "PRIMARY KEY (organisation_id, user_id), " +
    "FOREIGN KEY (organisation_id) REFERENCES Organisation (id), " +
    "FOREIGN KEY (user_id) REFERENCES User (id) " +
    ");",
);

// Create ApiKey table
await conn.query(
  "CREATE TABLE IF NOT EXISTS ApiKey ( " +
    "id SERIAL PRIMARY KEY, " +
    "hash CHAR(64) UNIQUE NOT NULL, " +
    "name VARCHAR(255) NOT NULL, " +
    "peek CHAR(4) NOT NULL, " +
    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
    "organisation_id BIGINT UNSIGNED NOT NULL, " +
    "FOREIGN KEY (organisation_id) REFERENCES Organisation (id) " +
    ");",
);

// Create Collection table
await conn.query(
  "CREATE TABLE IF NOT EXISTS Collection ( " +
    "id SERIAL PRIMARY KEY, " +
    "name VARCHAR(255) NOT NULL, " +
    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
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
    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
    "collection_id BIGINT UNSIGNED NOT NULL, " +
    "FOREIGN KEY (collection_id) REFERENCES Collection (id) " +
    ");",
);

// Delete entries of tables if they exist
await conn.query("DELETE FROM Organisation");
await conn.query("DELETE FROM Collection");
await conn.query("DELETE FROM Prompt");

conn.end();
Deno.exit();
