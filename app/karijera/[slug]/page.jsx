import { get } from "@/app/api/api";
import { Suspense } from "react";
import Layout from "@/components/UI/Layout";
import { notFound } from "next/navigation";

const getCareerDetails = async (slug) => {
  return await get(`/career/${slug}`)
    .then((res) => {
      if (res?.payload) {
        return res.payload;
      } else {
        return {};
      }
    })
    ?.catch((err) => {
      console.log(err);
    });
};

const CareerDetails = ({ params: { slug } }) => {
  return (
    <Suspense fallback={`loading...`}>
      <Career slug={slug} />
    </Suspense>
  );
};

const Career = async ({ slug }) => {
  const career = await getCareerDetails(slug);

  if (career?.id) {
    const { name, description, candidates_number } = career;

    return (
      <Layout>
        <div className={`mx-auto !text-center !text-black`}>
          <h1 className={`mt-10 mb-6 text-center text-4xl font-bold uppercase`}>
            {name}
          </h1>
          <p
            className={`text-base prose !text-left !max-w-full mx-auto !text-black prose:!text-black`}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
          <p className={`text-base !text-center mt-10`}>
            Broj potrebnih kandidata: {candidates_number}
          </p>
        </div>
      </Layout>
    );
  } else {
    return notFound();
  }
};

export default CareerDetails;
