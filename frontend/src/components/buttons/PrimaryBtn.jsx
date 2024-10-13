import React from "react";

const PrimaryBtn = (props) => {
  const { action, text, className = "" } = props;
  return (
    <button
      onClick={action}
      className={`py-2 w-fit text-center px-6 border border-green-700 bg-green-900 text-white rounded-md font-normal  hover:bg-green-800 transition-all duration-200 ${className} `}
    >
      {text}
    </button>
  );
};

export default PrimaryBtn;
