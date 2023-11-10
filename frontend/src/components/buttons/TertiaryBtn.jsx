import React from "react";

const TertiaryBtn = (props) => {
  const { text, action, className="" } = props;
  return (
    <button onClick={action} className={`font-medium px-6 py-2 w-fit rounded-md text-white hover:bg-slate-600 hover:bg-opacity-50 transition-all duration-200 text-right ${className}`}>
      {text}
    </button>
  );
};

export default TertiaryBtn;
