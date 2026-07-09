import { useState } from "react";


function useProductFilters() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  return {
    search,
    setSearch,
    sort,
    setSort,
  };
}

export default useProductFilters;