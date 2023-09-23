import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../slices/todoSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  useDeleteTodoMutation,
  useGetTodoListQuery,
} from "../services/crudApi";
import { useState, useEffect } from "react";

const TodoList = (props) => {
  const {
    inputText,
    setInputText,
    setIsUpdating,
  } = props;

  const { data, error, isLoading } = useGetTodoListQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const { refetch } = useGetTodoListQuery();
  const [currentData, setCurrentData] = useState([]);

  const getTextToInput = (text) => {
    setIsUpdating(true);
    let todoText = text;
    setInputText(todoText);
  };

  const deleteTodoHandler = async (id) => {
    try {
      const todo = await deleteTodo(id);
      refetch();
    } catch (error) {
      console.log("Error occurred while deleting the todo", error);
    }
  };

  useEffect(() => {
    if (data) {
      setCurrentData(data);
    }
  }, [data]);

  return (
    <div className="p-10 flex flex-col gap-4">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error occurred: {error.code}</h2>
      ) : (
        currentData?.map((item) => (
          <div
            key={item.id}
            className="bg-sky-800 border border-sky-400 rounded-md px-6 py-5 flex justify-between items-center "
          >
            <div>
              <li className="list-none text-white font-medium text-lg">
                {item.title}
              </li>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="py-1 px-3 bg-green-700 rounded-md cursor-pointer border border-green-600 hover:bg-green-600 transition-all duration-200">
                <UpdateIcon
                  onClick={() => {
                    getTextToInput(item.title, item.id);
                    setTodoId(item.id);
                  }}
                />
              </div>
              <div
                onClick={() => {
                  deleteTodoHandler(item.id);
                  console.log(item.id);
                }}
                className="py-1 px-3 bg-red-700 rounded-md border border-red-500 cursor-pointer hover:bg-red-600 transition-all duration-200"
              >
                <DeleteIcon />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
