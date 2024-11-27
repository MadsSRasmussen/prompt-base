import mysql, { ConnectionOptions } from "mysql2/promise";

const env_runtime = Deno.env.get('RUNTIME_ENVIRONMENT')
const runtime_enviroment = env_runtime ? env_runtime : 'development';

export async function createDbConnection() {
    const access: ConnectionOptions = {
        host: (runtime_enviroment == 'development') ? 'localhost' : Deno.env.get('DB_HOST'),
        user: Deno.env.get('DB_USER'),
        database: Deno.env.get('DB_NAME'),
        password: Deno.env.get('DB_PASSWORD'),
        port: 3306,
    }
    const connection = await mysql.createConnection(access);
    return connection;
}