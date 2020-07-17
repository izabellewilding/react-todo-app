import React, { useState, useEffect } from "react";
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
import { ReactComponent as HeartIcon } from "./assets/heart-outlined.svg";

import Add from "./assets/add-24px.svg";
import { IconButton } from "./components/button";

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
        name="remove todo"
        onClick={() => removeTodo(index)}
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
        aria-label="add new to do"
        className="input app-margin-bottom"
        fullwidth
        required
        onChange={(e) => setValue(e.target.value)}
      >
        <div className="todo-add-button">
          <IconButton
            icon={Add}
            name="add to do"
            onClick={handleSubmit}
            type="submit"
          />
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
      <AppSmallImage
        className="app-img"
        alt="illustration of person adding a todo"
      />
      <AppLargeImage
        className="app-img-lg "
        alt="illustration of person adding a todo"
      />
    </div>
  );
};
function App() {
  const [todos, setTodos] = useState([
    { text: "Learn about React", isCompleted: false },
    { text: "Write a blog post", isCompleted: false },
    { text: "Water the garden", isCompleted: false },
  ]);

  useEffect(() => {
    function loadStoredTodos() {
      const storedTodos = window.localStorage.getItem("todos");
      try {
        return JSON.parse(storedTodos);
      } catch (error) {}
    }
    if (loadStoredTodos()) {
      setTodos(loadStoredTodos());
    }
  }, []);

  const addTodo = (text) => {
    const newTodos = [{ text }, ...todos];
    setTodos(newTodos);
    window.localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleCompleteTodo = (index) => {
    const newTodos = [...todos];

    if (newTodos[index].isCompleted) {
      newTodos[index].isCompleted = false;
    } else {
      newTodos[index].isCompleted = true;
    }
    setTodos(newTodos);
    window.localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  //need to refactor into slice

  const removeTodo = (index) => {
    const currentTodos = [...todos];
    const filteredTodos = currentTodos.filter((todo, i) => i !== index);
    setTodos(filteredTodos);
    window.localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  return (
    <div className="app">
      <AppHeader />
      <div className="app-main">
        <div className="todo-list">
          {" "}
          <TodoForm addTodo={addTodo} aria-label="to do input" />
          <List nonInteractive={true} aria-label="a list of your to dos">
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
        <a
          href="https://www.izzywilding.com/"
          aria-label="link to app creators website"
          unelevated
          target="__blank"
          className="credits"
        >
          <Typography use="body2">
            {" "}
            Made by Izabelle <HeartIcon />
          </Typography>
        </a>
      </div>
    </div>
  );
}

export default App;
