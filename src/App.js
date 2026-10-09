import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
import { TodoSearch } from "./TodoSearch";
import { CreateTodoButton } from "./CreateTodoButton";

const defaultTodos = [
  { text: "Prepare Development React JS Environment", completed: true },
  { text: "Take React.js Introductory Course", completed: false },
  { text: "Execute npm start command on console", completed: false },
  { text: "Check the App on Browser", completed: false },
];

function App() {
  const completedTodos = defaultTodos.filter((todo) => todo.completed).length;
  const totalTodos = defaultTodos.length;

  return (
    <>
      <TodoCounter completed={completedTodos} total={totalTodos} />
      <TodoSearch />

      <TodoList>
        {defaultTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </>
  );
}

export default App;
