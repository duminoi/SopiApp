import React, { useContext, useEffect } from "react";
import CartItem from "./CartItem";
import { AppContext } from "../../../App";

export default function CartList() {
  const { cart, setCart, setToast } = useContext(AppContext);

  // Lấy dữ liệu từ localStorage và kiểm tra trước khi parse
  const getCartItems = () => {
    const savedCart = localStorage.getItem("cart");
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart items:", error);
      return [];
    }
  };

  const cartItems = getCartItems();
  //   console.log(cart);

  const handleClick = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    setToast("Đã thanh toán ^^");
  };
  useEffect(() => {
    const cartItem = JSON.parse(localStorage.getItem("cart"));
    console.log(cartItem);
    console.log(cart);
  }, [cart, setCart]);
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs mt-4">
      <div className="w-full overflow-x-auto relative">
        {!cart.length ? (
          <div className="w-full items-center justify-center text-center text-white">
            Không có giỏ hàng nào
          </div>
        ) : (
          <>
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">Tên sản phẩm</th>
                  <th className="px-4 py-3">Số lượng</th>
                  <th className="px-4 py-3">Còn lại</th>
                  <th className="px-4 py-3">Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {cartItems.map((item, index) => {
                  return <CartItem key={index} {...item}></CartItem>;
                })}
              </tbody>
            </table>
            <button
              onClick={handleClick}
              className="bg-green-500 hover:bg-green-700 select-none text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-max relative right-0"
            >
              Thanh toán
            </button>
          </>
        )}
      </div>
    </div>
  );
}
