import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Login";
import axios from "axios";

const OrderHistory = () => {
  const { accessToken, login } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://restaurant-backend-lsug.onrender.com/api/orders/history",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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

  if (!login) {
    return (
      <>
        <div>
          <br />
          <br />
          <br />
          <br />
          <p>Login as a customer first to access your history</p>
        </div>
      </>
    );
  }

  if (!accessToken) {
    return (
      <>
        <div>
          <br />
          <br />
          <br />
          <br />
          <p>Login as a customer first to access your history</p>
        </div>
      </>
    );
  }

  if (loading)
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        Loading Data
      </>
    );
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      Your Order History
      <br />
      <br />
      {data.map((item, ind) => (
        <div>
          <p>{ind + 1})</p>
          {item.orderItems.map((item2) => (
            <div className="flex gap-3">
              <p>{item2.menuItem.name}</p>
              <p>
                <span className="font-bold">Price:</span> {item2.menuItem.price}
              </p>
              <p>
                <span className="font-bold">Quantity:</span> {item2.quantity}
              </p>
            </div>
          ))}
          <p>
            <span className="font-bold">Status:</span> {item.status}
          </p>
          <p>
            <span className="font-bold">Table Number:</span> {item.tableNumber}
          </p>
          <p>
            <span className="font-bold">Total Amount:</span> {item.totalAmount}
          </p>
          <p>
            <span className="font-bold">
              Time and date of this order creation:
            </span>{" "}
            {item.createdAt}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
