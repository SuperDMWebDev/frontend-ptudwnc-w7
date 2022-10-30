import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../components/api";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const { data, isLoading, error, isError, refetch } = useQuery(
    "user",
    () => fetchUsers(accessToken),
    {
      enabled: false,
    }
  );

  //vertify token
  const verifyToken = async () => {
    if (!accessToken) {
      navigate("/signin");
    }
  };

  useEffect(() => {
    verifyToken();
    refetch();
  }, []);
  const onLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/signin");
  };
  if (isLoading) {
    return <div>Is Loading</div>;
  }
  if (isError) {
    console.log("err", error);
  }
  return (
    <div>
      <p className="text-white text-[40px]">
        Hello {data ? data.username : ""}
      </p>
      <button
        className="px-[10px] py-[8px] bg-[#20DF7F] h-[45px] w-full rounded-[10px] mt-[24px]"
        onClick={onLogout}
      >
        <p className="text-white text-[16px] text-center">Log Out</p>
      </button>
    </div>
  );
}
