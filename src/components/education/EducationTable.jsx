import React from "react";

const EducationTable = () => {
  const educationData = [
    {
      _id: "67ac3a47a0c73b433ad36f4f",
      userId: "67ac18b232f83063b934b9f5",
      degree: "Angular ReactJS",
      institution: "EnigmaCamp Achademy",
      courses: "AngularJS",
      startDate: "2025-02-01", // Format YYYY-MM-DD
      endDate: "2025-12-31",
      __v: 0,
    },
    {
      _id: "67ac611f6c3c2eed86957e2b",
      degree: "Frontend ReactJS",
      institution: "Lumoshive Achademy",
      courses: "ReactJS",
      startDate: "2025-02-01",
      endDate: "2025-12-31",
      __v: 0,
    },
    {
      _id: "67addbbe773b94e9c37258ae",
      degree: "Angular ReactJS",
      institution: "EnigmaCamp Achademy",
      courses: "AngularJS",
      startDate: "2025-02-01",
      endDate: "2025-12-31",
      __v: 0,
    },
  ];

  console.log(educationData);

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Degree</th>
            <th className="text-left p-4">Instituion</th>
            <th className="text-left p-4">Courses</th>
            <th className="text-left p-4">Start Date</th>
            <th className="text-left p-4">End Date</th>
            <th className="text-left p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {educationData.map((item) => {
            return (
              <tr className="border-b border-gray-400" key={item._id}>
                <td className="p-4 text-gray-500">{item.degree}</td>
                <td className="p-4 text-gray-500">{item.institution}</td>
                <td className="p-4 text-gray-500">{item.courses}</td>
                <td className="p-4 text-gray-500">{item.startDate}</td>
                <td className="p-4 text-gray-500">{item.endDate}</td>
                <td>
                    <div className="flex gap-3 lg:gap-5 item-center">
                        
                    </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EducationTable;
