import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styled from "./style";
import { FormikContext, useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../components/api";
export default function SignIn() {
  const navigate = useNavigate();
  const signInSchema = Yup.object({
    username: Yup.string().min(2, "Minimum 2 characters").required("Required"),
    password: Yup.string().min(3, "Minimum 3 characters").required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (value) => {
      try {
        const responseSignIn = await loginUser(value.username, value.password);
        const { accessToken, refreshToken, msg } = responseSignIn;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        alert(msg);
        navigate("/");
      } catch (err) {
        throw err;
      }
    },
  });
  return (
    <Styled>
      <div className="signin-container">
        <h3 className="signin-title">Sign in</h3>
        <form method="post" onSubmit={formik.handleSubmit}>
          <div>
            <div className="username_box">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                type="text"
                placeholder="Input username"
                className="signin-input mb-[20px]"
              />
              {formik.errors.username && formik.touched.username && (
                <p className="error-message">{formik.errors.username}</p>
              )}
            </div>
            <div className="password_box">
              <input
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
                placeholder="Input password"
                className="signin-input "
              />
              {formik.errors.password && formik.touched.password && (
                <p className="error-message">{formik.errors.password}</p>
              )}
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="mt-[8px]">
              <p className="text-center">
                <span className="font-[500] text-[14px] text-white text-center mr-[8px]">
                  Don't have an account?
                </span>
                <span
                  className="font-[500] text-[14px] text-[#20DF7F] text-center cursor-pointer"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </Styled>
  );
}
