import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  useDeleteTodoMutation,
  useGetTodoListQuery,
} from "../services/crudApi";
import { useDispatch } from "react-redux";
import { setTodoId } from "../slices/todoSlice";

const TodoList = (props) => {
  const { setInputTitle, setInputDesc, setIsUpdating } = props;
  const { data, error, isLoading } = useGetTodoListQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const { refetch } = useGetTodoListQuery();
  const dispatch = useDispatch()

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
      console.log(error);
    }
  };

  return (
    <div className="p-10 flex flex-col gap-4">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error occurred: {error.code}</h2>
      ) : (
        data?.map((item) => (
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
              <div
                onClick={() => {
                  updateTodoHandler(item.id);
                }}
                className="py-1 px-3 bg-green-700 rounded-md cursor-pointer border border-green-600 hover:bg-green-600 transition-all duration-200"
              >
                <UpdateIcon />
              </div>
              <div
                onClick={() => {
                  deleteTodoHandler(item.id);
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
