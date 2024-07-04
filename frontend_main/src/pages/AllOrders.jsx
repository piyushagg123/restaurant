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
      const response = await axios.get(
        "https://restaurant-backend-lsug.onrender.com/api/orders",
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

  const updateOrderStatus = async (orderId) => {
    console.log(accessToken);
    try {
      const response = await axios.put(
        `https://restaurant-backend-lsug.onrender.com/api/orders/${orderId}`,
        { status: "completed" },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      // Update the order status in the frontend
      setData((prevData) =>
        prevData.map((order) =>
          order._id === orderId ? { ...order, status: "completed" } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (!accessToken) {
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        Login as staff to view this page
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
        <>
          <div className="flex items-center">
            <div>
              <p>{ind + 1})</p>
              {item.orderItems.map((item2) => (
                <div className="flex gap-3">
                  <p>{item2.menuItem.name}</p>
                  <p>
                    <span className="font-bold">Price:</span>{" "}
                    {item2.menuItem.price}
                  </p>
                  <p>
                    {" "}
                    <span className="font-bold">Quantity:</span>{" "}
                    {item2.quantity}
                  </p>
                </div>
              ))}
              <p>
                <span className="font-bold">Status:</span> {item.status}
              </p>
              <p>
                <span className="font-bold">Table Number:</span>{" "}
                {item.tableNumber}
              </p>
              <p>
                <span className="font-bold">Total Amount:</span>{" "}
                {item.totalAmount}
              </p>
              <p>
                <span className="font-bold">
                  Time and date of this order creation:
                </span>{" "}
                {item.createdAt}
              </p>
            </div>
            <div>
              {item.status === "completed" ? (
                <button
                  disabled
                  className="border-[2px] border-gray-400 p-1 rounded-sm text-gray-400"
                >
                  Completed
                </button>
              ) : (
                <button
                  onClick={() => updateOrderStatus(item._id)}
                  className="border-[2px] border-black p-1 rounded-sm"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
          <br />
          <br />
        </>
      ))}
    </div>
  );
};

export default AllOrders;
