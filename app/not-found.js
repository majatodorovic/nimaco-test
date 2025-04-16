"use client";

import Layout from "@/components/UI/Layout";
import Link from "next/link";

const NotFound = () => {
  return (
    <Layout>
      <title>404 | Nimaco</title>
      <meta name="description" content="Stranica nije pronadjena" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>

      <div className={`flex flex-col mt-10 items-center justify-center`}>
        <h1 className={`text-2xl mt-10 font-bold my-5`}>
          Stranica nije pronadjena
        </h1>
        <p className={`text-center mt-3`}>
          Molimo vas da proverite da li ste uneli ispravnu adresu.
        </p>
        <Link
          className={`px-5 py-2 bg-croonus-3 text-white hover:bg-opacity-80 rounded-md mt-5`}
          href={`/`}
        >
          Povratak na početnu stranu
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
