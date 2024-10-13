import React from "react";

const Error = (props) => {
  const { message, className } = props;
  return <div className={` text-[.7rem] italic font-medium capitalize ${className} `}>{message}</div>;
};

export default Error;
