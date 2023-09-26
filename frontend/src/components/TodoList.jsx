import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  useDeleteTodoMutation,
  useGetTodoListQuery,
} from "../services/crudApi";
import { useDispatch } from "react-redux";
import { setTodoId } from "../slices/todoSlice";
import TodoCards from "./cards/TodoCards"
import { useState } from "react";

const TodoList = (props) => {
  const { setInputTitle, setInputDesc, setIsUpdating } = props;
  const { data, error, isLoading } = useGetTodoListQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const { refetch } = useGetTodoListQuery();
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);

  const deleteTodoHandler = async (id) => {
    try {
      const todo = await deleteTodo(id);
      refetch();
    } catch (error) {
      console.log("Error occurred while deleting the todo", error);
    }
  };

  const updateTodoHandler = async (id) => {
    try {
      const getTodo = data.find((item) => item.id === id);
      setInputTitle(getTodo.title);
      setInputDesc(getTodo.description);
      console.log(getTodo);
      setIsUpdating(true);
      dispatch(setTodoId(id));
    } catch (error) {
      console.log("Error occurred while updating the todo" + error);
    }
  };
  

  return (
    <TodoCards isOpen={isOpen} setIsOpen={setIsOpen}  />
  );
};

export default TodoList;
