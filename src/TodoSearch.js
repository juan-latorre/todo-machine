import React from "react";
import "./TodoSearch.css";

function TodoSearch() {
  const [searchValue, setSearchValue] = React.useState("");

  console.log("Users find all of " + searchValue);

  return (
    <input
      className="TodoSearch"
      placeholder="Prepare Development Environment (React JS)"
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value);
      }}
    />
  );
}
export { TodoSearch };
