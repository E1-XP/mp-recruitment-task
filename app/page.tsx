import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";

import { API_URL } from "@/config";
import { fetchData } from "@/helpers";
import { Data } from "@/modules/tags-explorer/interfaces";
import { Typography } from "@mui/material";

export default async function Home() {
  const content = { heading: "Tags explorer" };
 
  const queryStr = `?site=stackoverflow&pagesize=10&page=1&order=desc&sort=popular&filter=!nNPvSNVZJS&key=${process.env.NEXT_PUBLIC_STACKEXCHANGE_API_KEY}`;
  const URL = API_URL.concat("/tags", queryStr);

  const initialTagsData = await fetchData<Data>(URL);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full max-w-screen-xl px-4 sm:px-12 mx-auto my-16 flex flex-col gap-8">
        <Typography variant="h4" align="center">{content.heading}</Typography>
        <Table initialData={initialTagsData} />
      </main>
      <Footer />
    </div>
  );
}
