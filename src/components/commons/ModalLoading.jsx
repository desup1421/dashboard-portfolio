import React from "react";

const ModalLoading = () => {
  return (
    <>
      <div
        className={`inline-block animate-spin rounded-full border-4 border-solid border-gray-400 border-r-transparent w-12 h-12`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p>Processing...</p>
    </>
  );
};

export default ModalLoading;
