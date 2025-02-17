import React from "react";
import { Link } from "react-router-dom";

const ProjectTable = () => {
  return (
    <div className="w-full p-5 flex justify-center items-start">
      <div className="w-full mt-7 bg-[#FFFFFF] px-6 py-4 rounded-3xl">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-[25.63px] font-bold">Product</h1>
          <Link to="add">
            <button className="bg-primary hover:bg-red-dark text-white px-2 w-[132px] h-[32px] rounded-md text-[12.64px]">
              Add New Product
            </button>
          </Link>
        </div>

        <nav aria-label="Breadcrumb" className="flex mb-5">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                className="inline-flex items-center text-primary text-xs"
                to="/dashboard"
              >
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="ml-1 text-primary text-xs md:ml-2">
                  Product
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="text-left mb-20 text-sm">
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                    
                  >
                    Product Name 
                  </button>
                </th>
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                    
                  >
                    SKU Product 
                  </button>
                </th>
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                    
                  >
                    Stock Product 
                  </button>
                </th>
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                  >
                    Category
                  </button>
                </th>
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                  >
                    Price
                  </button>
                </th>
                <th className="px-4 py-2 text-start">
                  <button
                    className="flex items-center gap-2"
                  >
                    Published
                  </button>
                </th>
                <th className="px-4 py-2 text-start">Action</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td className="border-b px-4 py-2 text-xs text-black/60">
                    product.name
                  </td>
                  <td className="border-b px-4 py-2 text-xs text-black/60">
                    product.sku
                  </td>
                  <td className="border-b px-4 py-2 text-xs text-black/60">
                    product.stock
                  </td>
                  <td className="border-b px-4 py-2 text-xs text-black/60">
                    product.category
                  </td>
                  <td className="border-b px-4 py-2 text-xs text-black/60">
                    product.price
                  </td>
                  <td className="px-5 border-b border-gray-200">
                    <button
                      className={`p-[2px] w-10 h-[22px] rounded-full  transition-all`}
                    >
                      <div
                        className={` h-[18px] w-[18px] rounded-full bg-white transition-all `}
                      ></div>
                    </button>
                  </td>

                  <td className="px-5 py-2 border-b border-gray-200 text-type-text-light">
                    <div className="flex justify-start items-center space-x-3 lg:space-x-5">
                      <button >
                        
                      </button>
                      <button >
                        
                      </button>
                      <button >
                        
                      </button>
                    </div>
                  </td>
                </tr>
             
            </tbody>
          </table>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between mt-4 py-4">
          <div className="text-sm text-type-text-light font-medium">
           1
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-type-text-light">
                Rows per page:
              </span>
              <select
                className="text-type-text-light px-1"
                
                
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="p-1 px-2 rounded-lg border"
                
              >
                <svg
                  fill="none"
                  height="17"
                  viewBox="0 0 16 17"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 11.5938L6.5 8.59375L9.5 5.59375"
                    
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <span className="text-sm text-[#171C26]">
                1/1
              </span>
              <button
                className="p-1 px-2 rounded-lg border"
                disabled={1 === 2}
                
              >
                <svg
                  fill="none"
                  height="17"
                  viewBox="0 0 16 17"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 11.5938L9.5 8.59375L6.5 5.59375"
                    stroke='#A1A9B8'
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
