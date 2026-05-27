"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ padding: 24 }}>
      <h2>Ocorreu um erro.</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Tentar novamente</button>
    </div>
  );
}