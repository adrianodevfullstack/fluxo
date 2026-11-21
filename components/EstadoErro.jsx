export default function EstadoErro({
  texto = "Não foi possível carregar os dados.",
  aoTentarNovamente,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-6 py-16 text-center">
      <p className="text-sm text-red-700">{texto}</p>
      {aoTentarNovamente && (
        <button
          type="button"
          onClick={aoTentarNovamente}
          className="rounded-full border border-red-300 px-5 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
