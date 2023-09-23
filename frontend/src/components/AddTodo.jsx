import React, { useState } from "react";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { useDispatch } from "react-redux";
import PrimaryBtn from "./buttons/PrimaryBtn";
import SecondaryBtn from "./buttons/SecondaryBtn";
import {
  useCreateTodoMutation,
  useGetTodoListQuery,
} from "../services/crudApi";

const AddTodo = (props) => {
  const {
    inputTitle,
    setInputTitle,
    inputDesc,
    setInputDesc,
  } = props;

  const [createTodo] = useCreateTodoMutation();
  const { refetch } = useGetTodoListQuery();

  const handleSubmit = async () => {
    if (inputDesc === ""  || inputTitle === "") return;
    let todoObj = {
      title: inputTitle,
      description: inputDesc,
    };

    try {
      const newTodo = await createTodo(todoObj);
      refetch();
    } catch (error) {
      console.log(`Error Occurred: ${error}`);
    }
    setInputDesc("");
    setInputTitle("");
  };

  return (
    <div className=" w-full h-96 flex justify-center p-10  border-b border-sky-900 flex-col gap-5">
      <h2 className="text-3xl font-bold text-white uppercase">Todo App</h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col w-full items-start h-full gap-4"
      >
        <input
          className="w-full rounded-md px-3 py-2 outline-none border-none"
          value={inputTitle}
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <textarea
          value={inputDesc}
          onChange={(e) => setInputDesc(e.target.value)}
          placeholder="Description"
          id="textarea"
          className="w-full rounded-md resize-none outline-none p-3 h-full"
        ></textarea>
        <div className="flex gap-5">
          <PrimaryBtn
            text="Add"
            action={handleSubmit}
          />
          <SecondaryBtn setinputDesc={setInputDesc} />
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
