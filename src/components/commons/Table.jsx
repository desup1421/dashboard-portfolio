import React from "react";

import PropTypes from "prop-types";

import { TableCell } from "@components";
import { ArrowSorting } from "@icons";

const Table = ({
  tableHeader = [],
  tableData = [],
  dataKey = [],
  actions = [],
  publish,
  sort = [],
  // loading = false,
  fetching = false,
}) => {
  return (
    <table className="w-full">
      <thead className="text-sm">
        <tr className="text-nowrap">
          {tableHeader.map((item, index) => (
            <th key={index} className="text-start px-4 py-6">
              <div className="flex items-center gap-1">
                <button
                  className={`flex items-center gap-2 ${
                    !sort[index] && "cursor-default"
                  }`}
                  onClick={() => sort[index]()}
                >
                  {item}
                  {sort[index] && <ArrowSorting />}
                </button>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fetching ? (
          <tr>
            <td className="w-full">
              <div className="w-full">loading</div>
            </td>
          </tr>
        ) : (
          tableData.map((item, index) => (
            <tr key={index}>
              {dataKey.map((itemKey, subIndex) => (
                <td
                  key={subIndex}
                  className="border-b px-4 py-2 text-xs text-black/60"
                >
                  <TableCell
                    objectValue={item[itemKey]}
                    onPublish={() => publish(item)}
                    fetching={fetching}
                  />
                </td>
              ))}
              <td className="py-2 px-4 border-b">
                <div className="flex gap-3 lg:gap-5 items-center text-black/50">
                  {actions.map((action, index) => (
                    <action.icon
                      key={index}
                      className="cursor-pointer"
                      onClick={() => action.action(item)}
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  dataKey: PropTypes.array.isRequired,
  actions: PropTypes.array,
  publish: PropTypes.func,
  sort: PropTypes.array,
  // loading: PropTypes.bool,
  fetching: PropTypes.bool,
};

export default Table;
