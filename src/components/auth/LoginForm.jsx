import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LoginForm = ({ formData, onInputChangeHandler, onSubmitHandler }) => {
  return (
    <div>
      <h1 className="font-bold text-[1.625rem]">Login</h1>
      <p className="text-sm text-type-text-light mt-[5px]">
        How do i get started lorem ipsum dolor at?
      </p>
      <form className="mt-5 w-full md:w-[330px]" onSubmit={onSubmitHandler}>
        {/* Email Input */}
        <div>
          <label className="text-sm" htmlFor="email text-type">
            Email
          </label>
          <input
            className="w-full mt-3 border-[1px] border-surface-border bg-surface-background px-[15px] py-[14px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={formData?.email}
            onChange={onInputChangeHandler}
          />
        </div>

        {/* Password Input */}
        <div className="mt-5">
          <label className="text-sm" htmlFor="email text-type">
            Password
          </label>
          <input
            className="w-full mt-3 border-[1px] border-surface-border bg-surface-background px-[15px] py-[14px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
            name="password"
            placeholder=". . . . . . . . . . . . ."
            type="password"
            value={formData?.password}
            onChange={onInputChangeHandler}
          />
        </div>

        {/* Forgot Password Navigation */}
        <Link
          className="block mt-5 text-right text-[#DB4444] hover:text-[#AF3636]"
          to="/forgot-password"
        >
          Forgot password
        </Link>

        {/* Login Button */}
        <button
          className="w-full text-white mt-5 pt-3 pb-[15px] bg-[#DB4444] hover:bg-[#AF3636] rounded-lg text-surface-neutral text-base font-medium"
          type="submit"
        >
          Sign In
        </button>
      </form>

      {/* Sign Up Navigation */}
      <div className="mt-[25px] flex justify-center gap-4">
        <p className="text-type-text-light">Dont’t have an account.</p>
        <Link
          className="block text-[#DB4444] hover:text-[#AF3636]"
          to="/sign-up"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  onSubmitHandler: PropTypes.func,
  onInputChangeHandler: PropTypes.func,
};

export default LoginForm;