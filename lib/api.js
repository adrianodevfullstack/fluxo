import "server-only";
 
function configuracao() {
  const url = process.env.FLUXO_API_URL;
  const chave = process.env.FLUXO_API_KEY;
 
  if (!url || !chave) {
    throw new Error(
      "Defina FLUXO_API_URL e FLUXO_API_KEY em .env.local (veja .env.example).",
    );
  }
 
  return { url, chave };
}
 
export async function buscarApi(caminho) {
  const { url, chave } = configuracao();
 
  const resposta = await fetch(`${url}${caminho}`, {
    headers: { "x-api-key": chave },
    next: { revalidate: 60 },
  });
 
  if (!resposta.ok) {
    throw new Error(`Falha ao buscar ${caminho} (status ${resposta.status})`);
  }
 
  return resposta.json();
}
 
export async function enviarApi(caminho, dados) {
  const { url, chave } = configuracao();
 
  const resposta = await fetch(`${url}${caminho}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": chave,
    },
    body: JSON.stringify(dados),
  });
 
  const corpo = await resposta.json();
  return { ok: resposta.ok, status: resposta.status, corpo };
}
