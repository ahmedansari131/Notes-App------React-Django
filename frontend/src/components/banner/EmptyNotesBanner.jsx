import React from "react";

const EmptyNotesBanner = (props) => {
  const { placeholderText, placeholderIcon } = props;
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col gap-2">
      {placeholderIcon}
      <h3 className=" text-2xl text-slate-500 font-normal font-sans">
        {placeholderText}
      </h3>
    </div>
  );
};

export default EmptyNotesBanner;
