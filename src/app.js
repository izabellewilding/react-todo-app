import React, { useState } from "react";
import "./styles/css-reset.scss";
import "./styles/app.scss";
import "./styles/fonts.scss";
import { ReactComponent as AppSmallImage } from "./assets/mobile-svg.svg";
import { ReactComponent as AppLargeImage } from "./assets/undraw_add_post_64nu.svg";

import CloseIcon from "./assets/close-24px.svg";
import TextField from "./components/text-field";
import Typography from "./components/typography";
import { ListItem, ListItemMeta, List } from "./components/list";
import Checkbox from "./components/checkbox";
import Add from "./assets/add-24px.svg";
import IconButton from "./components/button";

const Todo = ({ todo, index, toggleCompleteTodo, removeTodo }) => {
  return (
    <div className="todo">
      <ListItem
        className="todo-item app-margin-bottom "
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        ripple={false}
        onClick={() => toggleCompleteTodo(index)}
      >
        {" "}
        <Typography use="body1"> {todo.text}</Typography>
        <ListItemMeta>
          <Checkbox checked={todo.isCompleted} />
        </ListItemMeta>
      </ListItem>
      <IconButton
        icon={CloseIcon}
        onClick={() => removeTodo(index)}
        style={{ zIndex: 10 }}
      />
    </div>
  );
};

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
      <TextField
        placeholder="Add a new todo..."
        type="text"
        value={value}
        className="input app-margin-bottom"
        fullwidth
        required
        onChange={(e) => setValue(e.target.value)}
      >
        <div className="todo-add-button">
          <IconButton icon={Add} onClick={handleSubmit} />
        </div>
      </TextField>
    </form>
  );
};

const AppHeader = () => {
  return (
    <div className="app-header">
      <div className="app-header-title ">
        <Typography use="headline2" className="DM-sans">
          Your Todos
        </Typography>
      </div>
      <AppSmallImage className="app-img" />
      <AppLargeImage className="app-img-lg" />
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
    const newTodos = [{ text }, ...todos];
    setTodos(newTodos);
  };

  const toggleCompleteTodo = (index) => {
    const newTodos = [...todos];

    if (newTodos[index].isCompleted) {
      newTodos[index].isCompleted = false;
    } else {
      newTodos[index].isCompleted = true;
    }
    setTodos(newTodos);
  };

  //need to refactor into slice

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <AppHeader />
      <div className="app-main">
        <div className="todo-list">
          {" "}
          <TodoForm addTodo={addTodo} />
          <List nonInteractive={true}>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                index={index}
                todo={todo}
                toggleCompleteTodo={toggleCompleteTodo}
                removeTodo={removeTodo}
              />
            ))}{" "}
          </List>
        </div>
      </div>
    </div>
  );
}

export default App;
