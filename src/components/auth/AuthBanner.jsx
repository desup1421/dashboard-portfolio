import React from 'react';

import { HorizontalLine, VerticalLine } from '@icons';
import { woman } from '@images';

const AuthBanner = () => {
  return (
    <div className="hidden md:flex bg-[#DB4444] rounded-[15px] relative">
      <VerticalLine className="absolute top-[50%] left-[60px]  md:translate-y-[-50%]" />
      <h2 className="max-w-[374px] font-bold text-white text-[2.5rem] leading-[3rem] left-[60px] top-[124px] absolute">
        Very good works are <br />
        waiting for you <br />
        Sign up Now
      </h2>
      <img
        alt="auth-banner"
        className=" absolute right-0 bottom-0"
        src={woman}
      />
      <HorizontalLine className="absolute bottom-[54px] left-[60px]" />
    </div>
  );
};

export default AuthBanner;