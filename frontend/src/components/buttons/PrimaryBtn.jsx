import React from "react";

const PrimaryBtn = (props) => {
  const { action, text } = props;
  return (
    <button
      onClick={action}
      className="py-2 w-fit text-center px-6 border border-slate-600 bg-slate-800 text-white rounded-md font-normal  hover:bg-slate-600 transition-all duration-200"
    >
      {text}
    </button>
  );
};

export default PrimaryBtn;
