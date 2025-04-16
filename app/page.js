import { get, list } from "./api/api";
import IndexSlider from "../components/IndexSlider/IndexSlider";
import DealsOfTheDay from "../components/DealsOfTheDay/DealsOfTheDay";
import RecommendedCategories from "@/components/RecommendedCategories/RecommendedCategories";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import Brands from "@/components/Brands/Brands";
import About from "@/components/About/About";
import About3 from "@/components/About/About3";
import RecommendedCategories2 from "@/components/RecommendedCategories/RecommendedCategories2";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";

const fetchBanners = async () => {
  return await get("/banners/index_slider").then(
    (response) => response?.payload,
  );
};
const fetchAction4 = async () => {
  return await get("/banners/action4").then((response) => response?.payload);
};
const fetchMobileBanners = async () => {
  return await get("/banners/index_slider_mobile").then(
    (response) => response?.payload,
  );
};
const fetchIndexBanner = async () => {
  return await get("/banners/indexbanner1").then(
    (response) => response?.payload,
  );
};
const fetchIndexBanner2 = async () => {
  return await get("/banners/indexbanner2").then(
    (response) => response?.payload,
  );
};
const fetchIndexBanner3 = async () => {
  return await get("/banners/indexbanner3").then(
    (response) => response?.payload,
  );
};
const fetchRecommendedCategories = async () => {
  return await list("/categories/section/recommended").then(
    (response) => response?.payload,
  );
};
const fetchRecommendedBanners = async () => {
  return await get("/banners/recommended_banners").then(
    (response) => response?.payload,
  );
};

const fetchRecommendedProducts = async () => {
  return await list("/products/section/list/recommendation", {
    render: false,
  }).then((res) => res?.payload.items);
};

const Index = async () => {
  const banners = await fetchBanners();
  const action4 = await fetchAction4();
  const mobileBanner = await fetchMobileBanners();
  const indexBanner = await fetchIndexBanner();
  const recommendedCategories = await fetchRecommendedCategories();
  const indexBanner2 = await fetchIndexBanner2();
  const indexBanner3 = await fetchIndexBanner3();
  const recommendedBanners = await fetchRecommendedBanners();
  const recommendedProducts = await fetchRecommendedProducts();

  const base_url = headers().get("x-base_url");

  const schema = generateOrganizationSchema(base_url);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <IndexSlider banner={banners} mobileBanner={mobileBanner} />
      <RecommendedCategories2 recommendedCategories={recommendedCategories} />
      <DealsOfTheDay products={recommendedProducts} action4={action4} />
      {/* <WhatWeOffer indexBanner={indexBanner} /> */}
      <RecommendedCategories recommendedBanners={recommendedBanners} />
      <CompanyInfo />
      <Brands />
      <About indexBanner2={indexBanner2} />
      {/* <About2 indexBanner3={indexBanner3} /> */}

      <About3 />
      {/* <Products
        indexBanner1={indexBanner1}
        indexBanner2={indexBanner2}
        topSeller={topSeller}
        actionProducts={actionProducts}
        action1={action1}
        action2={action2}
      /> */}
      {/* 
      <DailyDeals recommendedProducts={recommendedProducts} action4={action4} /> 
      <IndexSlider2 indexBanner={indexBanner} />*/}

      {/* 
      <IndexSlider3 /> */}
    </div>
  );
};
export default Index;

export const revalidate = 15;

//

const getSEO = () => {
  return get("/homepage/seo").then((response) => response?.payload);
};

export const generateMetadata = async () => {
  const data = await getSEO();
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | Nimaco",
    description: data?.meta_description ?? "Dobrodošli na Nimaco Online Shop",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Početna | Nimaco",
      description:
        data?.social?.share_description ?? "Dobrodošli na Nimaco Online Shop",
      type: "website",
      images: [
        {
          url:
            data?.social?.share_image ??
            "https://api.nimaco.croonus.com/croonus-uploads/config/b2c/logo-a52ac5760506f881ac0049dc792c92b8.webp",
          width: 800,
          height: 600,
          alt: "Nimaco",
        },
      ],
      locale: "sr_RS",
    },
  };
};
