import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

const Tabs = ({ productsDesc, specification = [], tehnicalDoc }) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className=" flex flex-col max-lg:mt-10 text-croonus-1 max-md:w-full max-md:mt-[2rem] w-[92%] mt-[5rem] ml-auto mb-14">
      {productsDesc?.description ||  tehnicalDoc?.file || specification[0]?.groups[0]?.attributes ? (
        <div className="flex border-b-2 border-b-croonus-1 ">
          {productsDesc?.description ? (
            <div
              onClick={() => setActiveTab(1)}
              className={`cursor-pointer px-4 py-2 max-lg:text-sm ${
                activeTab === 1 ? "border-b-2 border-b-croonus-3" : ""
              }`}
            >
              Opis proizvoda
            </div>
          ) : null}
          {specification[0]?.groups[0]?.attributes ? (
            <div
              onClick={() => setActiveTab(2)}
              className={`cursor-pointer px-4 py-2 max-lg:text-sm ${
                activeTab === 2 ? "border-b-2 border-b-croonus-3" : ""
              }`}
            >
              Specifikacija
            </div>
          ) : null}
          {tehnicalDoc?.items[0]?.file ? (
                <div
                  onClick={() => setActiveTab(3)}
                  className={`cursor-pointer px-4 py-2 max-lg:text-sm ${
                    activeTab === 3 ? "border-b-2 border-b-croonus-3" : ""
                  }`}
                >
                 Tehnička dokumentacija
                </div>
              ) : null}
        </div>
      ) : null}

      <div className="p-4 max-md:p-1">
        {activeTab === 1 && (
          <div
            id="description"
            dangerouslySetInnerHTML={{ __html: productsDesc?.description }}
          ></div>
        )}
        {activeTab === 2 && (
          <div id="specification">
            {(specification ?? []).map((data) => {
              return (
                <Fragment key={data?.set?.id}>
                  {(Object.values(data.groups) ?? []).map((item) => {
                    return (
                      <Fragment key={item?.group?.id}>
                        {(Object.values(item.attributes) ?? []).map(
                          (attribute, index) => {
                            return (
                              <table
                                className="table-fixed max-md:w-full w-[90%] mx-auto my-1rem table"
                                key={attribute?.attribute?.id}
                              >
                                <tbody>
                                  <tr
                                    className={`table_row ${
                                      index % 2 === 1 ? "bg-croonus-3" : ""
                                    }`}
                                  >
                                    <td className=" pl-[1.4rem] py-[0.7rem]">
                                      {attribute?.attribute?.name}
                                    </td>
                                    <td className=" pl-[1.4rem] py-[0.7rem]">
                                      {(attribute?.values ?? []).map(
                                        (value, i) => {
                                          if (
                                            i + 1 <
                                            attribute?.values.length
                                          ) {
                                            return value.name + ",";
                                          } else {
                                            return value.name;
                                          }
                                        }
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            );
                          }
                        )}
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
        )}
         {activeTab === 3 && (
              <div
                id="user-manual"
                className="flex mr-5"
              >
                {tehnicalDoc?.items?.map((doc, index) => {
                  return(
                  <div key={index}>
                    <div className=" mt-5 text-center w-fit mr-4">
                      <Link href={doc?.file} target="_blank">
                        {doc?.thumb_image ? (
                            <Image src={doc?.thumb_image} width={120} height={200}/>
                        ) : (
                          <Image src={"/missingdocimage.png"} width={120} height={200}/>
                        )}
                    
                      <p className="text-md font-semibold mt-3">{doc?.title}</p>
                      <span>View</span></Link>
                      <Link href={doc?.file} download  className="block">
                        
                      Download</Link>
                    </div>
                  </div>
                  )})}
              </div>
            )}
      </div>
    </div>
  );
};

export default Tabs;
