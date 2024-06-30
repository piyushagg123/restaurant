import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../context/Login";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const toggle = () => {
    setToggleMenu(!toggleMenu);
  };

  const { setLogin, login, setAccessToken, setUserDetails, staff, setStaff } =
    useContext(AuthContext);
  const logout = () => {
    setAccessToken("");
    setUserDetails("");
    setLogin(false);
    setStaff(false);
  };
  return (
    <div className="navBar flex justify-between p-3 fixed bg-black w-screen top-0 items-center z-[1000] text-white text-lg">
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <button onClick={toggle}>
            {toggleMenu ? <RxCross2 /> : <FaBars />}
          </button>
        </div>
        <div className="logo">
          <Link to="/">FOODIE HEAVEN</Link>
        </div>
        {/* <div>
          <Link to={"/menu"}>Menu</Link>
        </div> */}
        {staff ? (
          <>
            <div>
              <Link to={"/all-orders"}>All orders</Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to={"/order-history"}>Order History</Link>
            </div>
          </>
        )}
        <div
          className={
            toggleMenu
              ? "flex flex-col fixed top-16 right-0 left-0 bottom-0 bg-[#00000066] lg:flex-row lg:static lg:bg-none transition-all"
              : "hidden lg:flex lg:flex-row lg:static"
          }
        ></div>
      </div>

      <div className="flex gap-4 pr-5 items-center justify-center">
        {staff ? (
          ""
        ) : (
          <>
            <div>
              <Link to={"/cart"}>Cart</Link>
            </div>
          </>
        )}
        {login ? (
          <>
            <div>
              <button className="border-text border-[2px] px-[12px] py-[4px] text-text bg-prim hover:bg-text hover:text-prim hover:border-text rounded-[5px] transition-all text-[16px]">
                <button onClick={logout}>Log out</button>
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <button className="border-text border-[2px] px-[12px] py-[4px] text-text bg-prim hover:bg-text hover:text-prim hover:border-text rounded-[5px] transition-all text-[16px]">
                <NavLink to={"/login"}>Log In</NavLink>
              </button>
            </div>
          </>
        )}
        {/* <div>
          <button className="border-text border-[2px] px-[12px] text-[16px] py-[4px] rounded-[5px] transition-all text-text bg-prim hover:bg-text hover:text-prim hover:border-text">
            <NavLink to={"/signup"}>Sign</NavLink>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
