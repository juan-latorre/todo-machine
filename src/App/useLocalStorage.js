import React from "react";

// Custom hook: persists any piece of state in the browser's localStorage.
// Behaves like React.useState, but also reads from and writes to localStorage
// so the value survives page reloads.
//
// Parameters:
//   - itemName: the key under which the value is stored in localStorage.
//   - initialValue: the value to use the first time (when nothing is stored yet).
//
// Returns [item, saveItem]:
//   - item: the current value.
//   - saveItem: a setter that updates both the React state and localStorage.
//   - loading:
//   - error:
function useLocalStorage(itemName, initialValue) {
  // Read whatever is stored under itemName. Returns null if nothing is stored.
  //const localStorageItem = localStorage.getItem(itemName);
  // Local React state seeded with whatever we loaded (or just stored).
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
