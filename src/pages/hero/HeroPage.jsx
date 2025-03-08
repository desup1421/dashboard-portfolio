import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Table,
} from "@components";
import { ArrowRightSmall, Eyes, Pencil } from "@icons";

import {
  useGetHeroQuery,
} from "../../store/slices/heroSlice";

const HeroPage = () => {
  const navigate = useNavigate();
  const { data, isFetching } = useGetHeroQuery();  

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
