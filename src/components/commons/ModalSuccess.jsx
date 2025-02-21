import React from 'react';

import PropTypes from 'prop-types';

import { ModalCheck } from '@icons';

const ModalSuccess = ({ message }) => {
  return (
    <div className="flex flex-col items-center space-y-5">
      <ModalCheck className="w-[100px] h-[100px]" />
      <p className="font-bold text-[28px] text-[#363535]">{message}</p>
    </div>
  );
};

ModalSuccess.propTypes = {
  message: PropTypes.string,
};

export default ModalSuccess;