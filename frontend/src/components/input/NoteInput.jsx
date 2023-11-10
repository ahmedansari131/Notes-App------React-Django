import React from "react";

const TodoInput = React.forwardRef((props, ref) => {
  const {
    placeholder,
    action,
    inputReference,
    className = "",
    noteColor,
    ...attributes
  } = props;

  return (
    <div
      {...attributes}
      ref={ref}
      contentEditable={true}
      onInput={action}
      className={`w-full resize-none outline-none px-4 py-3 h-full bg-slate-700 relative text-white ${className} `}
      style={{backgroundColor: noteColor}}
    ></div>
  );
});

export default TodoInput;
