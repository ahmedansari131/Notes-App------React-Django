import React from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import Input from "../inputField/Input";
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b-2 border-slate-800 py-3 px-10">
      <div>
        <h1 className="text-2xl uppercase font-bold text-white">Plain Paper</h1>
      </div>
      <div className="flex w-1/3 items-center text-gray-200 bg-slate-800 px-4 rounded-md">
        <SearchIcon />
        <Input placeholder="Search" />
      </div>

      <div className="flex justify-center w-1/6 items-center gap-5">
        <div className="w-full ">
          <PrimaryBtn text="Signup" />
        </div>
        <div className="w-full ">
          <SecondaryBtn text="Login" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
