import React, { useState, useEffect } from "react";
import "./styles/css-reset.scss";
import "./styles/app.scss";
import "./styles/fonts.scss";
import { ReactComponent as AppLogo } from "./assets/mobile-svg.svg";
import CloseIcon from "./assets/close-24px.svg";
import TextField from "./components/text-field";
import Typography from "./components/typography";
import { ListItem, ListItemMeta, List } from "./components/list";
import Checkbox from "./components/checkbox";

const Todo = ({ todo, index, completeTodo, removeTodo, isCompleted }) => {
  const [checked, setChecked] = useState(false);

  // useEffect(() => {
  //   if (checked) {
  //     completeTodo(index);
  //   }
  // });

  return (
    <ListItem
      className="todo app-margin-bottom "
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {" "}
      <Checkbox
        checked={checked}
        onChange={(evt) => {
          setChecked(!!evt.currentTarget.checked);
          completeTodo(index);
        }}
      />
      {todo.text}
      <ListItemMeta
        icon={CloseIcon}
        onClick={() => removeTodo(index)}
      ></ListItemMeta>
    </ListItem>
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
        required
        fullwidth
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

const AppHeader = () => {
  return (
    <div className="app-header">
      {/* <MenuIcon className="app-header-menu-icon" /> */}
      <div className="app-header-title ">
        <Typography use="headline2" className="">
          Your Todos
        </Typography>
      </div>
      <div className="app-image-container">
        <AppLogo className="app-image" />
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
      <div className="todo-list">
        {" "}
        <TodoForm addTodo={addTodo} />
        <List>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}{" "}
        </List>
      </div>
    </div>
  );
}

export default App;
