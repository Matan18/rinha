import { client } from "../../connection";

export const searchPessoa = async (contains: string) => {
  const { rows } = await client.query(
    `SELECT * FROM pessoas WHERE pessoas.searchable ILIKE $1`,
    [`%${contains}%`]
  );
  return rows;
};
