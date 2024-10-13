import React from "react";

const Placeholder = (props) => {
    const {text, className=""} = props;
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 text-sm font-normal selection:bg-none pointer-events-none z-10 text-white ${className}`}
    >
      {text}
    </div>
  );
};

export default Placeholder;
