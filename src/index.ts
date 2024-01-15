import "./database/migrations/script";
import { countPessoas } from "./database/person/count";
import { createPerson } from "./database/person/create";
import { getPessoaById } from "./database/person/get";
import { searchPessoa } from "./database/person/search";

Bun.serve({
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/contagem-pessoas") {
      const count = await countPessoas();
      return new Response(count.toString());
    }
    if (url.pathname.startsWith("/pessoas")) {
      if (request.method === "POST") {
        const { nome, apelido, stack, nascimento } = await request.json();
        if (
          !Number.isNaN(Number(nome)) ||
          stack?.some((item: string) => !Number.isNaN(Number(item))) ||
          Number.isNaN(new Date(nascimento))
        ) {
          return new Response("invalid", { status: 400 });
        }

        try {
          const { id } = await createPerson({
            nome,
            stack,
            apelido,
            nascimento,
          });
          const headers = new Headers({ Location: `/pessoas/${id}` });

          return new Response("inserted", { status: 201, headers });
        } catch (error) {
          return new Response("failed", { status: 422 });
        }
      }
      const path = url.pathname.split("/");

      if (path.length > 2) {
        const id = url.pathname.split("/").pop() || "";
        try {
          const pessoa = await getPessoaById(id);
          if (!pessoa) throw new Error();

          const stack = pessoa.stack?.length === 0 ? null : pessoa.stack;

          return new Response(JSON.stringify({ ...pessoa, stack }));
        } catch {
          return new Response("", { status: 404 });
        }
      }
      if (url.searchParams.has("t")) {
        const pessoas = await searchPessoa(url.searchParams.get("t") || "");
        return new Response(JSON.stringify(pessoas));
      }
    }
    return new Response("error", { status: 400 });
  },
  port: 3000,
});
