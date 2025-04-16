"use client";

import { useCategory } from "@/hooks/nimaco.hooks";

export const CategoryLongDescription = ({ slug }) => {
  const { data } = useCategory({ slug });

  if (data?.id) {
    const {
      basic_data: { long_description },
    } = data;

    return (
      <div className={`mt-10 max-md:px-2 md:!px-[7rem] py-2`}>
        <div
          className={`prose !max-w-full prose:!text-black`}
          dangerouslySetInnerHTML={{ __html: long_description }}
        ></div>
      </div>
    );
  }
};
