import React from "react"

const CardIcon = (props) => {
  const { icon } = props;
  return (
    <div
      className={`relative z-30 rounded-sm transition-all duration-200  hover:bg-slate-700 cursor-pointer`}
      {...props}
    >
      {icon}
    </div>
  );
};

export default CardIcon
