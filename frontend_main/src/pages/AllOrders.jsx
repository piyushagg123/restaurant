import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Login";
import axios from "axios";

const AllOrders = () => {
  const [data, setData] = useState([]);
  const { setLogin, login, accessToken, setUserDetails, staff } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/orders", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading)
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        Loading data
      </>
    );
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      All orders:
      {data.map((item, ind) => (
        <div>
          <p>{ind + 1})</p>
          {item.orderItems.map((item2) => (
            <div className="flex gap-3">
              <p>{item2.menuItem.name}</p>
              <p>Price: {item2.menuItem.price}</p>
              <p> Quantity:{item2.quantity}</p>
            </div>
          ))}
          <p>Status:{item.status}</p>
          <p>Table Number:{item.tableNumber}</p>
          <p>Total Amount: {item.totalAmount}</p>
          <p>Time and date of this order creation: {item.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
