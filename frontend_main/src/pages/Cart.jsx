// src/pages/Cart.js
import React, { useContext, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/Login";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [tableNumber, setTableNumber] = useState(""); // State to hold table number input
  const { accessToken } = useContext(AuthContext);
  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    } else {
      removeFromCart(id);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0
  );

  const [error, setError] = useState(false);
  const placeOrder = async () => {
    if (!accessToken) {
      setError(true);
    }

    setLoading(true);

    const orderData = {
      tableNumber: parseInt(tableNumber), // Convert table number to integer
      orderItems: cart.map((item) => ({
        menuItem: item.menuItem._id,
        quantity: item.quantity,
      })),
      totalAmount: totalPrice,
    };

    console.log(orderData);
    try {
      const response = await axios.post(
        "https://restaurant-backend-lsug.onrender.com/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Order placed successfully:", response.data.message);
      clearCart(); // Clear cart after successful order placement
      setLoading(false);
    } catch (error) {
      console.error("Error placing order:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Your Cart</h1>
      <div>
        <label htmlFor="tableNumber">Table Number:</label>
        <input
          type="number"
          id="tableNumber"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className=" ml-2 w-[40px] pl-4 h-10 mt-1 px-2 rounded-[5px] border-black border-[0.5px] text-center"
        />
      </div>
      <ul>
        {cart.map((item) => (
          <li key={item.menuItem._id}>
            <div>
              <p>
                <span className="font-bold">Item name:</span>{" "}
                {item.menuItem.name}
              </p>
              <p>
                <span className="font-bold">Item price:</span>{" "}
                {item.menuItem.price}
              </p>
              <label htmlFor="">
                Select the quantity:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.menuItem._id,
                      parseInt(e.target.value)
                    )
                  }
                  className=" ml-2 w-[40px] pl-4 h-10 mt-1 px-2 rounded-[5px] border-black border-[0.5px] text-center"
                />
              </label>
              <button onClick={() => removeFromCart(item.menuItem._id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total Price: Rs {totalPrice.toFixed(2)}</h2>
      <button onClick={placeOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>

      {error ? (
        <>
          <p>Login first to place your order</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
