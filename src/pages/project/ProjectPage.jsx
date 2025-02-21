import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
  Card,
  Table,
  ModalConfirm,
  ModalSuccess,
  ModalLoading,
} from "@components";
import { Pencil, Trash } from "@icons";

// SWEETALERT
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

import {
  useGetProjectsQuery,
  usePublishProjectMutation,
  useDeleteProjectMutation,
} from "../../store/slices/projectSlice";

const ProjectPage = () => {
  const navigate = useNavigate();
  // RTK QUERY
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: projects, isFetching } = useGetProjectsQuery({
    limit: rowsPerPage,
    page: currentPage,
  });
  const [publishProject] = usePublishProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  // PROPS TABLE HEADER & DATA
  const tableHeader = ["Name", "Description", "Tags", "Published", "Action"];
  const dataKey = ["title", "description", "tags", "published"];
  const [tableData, setTableData] = useState([]);

  // PUBLISH HANDLING
  const handleTogglePublish = async (id) => {
    try {
      // Call modal loading and auto close confirm modal
      MySwal.fire({
        html: <ModalLoading />,
        allowOutsideClick: false,
        showConfirmButton: false,
        customClass: {
          popup:
            "rounded-3xl w-auto md:w-[720px] h-[200px] flex justify-center items-center",
        },
      });
      // Make a request and wait response
      await publishProject(id);
      // Call modal success after receive response and auto close loading modal
      MySwal.fire({
        html: (
          <ModalSuccess message="This project was successfully unpublished" />
        ),
        customClass: {
          popup: "rounded-3xl w-auto md:w-[720px]",
        },
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const handleTogglePublishModal = (data) => {
    MySwal.fire({
      html: (
        <ModalConfirm
          action={() => handleTogglePublish(data.id)}
          desc={`Are you sure want to ${
            data.published ? "unpublish" : "publish"
          } this project?`}
        />
      ),
      customClass: {
        popup: "rounded-3xl py-10",
      },
      showConfirmButton: false,
    });
  };

  // DELETE HANDLING
  const handleDelete = async (id) => {
    await deleteProject(id);
    MySwal.fire({
      html: <ModalSuccess message="This project was successfully deleted" />,
      customClass: {
        popup: "rounded-3xl w-auto md:w-[720px]",
      },
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleToggleDeleteModal = (data) => {
    MySwal.fire({
      html: (
        <ModalConfirm
          action={() => handleDelete(data.id)}
          desc="Are you sure want to delete this project?"
          publish={false}
          title="Delete Project?"
        />
      ),
      customClass: {
        popup: "rounded-3xl py-10",
      },
      showConfirmButton: false,
    });
  };

  // TABLE ACTIONS
  const actions = [
    {
      icon: Pencil,
      action: (data) => console.log(data),
    },
    {
      icon: Trash,
      action: (data) => handleToggleDeleteModal(data),
    },
  ];

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
            Add New Project
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-auto">
          <Table
            actions={actions}
            dataKey={dataKey}
            fetching={isFetching}
            publish={handleTogglePublishModal}
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
