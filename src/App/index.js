// Import React so we can use its hooks (useState, etc.).
import React from "react";
import { AppUI } from "./AppUI";
import { useLocalStorage } from "./useLocalStorage";

// const defaultTodos = [
//  { text: "Prepare Development React JS Environment", completed: true },
//  { text: "Take React.js Introductory Course", completed: false },
//  { text: "Execute npm start command on console", completed: false },
//  { text: "Check the App on Browser", completed: false },
//  { text: "Use derived states", completed: true },
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
// localStorage.removeItem('TODOS_V1');

// Main application component. Returns the whole UI and holds the global state
// (the list of TODOs and the current search text).
function App() {
  // State in React is immutable: never mutate it directly.
  // Always update it by calling its setter (saveTodos, setSearchValue),
  // which is what triggers a re-render.

  // STATE 1: the list of TODOs.
  //   - todos: the current list (loaded from localStorage; starts as [] the
  //     first time the app runs).
  //   - saveTodos: setter that writes the new list to localStorage and updates
  //     the React state in one step.
  // const [todos, setTodos] = React.useState(parsedTodos); // previous version
  const [todos, saveTodos] = useLocalStorage("TODOS_V1", []);

  // STATE 2: the text typed in the search box.
  //   - searchValue: the current input value (starts empty).
  //   - setSearchValue: setter called on every keystroke.
  // const [searchValue, setSearchValue] = React.useState(""); // previous version
  const [searchValue, setSearchValue] = React.useState("");

  // DERIVED STATE: not stored with useState. Recomputed from "todos" on every
  // render. If "todos" changes, these values are recalculated automatically
  // and can never fall out of sync with the real list.
  const completedTodos = todos.filter((todo) => todo.completed).length; // how many are done
  const totalTodos = todos.length; // how many in total

  // Search-derived state: from "todos" and "searchValue", return only the
  // TODOs whose text contains what the user typed. Both strings are lowercased
  // with toLowerCase() so the match is case-insensitive.
  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  // Debug log kept from an earlier class: prints what the user is searching.
  // Useful to see how searchValue changes on every render. Enable if needed.
  //console.log("Users find all of " + searchValue);

  // Mark a TODO as completed. Takes the TODO's text as identifier, makes a
  // shallow copy of the list (React state must not be mutated), finds the item
  // by text, sets its "completed" flag and persists the new list.
  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text == text);
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  // Delete a TODO. Same pattern: copy the list, find the item by text, remove
  // it with splice, and persist the new list.
  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text == text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <AppUI
      completedTodos={completedTodos}
      totalTodos={totalTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

// Default export: index.js imports App from here and renders it.
export default App;
