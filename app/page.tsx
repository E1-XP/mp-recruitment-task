import Table from "@/components/Table";

import { API_URL } from "@/config";
import { fetchData } from "@/helpers";
import { Data } from "@/modules/tags-explorer/interfaces";

export default async function Home() {
  const queryStr = `?site=stackoverflow&pagesize=10&page=1&order=desc&sort=popular&filter=!nNPvSNVZJS&key=${process.env.NEXT_PUBLIC_STACKEXCHANGE_API_KEY}`;
  const URL = API_URL.concat("/tags", queryStr);
  
  const initialTagsData = await fetchData<Data>(URL);

  return (
    <main className="container mx-auto">
      <Table initialData={initialTagsData} />
    </main>
  );
}
