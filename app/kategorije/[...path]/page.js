import { SingleCategory, CategoryProducts } from "@/_components/category";
import { Suspense } from "react";
import { headers } from "next/headers";

const Category = ({
  params: { path },
  searchParams: { sort: sortURL, strana, filteri },
  category_id,
}) => {
  //slug kategorije
  const slug = category_id;

  //vadimo sort iz URL
  const sort = (sortURL ?? "_")?.split("_");
  const sortField = sort[0];
  const sortDirection = sort[1];
  const page = Number(strana) > 0 ? Number(strana) : 1;

  const filters = filteri?.split(",")?.map((filter) => {
    const [column, selected] = filter?.split("=");
    const selectedValues = selected?.split("_");
    return {
      column,
      value: {
        selected: selectedValues,
      },
    };
  });

  const base_url = headers()?.get("x-base_url");

  return (
    <>
      <Suspense
        fallback={
          <div className={`h-20 mt-10 w-full bg-slate-300 animate-pulse`} />
        }
      >
        <SingleCategory slug={slug} path={path} base_url={base_url} />
      </Suspense>
      <CategoryProducts
        slug={slug}
        strana={page}
        allFilters={[]}
        filters={filters}
        sortField={sortField}
        sortDirection={sortDirection}
      />
    </>
  );
};

export default Category;
