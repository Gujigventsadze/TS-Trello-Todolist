import { useState } from "react";
import "./App.css";
import Inputfield from "./Components/Input Field/Inputfield";
import { Todo } from "./Model";
import Todobox from "./Components/Todobox/Todobox";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    console.log(result);

    if (!destination) return;

    if (
      source.droppableId === "Finishedlist" &&
      destination.droppableId === "Todolist"
    )
      return;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(
        source.droppableId === "Todolist" ? todos : todosCompleted
      );
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      if (source.droppableId === "Todolist") {
        setTodos(items);
      } else {
        setTodosCompleted(items);
      }
    } else {
      const sourceItems = Array.from(todos);
      const [movedItem] = sourceItems.splice(source.index, 1);
      setTodos(sourceItems);

      const destinationItems = Array.from(todosCompleted);
      destinationItems.splice(destination.index, 0, {
        ...movedItem,
        completed: true,
      });
      setTodosCompleted(destinationItems);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="title">To Do List</div>
        <Inputfield todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="active-containers">
            <div className="active">
              <div>Active Tasks</div>
              <Droppable droppableId="Todolist">
                {(provided) => (
                  <div
                    className="todo-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {todos.map((todo, index) => (
                      <Todobox
                        id={todo.id}
                        index={index}
                        key={todo.id}
                        title={todo.name}
                        handleDelete={handleDelete}
                        handleFinish={handleFinish}
                        handleEdit={handleEdit}
                        completed={todo.completed}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className="done">
              <div>Finished Tasks</div>
              <Droppable droppableId="Finishedlist">
                {(provided) => (
                  <div
                    className="todo-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {todosCompleted.map((todo, index) => (
                      <Todobox
                        id={todo.id}
                        index={index}
                        key={todo.id}
                        title={todo.name}
                        handleDelete={handleDelete}
                        handleFinish={handleFinish}
                        handleEdit={handleEdit}
                        completed={todo.completed}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
