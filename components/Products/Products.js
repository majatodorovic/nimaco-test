"use client";
import Layout from "../UI/Layout";
import ProductItemOne from "./ProductItemOne";
import ProductItemTwo from "./ProductItemTwo";

const Products = ({
  indexBanner2,
  indexBanner1,
  topSeller,
  action1,
  actionProducts,
  action2,
}) => {
  return (
    <div className="pb-20 max-md:pb-5 bg-[#f8f4f0]">
      <Layout>
        <div className="pt-10 max-sm:pt-0 grid xl:grid-cols-4  gap-x-20">
          {indexBanner1?.length > 0 &&
            topSeller?.length > 0 &&
            action1?.length > 0 && (
              <ProductItemOne
                indexBanner1={indexBanner1}
                topSeller={topSeller}
                action1={action1}
              />
            )}
          {indexBanner2?.length > 0 &&
            actionProducts?.length > 0 &&
            action2?.length > 0 && (
              <ProductItemTwo
                indexBanner2={indexBanner2}
                actionProducts={actionProducts}
                action2={action2}
              />
            )}
        </div>
      </Layout>
    </div>
  );
};

export default Products;
