"use client";
import { useState, useCallback, useEffect } from "react";
import { list, get } from "../api/api";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const Seo = dynamic(() => import("../../components/SEO/Seo"), {
  ssr: false,
  loading: () => null,
});

const Blog = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      const fetchBlog = await list("news/category/list/all").then((res) =>
        setBlog(res?.payload?.items)
      );
    };
    fetchBlog();
  }, []);

  const [postNum, setPostNum] = useState(15);

  function handleClick() {
    setPostNum((prevPostNum) => prevPostNum + 3); // 3 is the number of posts you want to load per click
  }
  const numPostsLoaded = Math.min(postNum, blog.length);
  const allPostsLoaded = numPostsLoaded === blog.length;

  return (
    <>
      <Seo
        title="Blog | Nimaco"
        keywords="blog"
        description="Blog"
        ogtitle="Blog"
        ogdescription="Blog"
        ogurl={`${process.env.BASE_URL}blog`}
      />
      <div className="mx-auto 4xl:container text-croonus-1">
        <div className=" blogHolder mx-4">
          <div className=" titleHolder">
            <h1 className="mt-10 mb-6 text-center text-4xl font-bold uppercase">
              Aktuelnosti
            </h1>
            <div className="holderText">
            <p className="text-center  text-sm">Dobrodošli na stranicu Aktuelnosti kompanije NI MACO, gde delimo najnovije informacije, događaje i promocije iz naše kompanije. Ostanite u toku s najnovijim dešavanjima prateći naše vesti i newsletter.</p></div>
            <p className="mb-16 text-center text-lg mt-[2rem] font-medium">Najnovije vesti</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-3 p-6">
            {blog?.slice(0, postNum).map((row) => {
              return (
                <div className="col-span-1 mb-6 p-4" key={row?.id}>
                  <Link href={`/blog/${row?.id}`}>
                    <div className=" postHolder" id={row.id}>
                      <div className=" imgHolder">
                        <Image
                          src={row.images.thumb_image}
                          className="rounded-xl"
                          alt={row.title}
                          width={450}
                          height={350}
                        />
                      </div>
                      <div className=" textHolder">
                        <h5 className="mt-2 mb-2 text-[1.2rem] font-bold uppercase">
                          {row.basic_data.title}
                        </h5>
                        <button className=" blogReadMore text-[18px]">
                          Pročitajte više
                          <i className="fa-solid fa-arrow-right ml-2 h-[20px] cursor-pointer text-base hover:text-croonus-4" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          {allPostsLoaded ? (
          <button className="loadMoreButton">Nema više</button>
        ) : (
          <button onClick={handleClick} className="loadMoreButton">
            Učitaj još
          </button>
        )}
          <p className="text-center text-lg  font-medium">Newsletter</p>
          <p className="text-center text-sm mt-4">Prijavite se za naš newsletter i budite prvi informisani o:</p>
          <ul className="text-center text-sm mt-2">
            <li className="text-sm mb-1">
            • Posebnim ponudama i akcijama
            </li>
            <li className="text-sm mb-1">
            • Najnovijim trendovima u građevinskoj stolariji
            </li>
            <li className="text-sm mb-1">
            • Savetima i trikovima za održavanje stolarije
            </li>
          </ul>
        </div>
       
      </div>
    </>
  );
};

export default Blog;
