import React from "react";

const Tooltip = (props) => {
  const { tip, onHover } = props;
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 translate-y-1 bg-slate-800 text-gray-300 px-2 py-1 text-[.7rem] shadow-2xl rounded-sm opacity-0 invisible group-hover/${onHover}:opacity-100 group-hover/${onHover}:visible transition-all group-hover/${onHover}:delay-300 capitalize`}
    >
      {tip}
    </div>
  );
};

export default Tooltip;
