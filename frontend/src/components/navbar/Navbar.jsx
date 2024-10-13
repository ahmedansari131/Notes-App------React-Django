import React from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import Input from "../input/Input";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b-2 bg-slate-900 border-slate-800 py-3 px-10 sticky top-0 z-40">
      <div>
        <Link to="/">
          <h1 className="text-2xl uppercase font-bold text-white">Note X</h1>
        </Link>
      </div>
      {/* <div className="flex w-1/3 items-center text-gray-200 bg-slate-800 px-4 rounded-md">
        <SearchIcon />
        <Input placeholder="Search" />
      </div> */}

      <div className="flex justify-center w-1/6 items-center gap-5">
        <div className="w-full ">
          <Link to={"/register"}>
            <PrimaryBtn text="Signup" />
          </Link>
        </div>
        <div className="w-full ">
          <Link to={"/login"}>
            <SecondaryBtn text="Login" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
