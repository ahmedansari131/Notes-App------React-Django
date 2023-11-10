import React from "react"

const CardIcon = (props) => {
  const { icon } = props;
  return (
    <div
      className={`relative z-30 rounded-sm transition-all duration-200  hover:bg-slate-600 hover:bg-opacity-50 cursor-pointer p-1`}
      {...props}
    >
      {icon}
    </div>
  );
};

export default CardIcon
