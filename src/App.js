import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 10, packed: true },
// ];

export default function App() {
  const [items, setItem] = useState([]);

  function handleAddItem(item) {
    setItem((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItem(items.filter((item) => item.id !== id));
  }

  function handleUpdate(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    alert("Are you sure to clear Packing list?");
    setItem([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form addItem={handleAddItem} />
      <PackingList
        item={items}
        deleteItem={handleDeleteItem}
        onHandleUpdate={handleUpdate}
        handleClearList={handleClearList}
      />
      <Stats item={items} />
    </div>
  );
}
