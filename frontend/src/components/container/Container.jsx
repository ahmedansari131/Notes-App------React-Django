import React from "react";
import Sidebar from "../sidebar/Sidebar";

const Container = ({ children }) => {
  return (
    <div className="px-5 gap-10 bg-slate-900 pt-10 min-h-screen flex items-start">
      <Sidebar />
      {children}
    </div>
  );
};

export default Container;
