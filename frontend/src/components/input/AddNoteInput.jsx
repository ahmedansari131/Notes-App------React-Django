import React, { useState, useRef } from "react";
import {
  useCreateTodoMutation,
  useGetTodoListQuery,
} from "../../services/crudApi";
import { NoteInput, Placeholder, PrimaryBtn, TertiaryBtn } from "../index";

const AddNoteInput = () => {
  const [focus, setFocus] = useState(false);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const [title, setTitle] = useState(false);
  const [desc, setDesc] = useState(false);
  const [createTodo, { isLoading }] = useCreateTodoMutation();
  const { refetch } = useGetTodoListQuery();

  const getTitle = () => {
    const title = titleRef.current.innerText;
    if (title) setTitle(true);
    else setTitle(false);
    return title;
  };

  const getDesc = () => {
    const desc = descRef.current.innerText;
    if (desc) setDesc(true);
    else setDesc(false);
    return desc;
  };

  const closeInputHandler = () => {
    setFocus(false);
    setDesc(false);
    setTitle(false);
    titleRef.current.innerText = "";
    descRef.current.innerText = "";
  };

  const todoSaveHandler = async () => {
    console.log("object")
    const todoObj = {
      title: getTitle(),
      description: getDesc(),
    };
    if (getTitle() === "" || getDesc() === "") return;

    try {
      const response = await createTodo(todoObj);
      console.log(response);
      refetch();
    } catch (error) {
      console.log(`Error Occurred while creating the todo: ${error}`);
    }
  };

  return (
    <div
      className={`w-1/3 m-auto flex flex-col gap-4 bg-slate-700 rounded-md overflow-hidden p-2 ${
        !focus ? "py-1" : "py-4"
      } shadow-2xl`}
    >
      <div className="w-full">
        {focus && (
          <div className="relative">
            {!title && <Placeholder text="Title" className="text-lg" />}
            <NoteInput action={getTitle} className="text-lg" ref={titleRef} />
          </div>
        )}
        <div className="relative">
          {!desc && (
            <Placeholder
              className=" text-slate-400 font-light"
              text="Take a note..."
            />
          )}
          <NoteInput
            action={getDesc}
            ref={descRef}
            onClick={() => setFocus(true)}
          />
        </div>
      </div>

      {focus && (
        <div className="flex justify-end gap-4">
          <PrimaryBtn text="Save" className="" action={todoSaveHandler} />
          <TertiaryBtn text="Close" action={closeInputHandler} />
        </div>
      )}
    </div>
  );
};

export default AddNoteInput;
