import { client } from "../../connection";

const query = await Bun.file(
  "src/database/migrations/script/migration.sql"
).text();

client.query(query);
