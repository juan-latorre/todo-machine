import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          // First run (or key was cleared): seed localStorage with the initial value
          // serialized as JSON, and use the initial value for the state.
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Setter wrapper: writes the new value to localStorage AND updates the state
  // so the component re-renders. Always use this instead of setItem directly.
  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
}

export { useLocalStorage };

// const defaultTodos = [
//  { text: "Prepare Development React JS Environment", completed: true },
//  { text: "Take React.js Introductory Course", completed: false },
//  { text: "Execute npm start command on console", completed: false },
//  { text: "Check the App on Browser", completed: false },
//  { text: "Use derived states", completed: true },
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
// localStorage.removeItem('TODOS_V1');
