import React from "react";

const TodoInput = React.forwardRef((props, ref) => {
  const {
    placeholder,
    action,
    inputReference,
    className = "",
    ...attributes
  } = props;

  return (
    <div
      {...attributes}
      ref={ref}
      contentEditable={true}
      onInput={action}
      className={`w-full resize-none outline-none px-4 py-3 h-full bg-slate-700 relative text-white ${className} `}
    ></div>
  );
});

export default TodoInput;
