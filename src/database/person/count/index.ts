import { client } from "../../connection";

export const countPessoas = async () => {
  const {
    rows: [{ count }],
  } = await client.query(`SELECT COUNT(*) FROM pessoas`);

  return count;
};
