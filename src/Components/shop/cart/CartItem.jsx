import React, { useEffect } from "react";

export default function CartItem({ name, price, quantity, order }) {
  // console.log(order.current);
  useEffect(() => {
    console.log("vào đây");
  }, [order]);
  return (
    <>
      <tr className="text-gray-700">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <p className="font-semibold">{name}</p>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{order}</td>
        <td className="px-4 py-3 text-sm">{quantity}</td>
        <td className="px-4 py-3 text-sm">{price * quantity}</td>
      </tr>
    </>
  );
}
