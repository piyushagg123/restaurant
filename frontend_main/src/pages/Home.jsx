// src/pages/Home.js
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext, useCart } from "../context/CartContext";

const Home = () => {
  const [data, setData] = useState([]);
  const { addToCart } = useContext(CartContext);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/menu");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1 className="">Welcome to FOODIE HEAVEN</h1>
      <h1>Select your order</h1>
      <br />
      <br />
      <div className="flex flex-wrap m-auto max-w-[90%] items-center justify-center gap-4">
        {data.map((item, ind) => (
          <div
            key={ind}
            className="max-w-[230px] flex justify-center items-center flex-col border-[0.5px] border-black p-2"
          >
            <img src={item.imageUrl} alt={item.name} />
            <p className="font-bold">{item.name}</p>
            <p className="text-center">{item.description}</p>
            <p>{item.type}</p>
            <p>{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="border-[1px] border-black rounded-sm p-1"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
