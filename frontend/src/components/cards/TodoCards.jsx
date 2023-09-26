import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  useDeleteTodoMutation,
  useGetTodoListQuery,
} from "../../services/crudApi";
import { useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "../Dropdowns/Dropdown";
import LabelIcon from "@mui/icons-material/Label";

const TodoCards = (props) => {
  const { isOpen, setIsOpen } = props;
  const { data, error, isLoading } = useGetTodoListQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const { refetch } = useGetTodoListQuery();
  const dispatch = useDispatch();
  const [cardId, setCardId] = useState(null);
  const dropdownList = ["Delete", "Add label"];

  const deleteTodoHandler = async (id) => {
    try {
      const todo = await deleteTodo(id);
      refetch();
    } catch (error) {
      console.log("Error occurred while deleting the todo", error);
    }
  };

  const dropdownHandler = (id) => {
    setCardId(id);
    setIsOpen(!isOpen);
  };

  // const updateTodoHandler = async (id) => {
  //   try {
  //     const getTodo = data.find((item) => item.id === id);
  //     setInputTitle(getTodo.title);
  //     setInputDesc(getTodo.description);
  //     console.log(getTodo);
  //     setIsUpdating(true);
  //     dispatch(setTodoId(id));
  //   } catch (error) {
  //     console.log("Error occurred while updating the todo" + error);
  //   }
  // };
  return (
    <div className="p-10 grid grid-cols-5 gap-6">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error occurred: {error.code}</h2>
      ) : (
        data?.map((item) => (
          <div
            id={item.id}
            key={item.id}
            className="bg-slate-900 border border-slate-700 rounded-md px-6 py-5 max-w-xs cursor-default"
            style={{ wordWrap: "break-word" }}
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col gap-3">
                <li
                  className="list-none text-white font-medium break-words text-xl"
                  style={{ wordBreak: "break-word" }}
                >
                  {item.title}
                </li>
                <p className="text-slate-400 font-normal text-sm">
                  {item.description}
                </p>
              </div>
              <div className="flex justify-end rounded-md mt-3">
                <div className="relative">
                  <MoreVertIcon
                    className="text-slate-200 hover:bg-slate-600 p-1 rounded-sm text-xl cursor-pointer "
                    style={{ fontSize: "1.8rem" }}
                    onClick={() => dropdownHandler(item.id)}
                  />
                  <Dropdown
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    cardId={cardId}
                    id={item.id}
                    list={dropdownList}
                    icons={[<DeleteIcon className="text-red-600" />, <LabelIcon className="text-slate-800" />]}
                    action={deleteTodoHandler}
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex items-center gap-4 text-white">
              <div
                onClick={() => {
                  updateTodoHandler(item.id);
                }}
                className="py-1 px-3 bg-green-700 rounded-md cursor-pointer border border-green-600 hover:bg-green-600 transition-all duration-200"
              >
                <UpdateIcon />
              </div>
        
            </div> */}
          </div>
        ))
      )}
    </div>
  );
};

export default TodoCards;
