import React from "react";

const NoteCardContainer = ({ children }) => {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-10 pt-3">{children}</div>;
};

export default NoteCardContainer;
