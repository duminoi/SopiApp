import React, { createContext, useEffect, useRef, useState } from "react";
import "./assets/App.css";
import Login from "./Components/Login";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./Components/shop/Container";
import config from "./config";

export const AppContext = createContext();

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [toastContent, setToast] = useState("idle");
  const [productList, setProductList] = useState([]);
  let orderRef = useRef(1);
  const [cart, setCart] = useState(() => {
    // Lấy dữ liệu từ localStorage và kiểm tra trước khi parse
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const loginToken = localStorage.getItem("loginToken");
  const getApiKey = async (email) => {
    try {
      setToast("Vui lòng chờ");
      const res = axios.get(`${config.apiUrl}/api-key?email=${email}`);
      const data = (await res).data;
      const { apiKey } = data.data;
      if ((await res).status <= 200 && (await res).status >= 300) {
        throw new Error();
      }
      setApiKey(apiKey);
      localStorage.setItem("loginToken", apiKey);
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
      setToast("idle");
    }
    // console.log("vào đây");
  }, [toastContent, setToast, toast]);

  return (
    <AppContext.Provider
      value={{
        apiKey: apiKey,
        productList: productList,
        cart: cart,
        toastContent: toastContent,
        orderRef: orderRef,
        setToast: setToast,
        onSubmit: handleSubmit,
        setProductList: setProductList,
        setCart: setCart,
      }}
    >
      <ToastContainer />
      {loginToken ? <Container /> : <Login />}
    </AppContext.Provider>
  );
}
