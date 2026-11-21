import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ResumoPainel from "@/components/ResumoPainel";
import { sair } from "./actions";
 
export default async function Painel() {
  const session = await auth();
 
  if (!session) {
    redirect("/login");
  }
 
  return (
    <section>
      <p>Olá, {session.user.name} — logado como {session.user.papel}.</p>
      <form action={sair}>
        <button type="submit">Sair</button>
      </form>
      <ResumoPainel />
    </section>
  );
}
