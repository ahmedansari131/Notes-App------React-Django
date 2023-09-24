import PrimaryBtn from "./buttons/PrimaryBtn";
import SecondaryBtn from "./buttons/SecondaryBtn";
import {
  useCreateTodoMutation,
  useGetTodoListQuery,
  useUpdateTodoMutation,
} from "../services/crudApi";
import { useSelector } from "react-redux";

const AddTodo = (props) => {
  const { inputTitle, setInputTitle, inputDesc, setInputDesc, isUpdating, setIsUpdating } =
    props;

  const [createTodo] = useCreateTodoMutation();
  const { refetch } = useGetTodoListQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const id = useSelector((state) => state.todo.todoId);

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

  const handleSubmit = async () => {
    if (inputDesc === "" || inputTitle === "") return;
    let todoObj = {
      title: inputTitle,
      description: inputDesc,
    };

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
            text={`${isUpdating ? "Update" : "Add"}`}
            action={handleSubmit}
          />
          <SecondaryBtn setinputDesc={setInputDesc} />
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
