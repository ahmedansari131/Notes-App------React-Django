import AddTodo from "./components/AddTodo"
import TodoList from "./components/TodoList"
import { useState } from "react";


function App() {
  const [inputDesc, setInputDesc] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  return (
    <>
    <div className="w-full min-h-screen bg-sky-950">
      <AddTodo inputDesc={inputDesc}  setInputDesc={setInputDesc} inputTitle={inputTitle} setInputTitle={setInputTitle} />
      <TodoList inputDesc={inputDesc}  setInputDesc={setInputDesc} inputTitle={inputTitle} setInputTitle={setInputTitle} />
    </div>
    </>
  )
}

export default App
