"use client";
import DailyDealsProduct from "./DailyDealsProduct";
import Layout from "../UI/Layout";

const DailyDeals = ({ recommendedProducts, action4 }) => {
  return (
    <Layout>
       
      <div className="mt-[3rem] max-md:py-3 max-md:mt-0 gap-5 py-10">
        {recommendedProducts?.length > 0 && action4?.length > 0 && (
          <DailyDealsProduct
            recommendedProducts={recommendedProducts}
            action4={action4}
          />
        )}
      </div>
    </Layout>
  );
};

export default DailyDeals;
