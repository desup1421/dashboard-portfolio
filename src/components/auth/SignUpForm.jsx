import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { HidePassword } from '@icons';

const SignUpForm = ({ formData, onInputChangeHandler, onSubmitHandler }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div>
      <h1 className="font-bold text-[1.625rem]">Sign up</h1>
      <p className="text-xs text-type-text-light mt-[5px]">
        Start your 30-day free trial.
      </p>
      <form className="mt-5 w-full md:w-[330px]" onSubmit={onSubmitHandler}>
        {/* Fullname Input */}
        <input
          className="w-full mt-5 border-[1px] border-surface-border bg-surface-background px-[15px] py-[14px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
          name="fullname"
          placeholder="Full Name"
          type="fullname"
          value={formData?.fullname}
          onChange={onInputChangeHandler}
        />

        {/* Email Input */}
        <input
          className="w-full mt-5 border-[1px] border-surface-border bg-surface-background px-[15px] py-[14px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
          name="email"
          placeholder="Email Address"
          type="email"
          value={formData?.email}
          onChange={onInputChangeHandler}
        />

        {/* Password Input */}
        <div className="mt-5 relative">
          <HidePassword
            className="absolute right-[15px] top-[20px] cursor-pointer"
            onClick={togglePasswordVisibility}
          />
          <input
            className="w-full border-[1px] border-surface-border bg-surface-background px-[15px] py-[14px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
            name="password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData?.password}
            onChange={onInputChangeHandler}
          />
        </div>

        {/* Login Button */}
        <button
          className="w-full mt-5 pt-3 text-white pb-[15px] bg-[#DB4444] hover:bg-[#AF3636] rounded-lg text-surface-neutral text-base font-medium"
          type="submit"
        >
          Get Started
        </button>
      </form>

      {/* Sign Up Navigation */}
      <div className="mt-[15px] flex gap-4 text-xs">
        <p className="text-type-text-light">Already a member?</p>
        <Link className="block text-[#DB4444] hover:text-[#AF3636]" to="/">
          Sign in
        </Link>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  formData: PropTypes.shape({
    fullname: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  onSubmitHandler: PropTypes.func,
  onInputChangeHandler: PropTypes.func,
};

export default SignUpForm;