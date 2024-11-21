import { useState } from "react";
import "./App.css";
import Inputfield from "./Components/Input Field/Inputfield";
import { Todo } from "./Model";
import Todobox from "./Components/Todobox/Todobox";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosCompleted, setTodosCompleted] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo.length < 1) return;

    const newToDo: Todo = {
      id: Date.now(),
      name: todo,
      completed: false,
    };

    setTodos([...todos, newToDo]);
    setTodo("");
  };

  const handleDelete = (id: number) => {
    if (todos.find((todo) => todo.id === id)) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } else {
      setTodosCompleted((prevTodosCompleted) =>
        prevTodosCompleted.filter((todo) => todo.id !== id)
      );
    }
  };
  const handleFinish = (id: number) => {
    const finishedTodo = todos.find((todo) => todo.id === id);
    if (finishedTodo) {
      setTodosCompleted((prevTodosCompleted) => [
        ...prevTodosCompleted,
        { ...finishedTodo, completed: true },
      ]);
    }
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== finishedTodo?.id)
    );
  };
  const handleEdit = (id: number, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, name: newText } : todo
      )
    );
  };

  return (
    <>
      <div className="main-container">
        <div className="title">To Do List</div>
        <Inputfield todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <div className="active-containers">
          <div className="active">
            <div>Active Tasks</div>
            <div className="todo-list">
              {todos.map((todo) => (
                <Todobox
                  id={todo.id}
                  key={todo.id}
                  title={todo.name}
                  handleDelete={handleDelete}
                  handleFinish={handleFinish}
                  handleEdit={handleEdit}
                  completed={todo.completed}
                />
              ))}
            </div>
          </div>
          <div className="done">
            <div>Finished Tasks</div>
            <div className="todo-list">
              {todosCompleted.map((todo) => (
                <Todobox
                  id={todo.id}
                  key={todo.id}
                  title={todo.name}
                  handleDelete={handleDelete}
                  handleFinish={handleFinish}
                  handleEdit={handleEdit}
                  completed={todo.completed}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
