import { client } from "../../connection";

type Props = {
  id?: string;
  nome: string;
  stack: string[] | null;
  apelido: string;
  nascimento: string;
};

export const createPerson = async ({
  id = crypto.randomUUID(),
  nome,
  stack,
  apelido,
  nascimento,
}: Props) => {
  const {
    rows: [created],
  } = await client.query<{ id: string }>(
    `
  INSERT INTO pessoas(id, nome, stack, apelido, nascimento)
  VALUES($1, $2, $3, $4, $5) RETURNING id`,
    [id, nome, stack, apelido, nascimento]
  );
  return created;
};
