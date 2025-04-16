"use client";
import { useRouter } from "next/navigation";
import GenerateBreadCrumbsServer from "@/helpers/generateBreadCrumbsServer";
import ThumbSlider from "../ThumbSlider/ThumbSlider";
import Layout from "../../components/UI/Layout";
import ItemInfo from "./ItemInfo";
import Tabs from "./Tabs";
import RelatedProductss from "../RelatedProductss.jsx/RelatedProductss";
import Link from "next/link";
import UpsellProducts from "../UpSellProducts/UpSellProducts";
import CrosssellProducts from "../CrosssellProducts/CrosssellProducts";

const ProductDetailsPage = ({
  products,
  gallery,
  badge,
  specification,
  productsDesc,
  relatedProducts,
  tehnicalDoc,
  breadcrumbs,
  canonical,
}) => {
  console.log("Products", products);
  return (
    <div className="">
      <div className="bg-croonus-3 md:p-5 max-md:py-2">
        <Layout>
          <div className="">
            {breadcrumbs && (
              <div className="flex items-center gap-1 flex-wrap">
                <Link
                  href={`/`}
                  className="text-sm text-white font-medium max-md:text-xs"
                >
                  Početna
                </Link>
                <span className={`text-white`}>/</span>
                {breadcrumbs?.steps?.map((crumb, index) => {
                  return (
                    <div key={index} className="flex items-center gap-1">
                      <Link
                        href={`/${crumb?.link?.link_path}`}
                        className="text-sm text-white font-medium max-md:text-xs"
                      >
                        {crumb?.name}
                      </Link>
                      <span className={`text-white`}>/</span>
                    </div>
                  );
                })}

                <h2 className="text-sm text-white font-medium max-md:text-xs">
                  {breadcrumbs?.end?.name}
                </h2>
              </div>
            )}
          </div>
        </Layout>
      </div>
      <Layout>
        <div className="max-md:mt-[1rem] mt-[5rem] max-md:w-[95%] max-md:mx-auto mx-[5rem] gap-x-[4.063rem] md:grid md:grid-cols-4 max-md:mb-[2rem] mb-[5rem]">
          <ThumbSlider gallery={gallery} className="grid-row-span-4" />
          <div className="flex col-span-2">
            <ItemInfo product={products} badge={badge} canonical={canonical} />
          </div>
        </div>
        <div className="col-span-2">
          <Tabs
            products={products}
            productsDesc={productsDesc}
            specification={specification}
            tehnicalDoc={tehnicalDoc}
          />
        </div>
        <div className={`mt-5 px-2 md:px-[2rem]`}>
          <UpsellProducts id={products?.data?.item.id} />
        </div>
        <div className={`mt-5 px-2 md:px-[2rem]`}>
          <CrosssellProducts id={products?.data?.item.id} />
        </div>
        <div className={`mt-5 px-2 md:px-[2rem]`}>
          <RelatedProductss id={products?.data?.item.id} />
        </div>
      </Layout>
    </div>
  );
};

export default ProductDetailsPage;
