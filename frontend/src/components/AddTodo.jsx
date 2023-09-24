import {
  useCreateTodoMutation,
  useGetTodoListQuery,
  useUpdateTodoMutation,
} from "../services/crudApi";
import { useDispatch, useSelector } from "react-redux";
import TodoInput from "./inputField/TodoInput";
import TertiaryBtn from "./buttons/TertiaryBtn";
import {
  setTodoInputFocus,
  setTodoTitleInputActive,
  setTodoDescInputActive,
} from "../slices/todoInputSlice";
import { useRef } from "react";
import { setTodoData } from "../slices/todoSlice";
import PrimaryBtn from "./buttons/PrimaryBtn";

const AddTodo = (props) => {
  const {
    inputTitle,
    setInputTitle,
    inputDesc,
    setInputDesc,
    isUpdating,
    setIsUpdating,
  } = props;

  const [createTodo] = useCreateTodoMutation();
  const { refetch } = useGetTodoListQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.todo.todoId);
  const isTodoInputFocus = useSelector(
    (state) => state.todoInput.todoInputFocus
  );
  const setTodoTitleInput = useSelector(
    (state) => state.todoInput.todoTitleInput
  );
  const setTodoDescInput = useSelector(
    (state) => state.todoInput.todoDescInput
  );
  const inputDescRef = useRef();
  const inputTitleRef = useRef();

  const todoSetDescriptionHandler = () => {
    const content = inputDescRef.current.textContent;
    if (content !== "") {
      dispatch(setTodoDescInputActive(true));
    } else {
      dispatch(setTodoDescInputActive(false));
    }
  };

  const todoSetTitleHandler = () => {
    const content = inputTitleRef.current.textContent;
    if (content !== "") {
      dispatch(setTodoTitleInputActive(true));
    } else {
      dispatch(setTodoTitleInputActive(false));
    }
  };

  const closeInputHandler = () => {
    dispatch(setTodoInputFocus(false));
    dispatch(setTodoTitleInputActive(false));
    dispatch(setTodoDescInputActive(false));
    inputDescRef.current.textContent = "";
    inputTitleRef.current.textContent = "";
  };

  const updateTodoHandler = async () => {
    try {
      console.log(id);
      const todoObj = {
        id: id,
        title: inputTitle,
        description: inputDesc,
      };
      await updateTodo(todoObj);
      refetch();
      setIsUpdating(false);
    } catch (error) {
      console.log(`Error Occurred while updating the todo: ${error}`);
    }
  };

  const todoSaveHandler = async () => {
    let title = inputTitleRef.current.textContent;
    let description = inputDescRef.current.textContent;
    const todoObj = {
      title: title,
      description: description,
    }
    dispatch(setTodoData(todoObj))
    console.log("This is todo ", todoObj);
    if (title === "" || description === "") return;

    if (isUpdating) {
      updateTodoHandler();
    } else {
      try {
        await createTodo(todoObj);
        refetch();
      } catch (error) {
        console.log(`Error Occurred while creating the todo: ${error}`);
      }
    }
    inputTitleRef.current.textContent = "";
    inputDescRef.current.textContent = "";
    dispatch(setTodoTitleInputActive(false))
    dispatch(setTodoDescInputActive(false))
  };

  return (
    <div className=" w-full flex p-10 flex-col">
      <div className="w-1/2 mx-auto bg-slate-200 rounded-md overflow-hidden p-3 flex flex-col">
        {isTodoInputFocus && (
          <TodoInput
            placeholder={!setTodoTitleInput ? "Title" : ""}
            action={todoSetTitleHandler}
            inputReference={inputTitleRef}
          />
        )}
        <TodoInput
          placeholder={!setTodoDescInput ? "Take a note..." : ""}
          action={todoSetDescriptionHandler}
          inputReference={inputDescRef}
        />
        <div className="w-full flex justify-end gap-2">
          {isTodoInputFocus && (
            <>
              <PrimaryBtn text="Save" action={todoSaveHandler} />
              <TertiaryBtn text="Close" action={closeInputHandler} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
