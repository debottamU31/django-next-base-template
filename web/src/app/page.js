import DragableContainer from "../components/widgets/DragableContainer";

const base_api = process.env.API


async function getApiData() {
  console.log('Calling this api', `${base_api}/documents/` )
  return fetch(`${base_api}/documents/`, {cache: 'force-cache'}).then((r) => r.json());
}

export default async function Home() {
  const data = await getApiData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-300">
      <DragableContainer initialData={data} />
    </main>
  );
}
