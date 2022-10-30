import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../components/api";
export default function SignUp() {
  // const [username, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [repeatPassword, setRepeatPassword] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  // const onSignUp = async () => {
  //   if (password != repeatPassword) {
  //     setError("Password do not match!");
  //   } else {
  //     try {
  //       //localhost: 5000/auth/register
  //       const res = await axios.post(
  //         `${process.env.REACT_APP_API_URL}/auth/register`,
  //         {
  //           username,
  //           password,
  //         }
  //       );
  //       console.log("response singup", res);
  //       const userResponse = res.data.username;
  //       //alert user have successfully register
  //       alert(`User ${userResponse} have successfully signed up`);
  //       navigate("/signin");
  //     } catch (err) {
  //       console.log("err", err.message);
  //       setError(err.message);
  //     }
  //   }
  // };
  const signUpSchema = Yup.object({
    username: Yup.string().min(2, "Minimum 2 characters").required("Required"),
    password: Yup.string().min(3, "Minimum 3 characters").required("Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), "Password not match"])
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (value) => {
      const data = await registerUser(value.username, value.password);
      const userResponse = data.username;
      //alert user have successfully register
      alert(`User ${userResponse} have successfully signed up`);
      navigate("/signin");
    },
  });
  const styles = {
    signUpContainer: {
      maxWidth: "350px",
      width: "350px",
    },
    flexCol: {
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <div style={styles.signUpContainer}>
      <div style={styles.flexCol}>
        <h3 className="text-header">Sign Up</h3>
        <form method="post" onSubmit={formik.handleSubmit}>
          <div>
            <div className="username_box">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                autoComplete="on"
                placeholder="Input username"
                className="signup-input"
              />
              {formik.errors.username && formik.touched.username && (
                <p className="error-message">{formik.errors.username}</p>
              )}
            </div>
            <div className="password_box">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                autoComplete="off"
                placeholder="Input password"
                className="signup-input"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="error-message">{formik.errors.password}</p>
              )}
            </div>
            <div className="confirm_password_box">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                id="confirm_password"
                name="confirm_password"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                autoComplete="off"
                type="password"
                placeholder="Re Password"
                className="signup-input"
              />
              {formik.errors.confirm_password &&
                formik.touched.confirm_password && (
                  <p className="error-message">
                    {formik.errors.confirm_password}
                  </p>
                )}
            </div>
            <button type="submit" className="signup-submit">
              Submit
            </button>

            {/* error message */}
            {/* <div>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div> */}
            {/* <button
              className="bg-[#20DF7F] w-full rounded-[10px] h-[45px] mt-[24px]"
              onClick={onSignUp}
            >
              <p className="text-white text-[16px]">Sign Up</p>
            </button>
            <div className="mt-[8px]">
              <p className="text-center">
                <span className="font-[500] text-[14px] text-white text-center mr-[8px]">
                  Have an account?
                </span>
                <span
                  className="font-[500] text-[14px] text-[#20DF7F] text-center cursor-pointer"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Sign in
                </span>
              </p>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}
