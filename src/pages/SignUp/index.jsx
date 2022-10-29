import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSignUp = async () => {
    if (password != repeatPassword) {
      setError("Password do not match!");
    } else {
      try {
        //localhost: 5000/auth/register
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/register`,
          {
            username,
            password,
          }
        );
        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);

        //alert user have successfully register
        alert("You have successfully signed up");
        navigate("/signin");
      } catch (err) {
        console.log("err", err.message);
        setError(err.message);
      }
    }
  };

  return (
    <div className="z-[2] w-[350px]">
      <div className="flex flex-col">
        <p className="font-[400] text-[64px] text-white leading-[80px] mb-[39px] text-center">
          Sign Up
        </p>
        <p className="text-white text-[16px] font-[400] leading-[20px] text-center">
          Sign up and start your application
        </p>
        <div className="mt-[36px]">
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="on"
            placeholder="input Username"
            className="bg-[#224957] rounded-[10px] text-[14px] font-[400] text-white w-full py-[8px] px-[10px] outline-none"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            type="password"
            placeholder="Password"
            className="bg-[#224957] rounded-[10px] text-[14px] font-[400] text-white w-full py-[8px] px-[10px] outline-none mt-[32px]"
          />
          <input
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            autoComplete="off"
            type="password"
            placeholder="Re Password"
            className="bg-[#224957] rounded-[10px] text-[14px] font-[400] text-white w-full py-[8px] px-[10px] outline-none mt-[32px]"
          />
          {/* error message */}
          <div>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
          <button
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
          </div>
        </div>
      </div>
    </div>
  );
}
