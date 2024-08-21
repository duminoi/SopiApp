import React, { useContext, useEffect } from "react";
import ListItem from "./ListItem";
import axios from "axios";
import config from "../../config";
import { AppContext } from "../../App";

export default function ProductList() {
  const { productList, setProductList } = useContext(AppContext);
  const getProduct = async () => {
    try {
      const res = axios.get(`${config.apiUrl}/products?limit=8`);
      const { listProduct } = (await res).data.data;
      //   console.log(listProduct);

      setProductList(listProduct);
    } catch (e) {
      console.log(e);
      setProductList(false);
    }
  };

  useEffect(() => {
    getProduct();
    console.log(productList);
  }, []);
  return (
    <div className="product-list grid grid-cols-4 gap-4">
      {productList.map((item, index) => {
        return <ListItem key={index} {...item}></ListItem>;
      })}
    </div>
  );
}
