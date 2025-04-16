"use client";
import { useEffect, useState } from "react";
import { useCategory } from "@/hooks/nimaco.hooks";
import Link from "next/link";
import Layout from "@/components/UI/Layout";
import Breadcrumbs from "@/helpers/generateBreadCrumbsServer";
import Image from "next/image";
import FilterIcon from "@/assets/Icons/filter.png";
import { generateBreadcrumbSchema } from "@/_functions";

export const SingleCategory = ({
  slug,
  data,
  children,
  base_url,
  path,
  section,
}) => {
  const { data: singleCategory } = useCategory({ slug });

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const generateBreadcrumbs = (category) => {
      category?.parents?.forEach((parent) => {
        if (
          !breadcrumbs.some((breadcrumb) => breadcrumb.name === parent?.name)
        ) {
          setBreadcrumbs((prevBreadcrumbs) => [
            ...prevBreadcrumbs,
            {
              name: parent?.name,
              slug: parent?.link?.link_path,
            },
          ]);
        }
      });
    };

    if (singleCategory) {
      generateBreadcrumbs(singleCategory);
    }
  }, [singleCategory, breadcrumbs]);

  const uniqueBreadcrumbs = [
    ...new Set(breadcrumbs?.map((breadcrumb) => breadcrumb?.slug)),
  ];

  const breadcrumb_schema = generateBreadcrumbSchema(
    data?.parents,
    data?.basic_data?.name,
    path,
    base_url,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb_schema) }}
      />
      <div className="bg-croonus-3 py-4">
        <Layout>
          <div className="flex flex-row max-md:flex-col md:items-center md:justify-between max-md:gap-3">
            {breadcrumbs?.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <Link
                  href={`/`}
                  className="text-sm text-white font-medium max-md:text-xs"
                >
                  Početna
                </Link>{" "}
                <span className={`text-white`}>/</span>
                {uniqueBreadcrumbs.map((slug, index) => {
                  const breadcrumb = breadcrumbs.find((bc) => bc.slug === slug);
                  return (
                    <div key={index} className="flex items-center gap-1">
                      <Link
                        href={`/${slug}`}
                        className="text-sm text-white font-medium max-md:text-xs"
                      >
                        {breadcrumb?.name}
                      </Link>
                      {index !== uniqueBreadcrumbs.length - 1 && (
                        <span className={`text-white`}>/</span>
                      )}
                    </div>
                  );
                })}
                <span className={`text-white`}>/</span>
                <h2 className="text-sm text-white font-medium max-md:text-xs">
                  {singleCategory?.basic_data?.name}
                </h2>
              </div>
            )}
          </div>
        </Layout>
      </div>
      <div className="px-[3%] md:px-[5rem] max-md:mt-[2rem] mt-[4rem] mb-[4rem] flex max-md:flex-col md:items-center justify-between">
        <h1 className="font-bold text-[26px] max-md:text-[1rem] text-[#191919]">
          {singleCategory?.basic_data?.name ?? "Proizvodi iz izabrane sekcije"}
        </h1>
      </div>
    </>
  );
};
