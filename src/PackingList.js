import Item from "./Item";
import { useState } from "react";
export default function PackingList({
  item,
  deleteItem,
  onHandleUpdate,
  handleClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedArray;
  if (sortBy === "input") sortedArray = item;

  if (sortBy === "description") {
    sortedArray = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedArray = item.slice().sort((a, b) => a.packed - b.packed);
  }
  return (
    <div className="list">
      <ul>
        {sortedArray.map((item) => (
          <Item
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            HandleUpdate={onHandleUpdate}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description order</option>
          <option value="packed">Sort by input packed</option>
        </select>
        <button onClick={() => handleClearList()}>Clear List</button>
      </div>
    </div>
  );
}
