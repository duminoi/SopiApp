import React, { createContext, useEffect, useState } from "react";
import "./assets/App.css";
import Login from "./Components/Login";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AppContext = createContext();
export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [toastContent, setToast] = useState("idle");

  const getApiKey = async (email) => {
    try {
      setToast("Vui lòng chờ");
      const res = axios.get(
        `https://api-exercise-sopi.vercel.app/api/v1/api-key?email=${email}`
      );
      const data = (await res).data;
      const { apiKey } = data.data;
      if ((await res).status <= 200 && (await res).status >= 300) {
        throw new Error();
      }
      setApiKey(apiKey);
      setToast("Đăng nhập thành công!!!");
    } catch (e) {
      setApiKey(false);
      setToast("Đăng nhập thất bại!!!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = Object.fromEntries(new FormData(e.target));
    getApiKey(email);
  };

  useEffect(() => {
    if (toastContent != "idle") {
      toast(toastContent);
    }
  }, [toastContent, toast]);
  return (
    <AppContext.Provider
      value={{
        onSubmit: handleSubmit,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Login />
    </AppContext.Provider>
  );
}
