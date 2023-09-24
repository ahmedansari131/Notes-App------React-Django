import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { useState } from "react";

function App() {
  const [inputDesc, setInputDesc] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState(null);

  return (
    <>
      <div className="w-full min-h-screen bg-sky-950">
        <AddTodo
          inputDesc={inputDesc}
          setInputDesc={setInputDesc}
          inputTitle={inputTitle}
          setInputTitle={setInputTitle}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
          todoId={todoId}
          setTodoId={setTodoId}
        />
        <TodoList
          inputDesc={inputDesc}
          setInputDesc={setInputDesc}
          inputTitle={inputTitle}
          setInputTitle={setInputTitle}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
          todoId={todoId}
          setTodoId={setTodoId}
        />
      </div>
    </>
  );
}

export default App;
