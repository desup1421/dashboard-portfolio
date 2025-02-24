import React, { useEffect, useState } from "react";
import { Card, Table } from "@components";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "@icons";
import { useGetSkillQuery } from "../../store/slices/skillSlice";

const SkillPage = () => {
  const [tableData, setTableData] = useState();
  const dataKey = ["name", "image", "level", "Actions"];
  const { data: item } = useGetSkillQuery();
  const tableHeader = ["Name", "Logo", "Level"];
  const actions = [
    {
      icon: Pencil,
      action: (data) => handleEdit(data._id),
    },
    {
      icon: Trash,
      action: (data) => handleDelete(data._id),
    },
  ];

  useEffect(() => {
    if (item) {
      setTableData(item.data);
    }
  }, [item]);

  console.log(tableData);

  return (
    <main className="bg-surfacec-background p-10 w-full">
      <Card className="w-full px-5 pt-12 overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between mb-10 items-baseline">
          <header className="space-y-2">
            <h1 className="text-2xl font-bold">Skill</h1>
            {/* BREADCRUMB */}
            <p className="flex gap-2 items-center">
              <span className="flex gap-2 items-center">
                <Link
                  to={"/dashboard"}
                  className="text-primary cursor-pointer text-xs"
                  onClick={() => navigate("/dashboard")}
                >
                  Home
                </Link>
                {/* ArrowRightSmall */}
                {">"}
                <Link to={"/dashboard/skill"} className="text-primary text-xs">
                  Skill
                </Link>
              </span>
            </p>
          </header>
          <Link
            to={"/dashboard/skill/add"}
            className="flex justify-center items-center text-[12.64px] rounded-md text-white px-2 bg-primary hover:bg-primary-dark transition-colors w-[128px] h-[32px]"
          >
            Add New Skill
          </Link>
        </div>
        {/* TABLE */}
        <div className="overflow-auto">
          <Table
            dataKey={dataKey}
            tableData={tableData}
            actions={actions}
            tableHeader={tableHeader}
          />
        </div>
      </Card>
    </main>
  );
};

export default SkillPage;
