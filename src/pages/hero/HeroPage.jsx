import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Table,
  ModalConfirm,
  ModalSuccess,
  ModalLoading,
} from "@components";
import { ArrowRightSmall, Eyes, Pencil, Trash } from "@icons";

import {
  useGetHeroQuery,
  useDeleteHeroMutation,
} from "../../store/slices/heroSlice";

// SWEETALERT
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const HeroPage = () => {
  const navigate = useNavigate();
  const { data, isFetching } = useGetHeroQuery();
  const [deleteHero] = useDeleteHeroMutation();

  // DELETE HANDLING
  const handleDelete = async (id) => {
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
    await deleteHero(id);
    // Call modal success after receive response and auto close loading modal
    MySwal.fire({
      html: <ModalSuccess message="This hero was successfully deleted" />,
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
          desc="Are you sure want to delete this hero?"
          publish={false}
          title="Delete Hero?"
        />
      ),
      customClass: {
        popup: "rounded-3xl py-10",
      },
      showConfirmButton: false,
    });
  };

  // TABLE PROPS
  const actions = [
    {
      icon: Eyes,
      action: (data) => navigate(`/dashboard/hero/detail/${data._id}`),
    },
    {
      icon: Pencil,
      action: (data) => navigate(`/dashboard/hero/edit/${data._id}`),
    },
    {
      icon: Trash,
      action: (data) => handleToggleDeleteModal(data),
    },
  ];
  const dataKey = ["image", "text"];
  const tableHeader = ["Image", "About me", "Actions"];
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if(data) {
      setTableData(data.data);
    }
  }, [data]);

  return (
    <main className="bg-surface-background p-10 w-full">
      <Card className="w-full px-5 pt-12 overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between mb-10 items-baseline">
          <header className="space-y-2">
            <h1 className="text-[25.63px] font-bold">Hero</h1>
            {/* BREADCRUMB */}
            <p className="flex gap-2 items-center">
              <span
                className="text-primary cursor-pointer text-xs"
                onClick={() => navigate("/dashboard")}
              >
                Home
              </span>
              <ArrowRightSmall />
              <span className="text-primary text-xs">Hero</span>
            </p>
          </header>
          <button
            className="flex justify-center items-center text-[12.64px] rounded-md text-white px-2 bg-primary hover:bg-primary-dark transition-colors w-[128px] h-[32px] cursor-pointer"
            onClick={() => navigate("/dashboard/hero/add")}
          >
            Add New Hero
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-auto">
          <Table
            actions={actions}
            dataKey={dataKey}
            fetching={isFetching}
            tableData={tableData}
            tableHeader={tableHeader}
          />
        </div>
      </Card>
    </main>
  );
};

export default HeroPage;
