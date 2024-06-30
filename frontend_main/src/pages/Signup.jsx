import axios from "axios";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Login";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("customer");

  const { setLogin, setAccessToken, setUserDetails, staff, setStaff } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        { email, password, name, role }
      );

      console.log("Signup successful:", response.data);
      setAccessToken(response.data.token);
      setLogin(true);
      setUserDetails(response.data.user);
      if (response.data.user.role === "staff") setStaff(true);
      //   setUserDetails(user_data.data);

      //   console.log(user_data.data);
      //   console.log("-----------------------------------");
      //   console.log(userDetails);
      //   setLogin(true);
      // navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div
        className="w-fit m-auto p-8"
        style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
      >
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="">
            Enter your name <br />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[320px] h-10 mt-1 px-2 rounded-[5px] border-black border-[0.5px]"
            />
          </label>
          <br />
          <br />
          <label className="text-sm">
            Enter your email <br />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[320px] h-10 mt-1 px-2 rounded-[5px] border-black border-[0.5px]"
              required
            />
          </label>

          <br />
          <br />
          <label className="text-sm">
            Enter your password <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[320px] h-10 mt-1 px-2 rounded-[5px] border-black border-[0.5px]"
              required
            />
          </label>
          <br />
          <br />
          <label htmlFor="">
            Select your role
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border-[0.5px] border-black ml-3"
            >
              <option value="customer">Customer</option>
              <option value="staff">Staff</option>
            </select>
          </label>
          <br />
          <br />

          <div className="flex justify-center">
            <button
              type="submit"
              className="p-2 w-[250px] rounded-[5px] border-black border-[2px] text-black bg-prim hover:bg-text hover:text-prim hover:border-text"
            >
              Continue
            </button>
          </div>
        </form>
        <br />
        <br />
        <p className="text-center">
          Already have an account{" "}
          <NavLink to="/login" className="underline">
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
