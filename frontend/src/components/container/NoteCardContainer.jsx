import React from "react";

const NoteCardContainer = ({ children, className }) => {
  return (
    <div className="relative w-fit columns-5 m-4">
      {children}
    </div>
  );
};

export default NoteCardContainer;
