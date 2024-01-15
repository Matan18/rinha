import { client } from "../../connection";

export const getPessoaById = async (id: string) => {
  const {
    rows: [pessoa],
  } = await client.query<Pessoa>(
    `
  SELECT * FROM pessoas
  WHERE pessoas.id = $1`,
    [id]
  );
  return pessoa;
};
