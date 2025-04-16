import { get } from "../../api/api";
import dynamic from "next/dynamic";
import parse from "html-react-parser";
import { headers } from "next/headers";

const Seo = dynamic(() => import("../../../components/SEO/Seo"), {
  ssr: false,
  loading: () => null,
});

const getBlogPost = async (bid) => {
  const getBlogPost = await get(`news/details/${bid}`).then(
    (response) => response?.payload,
  );
  return getBlogPost;
};

const BlogPost = async ({ params: { bid } }) => {
  const blogpost = await getBlogPost(bid);

  return (
    <>
      <div className="mx-auto 4xl:container">
        <div className=" blogPostHolder mb-16">
          <div className=" imgHolder">
            <img
              src={blogpost.images.thumb_image}
              alt={blogpost.basic_data.title}
              className=" flex mx-auto mt-10 mb-4 h-[350px] w-auto"
            />
          </div>
          <div className=" titleHolder">
            <h1 className="text-4xl mt-16 text-center font-bold uppercase">
              {blogpost.basic_data.title}
            </h1>
            <p className=" date text-center font-medium">
              {blogpost.basic_data.short_description}
            </p>
          </div>
          <div className=" mt-5 txtHolder mx-10">
            <div className="text-center">
              {parse(blogpost?.basic_data?.description)}
            </div>
          </div>
          <div className="sliderHolder"></div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;

const getSEO = (bid) => {
  return get(`/news/details/seo/${bid}`).then((response) => response?.payload);
};

export const generateMetadata = async ({ params: { bid } }) => {
  const data = await getSEO(bid);
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
          url: data?.social?.share_image ?? "",
          width: 800,
          height: 600,
          alt: "Nimaco",
        },
      ],
      locale: "sr_RS",
    },
  };
};
