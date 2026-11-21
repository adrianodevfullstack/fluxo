import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });
  }

  return NextResponse.json({
    usuario: req.auth.user.name,
    papel: req.auth.user.papel,
    fluxosAtivos: 4,
    execucoesHoje: 128,
  });
});
