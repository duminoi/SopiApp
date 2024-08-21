import React from "react";
import ProductList from "./ProductList";
import CartList from "./cart/CartList";

export default function Container() {
  return (
    <main className=" font-style flex items-center justify-center p-8">
      <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center">
        <h1 className="font-bold text-white">Welcome to Shop!</h1>
        <ProductList />
        <CartList />
      </div>
    </main>
  );
}
