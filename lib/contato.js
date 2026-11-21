export const CAMPOS_CONTATO = ["nome", "email", "empresa", "mensagem"];

export const LIMITES_CONTATO = {
  nome: 100,
  email: 254,
  empresa: 100,
  mensagem: 2000,
};

export const VALORES_INICIAIS_CONTATO = {
  nome: "",
  email: "",
  empresa: "",
  mensagem: "",
};

export const ESTADO_INICIAL_CONTATO = {
  status: "ocioso", // ocioso | erro | sucesso
  valores: VALORES_INICIAIS_CONTATO,
  erros: {},
  erroGeral: null,
};

const EXPRESSAO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function lerValoresContato(formData) {
  const valores = {};
  for (const campo of CAMPOS_CONTATO) {
    const valor = formData.get(campo);
    valores[campo] = typeof valor === "string" ? valor : "";
  }
  return valores;
}

export function validarContato(valores) {
  const erros = {};

  if (!valores.nome.trim()) {
    erros.nome = "Informe seu nome.";
  } else if (valores.nome.length > LIMITES_CONTATO.nome) {
    erros.nome = `Use no máximo ${LIMITES_CONTATO.nome} caracteres.`;
  }

  if (!valores.email.trim()) {
    erros.email = "Informe seu e-mail.";
  } else if (
    !EXPRESSAO_EMAIL.test(valores.email.trim()) ||
    valores.email.length > LIMITES_CONTATO.email
  ) {
    erros.email = "Informe um e-mail válido.";
  }

  if (valores.empresa.length > LIMITES_CONTATO.empresa) {
    erros.empresa = `Use no máximo ${LIMITES_CONTATO.empresa} caracteres.`;
  }

  if (valores.mensagem.trim().length < 10) {
    erros.mensagem = "Conte um pouco mais (pelo menos 10 caracteres).";
  } else if (valores.mensagem.length > LIMITES_CONTATO.mensagem) {
    erros.mensagem = `Use no máximo ${LIMITES_CONTATO.mensagem} caracteres.`;
  }

  return erros;
}
