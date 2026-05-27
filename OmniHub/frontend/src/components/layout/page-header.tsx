export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </div>
  );
}