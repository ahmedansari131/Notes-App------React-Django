import React from "react";

const Tooltip = (props) => {
  const { tip, onHover } = props;
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 translate-y-1 bg-slate-800 text-gray-300 px-2 py-1 text-[.7rem] shadow-2xl rounded-sm opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all group-hover/item:delay-300`}
    >
      {[...tip].map((letter, index) =>
        index !== 0 ? letter.toLowerCase() : letter.toUpperCase()
      )}
    </div>
  );
};

export default Tooltip;
