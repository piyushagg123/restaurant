// src/pages/Menu.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const getMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/menu");
      setMenuItems(response.data);

      // Extract unique categories from menu items
      const uniqueCategories = [
        ...new Set(response.data.map((item) => item.type)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Menu</h1>
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <div key={category} className="flex items-center justify-center">
            <h2>{category}</h2>
            <div className="flex flex-wrap m-auto max-w-[90%] items-center justify-center gap-4">
              {menuItems
                .filter((item) => item.type === category)
                .map((item) => (
                  <div
                    key={item._id}
                    className="max-w-[230px] flex justify-center items-center flex-col border-[0.5px] border-black p-2"
                  >
                    <img src={item.imageUrl} alt={item.name} />
                    <p className="font-bold">{item.name}</p>
                    <p className="text-center">{item.description}</p>
                    <p>{item.price}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
