"use client";

import { createContext, useContext, useState } from "react";

const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => new Set());

  function alternar(idPlano) {
    setFavoritos((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(idPlano)) {
        proximo.delete(idPlano);
      } else {
        proximo.add(idPlano);
      }
      return proximo;
    });
  }

  function estaFavoritado(idPlano) {
    return favoritos.has(idPlano);
  }

  const valor = { favoritos, total: favoritos.size, alternar, estaFavoritado };

  return (
    <FavoritosContext.Provider value={valor}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const contexto = useContext(FavoritosContext);
  if (!contexto) {
    throw new Error(
      "useFavoritos precisa ser usado dentro de um <FavoritosProvider>.",
    );
  }
  return contexto;
}
