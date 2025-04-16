import SearchPage from "@/components/SearchPage/SearchPage";
import { Suspense } from "react";
export const metadata = {
    title: "Pretraga | Nimaco",
    description: "Dobrodošli na online prodavnicu Nimaco.",
};
const Search = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default Search;
