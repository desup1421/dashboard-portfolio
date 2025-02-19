import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Card, Table } from "@components";
import { Pencil, Trash } from "@icons";

import { useGetProjectsQuery } from "../../store/slices/projectSlice";

const ProjectPage = () => {
  const navigate = useNavigate();
  // RTK QUERY
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const { data: projects, isLoading } = useGetProjectsQuery({
    limit: rowsPerPage,
    page: currentPage,
  });

  if (!isLoading) {
    console.log(projects);
  }
  // PROPS TABLE HEADER & DATA
  const tableHeader = ["Name", "Description", "Tags", "Published", "Action"];
  const dataKey = ["title", "description", "tags", "published"];
  const [tableData, setTableData] = useState([]);

  // TABLE ACTIONS
  const actions = [
    {
      icon: Pencil,
      action: (data) => console.log(data),
    },
    {
      icon: Trash,
      action: (data) => console.log(data),
    },
  ];
  const handleTogglePulish = (data) => {
    // Pending: Process backend
    const newData = tableData.map((item) => {
      if (item.id === data.id) {
        return { ...item, published: !item.published };
      }
      return item;
    });
    setTableData(newData);
  };

  // PAGINATION
  const totalProjects = projects?.data?.total || 1;
  const totalPages = projects?.data?.totalPages || 1;
  const handleRowChange = (event) => {
    setRowsPerPage(Number(event.target.value));
  };

  // Update project data display
  useEffect(() => {
    if (projects) {
      setTableData(projects.data.projects);
    }
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [projects, currentPage, totalPages]);


  return (
    <main className="bg-surface-background p-10">
      <Card className="w-full px-5 pt-12 overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between mb-10 items-baseline">
          <header className="space-y-2">
            <h1 className="text-[25.63px] font-bold">Projects</h1>
            {/* BREADCRUMB */}
            <p className="flex gap-2 items-center">
              <span
                className="text-primary cursor-pointer text-xs"
                onClick={() => navigate("/dashboard")}
              >
                Home
              </span>
              {/* <ArrowRightSmall /> */}
              <span className="text-primary text-xs">Projects</span>
            </p>
          </header>
          <button
            className="flex justify-center items-center text-[12.64px] rounded-md text-white px-2 bg-primary hover:bg-primary-dark transition-colors w-[128px] h-[32px]"
            // onClick={handleOpenAddCategory}
          >
            Add New Category
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-auto">
          <Table
            actions={actions}
            dataKey={dataKey}
            publish={handleTogglePulish}
            // sort={sort}
            tableData={tableData}
            tableHeader={tableHeader}
          />
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col items-center md:flex-row md:justify-between text-black/50 font-bold mt-5 text-sm px-5">
          {/* Text: 1 - 10 of 20 */}
          <p className="text-sm text-type-text-light font-medium">
            {`${totalPages > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}-${
              currentPage * rowsPerPage < totalProjects
                ? currentPage * rowsPerPage
                : totalProjects
            } of ${totalProjects}`}
          </p>
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="rows">Rows per page:</label>
              <select
                id="rows"
                name="rows"
                value={rowsPerPage}
                onChange={handleRowChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="p-1 px-2 rounded-lg border"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
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
                    stroke={currentPage === 1 ? "#A1A9B8" : "#464F60"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <p className="font-medium text-sm">
                <span className="text-[#171C26]">{currentPage}</span>/
                <span className="text-[#687182]">{totalPages}</span>
              </p>
              <button
                className="p-1 px-2 rounded-lg border"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
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
                    stroke={currentPage === totalPages ? "#A1A9B8" : "#464F60"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default ProjectPage;
