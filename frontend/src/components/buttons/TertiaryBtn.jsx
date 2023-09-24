import React from "react";

const TertiaryBtn = (props) => {
  const { text, action } = props;
  return (
    <button onClick={action} className="text-slate-950 font-medium px-6 py-2 w-fit rounded-md hover:bg-slate-300 transition-all duration-200 text-right">
      {text}
    </button>
  );
};

export default TertiaryBtn;
