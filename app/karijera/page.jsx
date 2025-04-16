import Layout from "../../components/UI/Layout";
import { list } from "@/app/api/api";
import Link from "next/link";

export const metadata = {
  title: "Karijera | Nimaco",
  description: "Dobrodošli na online prodavnicu Nimaco.",
};

const getCareer = async () => {
  return await list(`/career/list`)
    .then((res) => {
      if (res?.payload) {
        return res.payload;
      } else {
        return [];
      }
    })
    ?.catch((err) => {
      console.log(err);
    });
};

const Career = async () => {
  const career = await getCareer();

  return (
    <div className="mx-auto 4xl:container">
      <Layout>
        <h1 className="mt-10 mb-6 text-center text-4xl font-bold uppercase">
          Karijera
        </h1>
        <div className="mt-[4rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {(career?.items ?? [])?.map((item) => {
            if (item) {
              const { id, slug, name, description } = item;

              return (
                <Link
                  href={`/karijera/${slug}`}
                  key={id}
                  className={`bg-white p-4 shadow-md group flex flex-col`}
                >
                  <h2
                    className={`text-lg font-semibold group-hover:text-croonus-3`}
                  >
                    {name}
                  </h2>
                  <p
                    className={`line-clamp-2 text-sm my-3`}
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></p>
                  <Link
                    href={`/karijera/${slug}`}
                    className={`mt-auto block w-full bg-croonus-3 text-white text-center py-2 rounded-md hover:bg-opacity-80`}
                  >
                    Detaljnije
                  </Link>
                </Link>
              );
            }
          })}
        </div>
      </Layout>
    </div>
  );
};

export default Career;

export const revalidate = 30;
