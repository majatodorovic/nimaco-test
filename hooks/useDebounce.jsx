"use client";

import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

//hook za search, proslediti searchTerm inicijalno pri pozivu hook-a i pri pozivanju funkcije
export const useSearch = ({ searchTerm, isSearchPage = false }) => {
  switch (isSearchPage) {
    case false:
      return useQuery({
        queryKey: [{ search: searchTerm }],
        queryFn: async () => {
          if (searchTerm?.length >= 3) {
            return await LIST("/products/search/list", {
              search: searchTerm,
            }).then((res) => res?.payload);
          }
        },
        refetchOnWindowFocus: false,
      });

    case true:
      return useSuspenseQuery({
        queryKey: [{ search: searchTerm }],
        queryFn: async () => {
          if (searchTerm?.length >= 3) {
            return await LIST("/products/search/list", {
              search: searchTerm,
            }).then((res) => res?.payload?.items);
          }
        },
        refetchOnWindowFocus: false,
      });

    default:
      break;
  }
};