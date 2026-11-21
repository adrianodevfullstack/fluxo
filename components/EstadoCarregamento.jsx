export default function EstadoCarregamento({ texto = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-zinc-500">
      <span className="animar-girar h-8 w-8 rounded-full border-2 border-zinc-200 border-t-marca" />
      <p className="text-sm">{texto}</p>
    </div>
  );
}
