import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";

export default function ListItem({ _id: id, name, image, price }) {
  //   let orderRef = useRef(1);
  const { cart, setCart, productList, setToast } = useContext(AppContext);

  const handleClick = (e) => {
    const idList = e.target.dataset.id;
    const item = productList.find((item) => {
      return item._id == idList;
    });
    const itemIndex = cart.findIndex(({ _id }) => {
      return _id === idList;
    });
    console.log(itemIndex);
    if (itemIndex > -1) {
      cart[itemIndex].order += 1;
      setCart([...cart]);
    } else {
      item.order = 1;
      setCart([...cart, item]);
    }
    setToast("Thêm vào giỏ hàng thành công ^^");
  };

  useEffect(() => {
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="box p-4 shadow-lg bg-white rounded-lg relative">
      <img
        src={image}
        alt="Giày dép Habeco"
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <h2 className="text-xl font-normal mt-2">{name}</h2>
      <div className="flex justify-between items-center">
        <span className="text-orange-500 font-bold">${price}</span>
        <button
          onClick={handleClick}
          data-id={id}
          className="bg-green-500 hover:bg-green-700 select-none text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
        >
          Add to cart!
        </button>
      </div>
    </div>
  );
}
