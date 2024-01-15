import { Client } from "pg";

const {
  HOST: host = "localhost",
  POSTGRES_DB: database = "rinha",
  POSTGRES_USER: user = "matan18",
  POSTGRES_PASSWORD: password = "matan18",
} = Bun.env;

export const client = new Client({
  host,
  user,
  password,
  database,
});
await client.connect();
