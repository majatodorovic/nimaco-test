import { get } from "@/app/api/api";
import { notFound, permanentRedirect } from "next/navigation";
import { headers } from "next/headers";
import { getRobots, handleCategoryRobots } from "@/_functions";
import CategoryPage from "@/app/kategorije/[...path]/page";
import ProductPage from "@/app/proizvod/[...path]/page";

const handleData = async (slug) => {
  return await get(`/slugs/product-categories?slug=${slug}`).then((res) => {
    return res?.payload;
  });
};

const fetchCategorySEO = async (slug) => {
  return await get(`/categories/product/single/seo/${slug}`).then(
    (response) => {
      return response?.payload;
    },
  );
};

const getProductSEO = async (id) => {
  return await get(`/product-details/seo/${id}`).then((response) => {
    return response?.payload;
  });
};

const defaultMetadata = {
  title: "Početna | Nimaco",
  description: "Dobrodošli na Nimaco Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Početna | Nimaco",
    description: "Dobrodošli na Nimaco Online Shop",
    type: "website",
    url: "https://nimaco.rs",
    image:
      "https://api.nimaco.croonus.com/croonus-uploads/config/b2c/logo-a52ac5760506f881ac0049dc792c92b8.webp",
    site_name: "nimaco.rs",
    locale: "sr_RS",
  },
};

export async function generateMetadata({
  params: { path },
  searchParams: { filteri, sort, viewed, strana },
}) {
  const str = path?.join("/");
  const data = await handleData(str);
  const headersList = headers();
  let canonical = headersList?.get("x-pathname");
  switch (true) {
    case data?.status === false &&
      data?.type === null &&
      data?.id === null &&
      data?.redirect_url === false:
      return defaultMetadata;

    case data?.type === "category" &&
      data?.status &&
      data?.redirect_url === false:
      const category = await fetchCategorySEO(data?.id);

      if (category) {
        let {
          meta_title: title,
          meta_keywords: keywords,
          meta_description: description,
          meta_image: image,
          meta_canonical_link: canonical_link,
          meta_robots: robots,
          social: { share_title, share_description, share_image },
        } = category;

        return {
          title: title ?? "",
          description: description ?? "",
          keywords: keywords ?? "",
          image: image ?? "",
          alternates: {
            canonical: `${canonical_link ?? canonical}`,
          },
          openGraph: {
            title: `${share_title}` ?? "",

            description: share_description ?? "",
            images: [
              {
                url: share_image ?? "",
                width: 800,
                height: 600,
                alt: share_description ?? "",
                title: share_title ?? "",
                description: share_description ?? "",
              },
            ],
          },
          robots: handleCategoryRobots(strana, filteri, sort, viewed, robots),
        };
      } else {
        return defaultMetadata;
      }

    case data?.type === "product" &&
      data?.status &&
      data?.redirect_url === false:
      const productSEO = await getProductSEO(data?.id);

      let robots = getRobots(productSEO?.meta_robots);
      const image =
        productSEO?.meta_image ??
        "https://api.nimaco.croonus.com/croonus-uploads/config/b2c/logo-a52ac5760506f881ac0049dc792c92b8.webp";
      if (productSEO) {
        return {
          alternates: {
            canonical: `${productSEO?.meta_canonical_link ?? canonical}`,
          },
          description:
            `${productSEO?.meta_title} - ${productSEO?.meta_description}` ?? "",
          keywords: productSEO?.meta_keywords ?? "",
          openGraph: {
            title: `${productSEO?.social?.share_title}` ?? "",
            description: productSEO?.social?.share_description ?? "",
            type: "website",
            images: [
              {
                url: image,
                width: 800,
                height: 800,
                alt:
                  productSEO?.social?.share_title ??
                  productSEO?.social?.share_description,
              },
            ],
          },
          robots: robots,
          title: `${productSEO?.meta_title}` ?? "",
        };
      } else {
        return defaultMetadata;
      }
  }
}

const CategoryProduct = async ({ params: { path }, params, searchParams }) => {
  const str = path?.join("/");
  const data = await handleData(str);
  switch (true) {
    case data?.type === "category" &&
      data?.status === true &&
      data?.redirect_url === false:
      return (
        <CategoryPage
          params={params}
          searchParams={searchParams}
          category_id={data?.id}
        />
      );
    case data?.type === "product" &&
      data?.status === true &&
      data?.redirect_url === false:
      return (
        <ProductPage
          path={data?.id}
          category_id={path?.[path?.length - 2] ?? "*"}
        />
      );
    case data?.status === false:
      return notFound();
    default:
      permanentRedirect(`/${data?.redirect_url}`);
  }
};

export default CategoryProduct;
