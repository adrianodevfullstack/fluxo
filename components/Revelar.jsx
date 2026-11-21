"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function Revelar({
  children,
  atrasoMs = 0,
  className,
  as: Elemento = "div",
}) {
  const referencia = useRef(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = referencia.current;
    if (!elemento) return;

    let temporizador;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        temporizador = setTimeout(() => setVisivel(true), atrasoMs);
        observador.disconnect();
      },
      { threshold: 0.15 },
    );

    observador.observe(elemento);

    return () => {
      observador.disconnect();
      clearTimeout(temporizador);
    };
  }, [atrasoMs]);

  return (
    <Elemento
      ref={referencia}
      className={clsx("revelar", visivel && "revelar-visivel", className)}
    >
      {children}
    </Elemento>
  );
}
