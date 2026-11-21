"use server";

import { enviarApi } from "@/lib/api";
import {
  VALORES_INICIAIS_CONTATO,
  lerValoresContato,
  validarContato,
} from "@/lib/contato";

export async function enviarContato(_estadoAnterior, formData) {
  const valores = lerValoresContato(formData);
  const erros = validarContato(valores);

  if (Object.keys(erros).length > 0) {
    return { status: "erro", valores, erros, erroGeral: null };
  }

  try {
    const { ok, status, corpo } = await enviarApi("/api/contato", valores);

    if (ok) {
      return {
        status: "sucesso",
        valores: VALORES_INICIAIS_CONTATO,
        erros: {},
        erroGeral: null,
      };
    }

    if (status === 400 && corpo.erros) {
      return { status: "erro", valores, erros: corpo.erros, erroGeral: null };
    }

    console.error(`fluxo-api respondeu ${status} em /api/contato`);
  } catch (erro) {
    console.error("Falha ao chamar a fluxo-api:", erro);
  }

  return {
    status: "erro",
    valores,
    erros: {},
    erroGeral:
      "Não foi possível enviar sua mensagem agora. Tente novamente em instantes.",
  };
}
