import React from 'react';

import PropTypes from 'prop-types';

const TableCell = ({ objectValue, onPublish }) => {
  if (typeof objectValue === 'boolean') {
    return (
      <button
        className={`p-[2px] w-10 h-[22px] rounded-full  transition-all ${
          objectValue ? 'bg-primary' : 'bg-[#D2D2D2]'
        }`}
        onClick={onPublish}
      >
        <div
          className={` h-[18px] w-[18px] rounded-full bg-white transition-all ${
            objectValue && 'translate-x-full'
          }`}
        ></div>
      </button>
    );
  }

  if (Array.isArray(objectValue)) {
    return <>{objectValue.join(", ")}</>
  }

  if (typeof objectValue === 'string' && objectValue.startsWith('http')) {
    return <img className="h-16 w-16 object-cover" src={objectValue} />;
  }

  return <>{objectValue}</>;
};

TableCell.propTypes = {
  objectValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array
  ]).isRequired,
  onPublish: PropTypes.func,
};
export default TableCell;
