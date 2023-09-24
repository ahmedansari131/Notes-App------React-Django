import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoInputFocus,
  setTodoDescInputActive,
  setTodoTitleInputActive,
} from "../../slices/todoInputSlice";
import { setTodoData } from "../../slices/todoSlice";

const TodoInput = (props) => {
  const { placeholder, action, inputReference } = props;
  const inputRef = useRef();
  const dispatch = useDispatch();
  const setTodoDescInputActive = useSelector(
    (state) => state.todoInput.todoDescInput
  );
  const setTodoTitleInputActive = useSelector(
    (state) => state.todoInput.todoTitleInput
  );

  return (
    <div className="flex flex-col w-full items-start gap-4 relative">
      {/* {(!setTodoDescInputActive || !setTodoTitleInputActive) ? ( */}
        <div className="absolute top-1/2 -translate-y-1/2 text-sm pl-4 font-medium selection:bg-none pointer-events-none">
          {placeholder}
        </div>
    {/* //   ) : ""} */}
      <div
        ref={inputReference}
        contentEditable={true}
        onInput={action}
        className="w-full rounded-md resize-none outline-none px-4 py-3 h-full bg-slate-200"
        onClick={() => dispatch(setTodoInputFocus(true))}
      ></div>
    </div>
  );
};

export default TodoInput;
