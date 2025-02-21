import React, { useEffect, useState } from "react";
import { Card, Table } from "@components";
import { Pencil, Trash } from "@icons";
import { useDeleteEducationMutation, useGetEducationQuery, useUpdateEducationMutation } from "../../store/slices/educationSlice";
import { Link, useNavigate } from "react-router-dom";

const EducationPage = () => {
  const [tableData, setTableData] = useState([])
  const navigate = useNavigate()
  const {data: item, isLoading, refetch} = useGetEducationQuery()
  const [deleteEducation] = useDeleteEducationMutation()

  
  useEffect(()=> {
    if(item) {
      setTableData(item.data)
    }
  }, [item])

  const handleEdit = (id) => {
    navigate(`/dashboard/education/edit/${id}`)
  }

  const handleDelete = async (id) => {
    try {
      await deleteEducation(id);
      refetch()
    } catch (error) {
      console.error("Failed to delete : ", error)
    }
  }



  const actions = [
    {
      icon: Pencil,
      action: (data) =>  handleEdit(data._id),
    },
    {
      icon: Trash,
      action: (data) => handleDelete(data._id),
    },
  ];

  const dataKey = ["degree", "institution", "courses", "startDate", "endDate"];

  const tableHeader = [
    "Degree",
    "Institution",
    "Courses",
    "Start-Date",
    "End-Date",
    "Actions"
  ];

  return (
    <>
      <main className="bg-surface-background p-10">
        <Card className="w-full px-5 pt-12 overflow-hidden">
          {/* HEADER */}
          <div className="flex justify-between mb-10 items-baseline">
            <header className="space-y-2">
              <h1 className="text-2xl font-bold">Education</h1>
              {/* BREADCRUMB */}
              <p className="flex gap-2 items-center">
                <span className="flex gap-2 items-center">
                  <span
                    className="text-primary cursor-pointer text-xs"
                    onClick={() => navigate("/dashboard")}
                  ></span>
                  Home
                </span>
                {/* ArrowRightSmall */}
                <span className="text-primary text-xs">Education</span>
              </p>
            </header>
            <Link to={'/dashboard/education/add'} className="flex justify-center items-center text-[12.64px] rounded-md text-white px-2 bg-primary hover:bg-primary-dark transition-colors w-[128px] h-[32px]">
              Add New Education
            </Link>
          </div>
            {/* TABLE */}
            <div className="overflow-auto">
              <Table
                actions={actions}
                dataKey={dataKey}
                tableData={tableData}
                tableHeader={tableHeader}
              />
            </div>
        </Card>
      </main>
    </>
  );
};

export default EducationPage;
