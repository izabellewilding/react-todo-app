import React, { useState } from "react";
import "./styles/css-reset.scss";
import "./styles/app.scss";
import "./styles/fonts.scss";
import { ReactComponent as MenuIcon } from "./assets/menu.svg";

const Todo = ({ todo, index, completeTodo, removeTodo }) => (
  <div
    className="todo"
    style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
  >
    {todo.text}
    <div>
      <button onClick={() => completeTodo(index)}>Complete</button>
      <button onClick={() => removeTodo(index)}>X</button>
    </div>
  </div>
);
const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </form>
  );
};

const AppHeader = () => {
  return (
    <div className="app-header">
      <MenuIcon className="app-header-menu-icon" />
      <div className="app-header-content ">
        <div className="app-header-title ">
          <h1 className="">Your</h1>
          <h1 className="">Todos</h1>
        </div>
        <div className="app-header-info-container ">
          <div className="info-item">
            <h3>24</h3>
            <p className="subhead">Incomplete</p>
          </div>
          <div className="info-item ">
            <h3>10</h3>
            <p className="subhead">Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};
function App() {
  const [todos, setTodos] = useState([
    { text: "Learn about React", isCompleted: false },
    { text: "Meet friend for lunch", isCompleted: false },
    { text: "Build really cool todo app", isCompleted: false },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <AppHeader />
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}{" "}
      </div>
    </div>
  );
}

export default App;
