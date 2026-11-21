"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../auth";

export async function autenticar(estadoAnterior, formData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      senha: formData.get("senha"),
      redirectTo: "/painel",
    });
  } catch (erro) {
    if (erro instanceof AuthError) {
      return "E-mail ou senha incorretos.";
    }
    throw erro;
  }
}
