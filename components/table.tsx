"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/helpers";
import { useState } from "react";

interface Data {
  items: Item[];
}

interface Item {
  name: string;
  count: number;
}

type Order = "asc" | "desc";
type sortBy = "popular" | "name"; 

const API_URL = "https://api.stackexchange.com/2.3/tags?site=stackoverflow";

const Table = () => {
    const [elementsPerPage, setElementsPerPage] = useState(10);
    
  const queryStr = `&pagesize=${elementsPerPage}&order=${"desc"}&sort=${"popular"}`;
  const getTags = (fetchData<Data>).bind(null, API_URL.concat(queryStr));

  const { data, isLoading, isError } = useQuery({
    queryKey: ["TAGS", elementsPerPage],
    queryFn: getTags,
    initialData: { items: [] },
  });

  console.log(data);

  if (isLoading) return "Loading...";

  if (isError) return "Error";

  return (
    <div>
      <ul>
        {data.items.map((item) => (
          <li key={item.name}>
            {item.name} - {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Table;
