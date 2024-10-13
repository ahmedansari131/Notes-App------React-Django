import React from "react";

const TertiaryBtn = (props) => {
  const { text, action, className = "", textColor, hoverColor } = props;
  const color = {
    textColor: "text-slate-300",
    hoverColor: "hover:bg-slate-600",
  };
  return (
    <button
      onClick={action}
      className={`font-medium px-6 py-2 w-fit rounded-md ${
        textColor ? textColor : color.textColor
      } ${
        hoverColor ? hoverColor : color.hoverColor
      } hover:bg-opacity-50 transition-all duration-200 text-right ${className}`}
    >
      {text}
    </button>
  );
};

export default TertiaryBtn;
