export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div style={{ padding: "200px" }}>
      <h1>Welcome to Home page</h1>
    </div>
  );
}
