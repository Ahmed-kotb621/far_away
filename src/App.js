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

function Logo() {
  return <h1>⛱ Far Away 💼</h1>;
}

function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { id: Date.now(), description, quantity, packed: false };

    addItem(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your ⛱ trip ?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((x) => (
          <option value={x} key={x}>
            {x}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ item, deleteItem, onHandleUpdate, handleClearList }) {
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

function Item({ item, deleteItem, HandleUpdate }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => HandleUpdate(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ item }) {
  if (!item.length) {
    return (
      <div className="states">
        <em>Start Adding Your Items to Packing List</em>
      </div>
    );
  }
  const itemNum = item.length;
  const packed = item.filter((item) => item.packed).length;
  const packedRatio = Math.round((packed / itemNum) * 100);
  return (
    <footer className="stats">
      {packedRatio === 100 ? (
        <em>You get everyThing! Ready to go ✈</em>
      ) : (
        <em>
          💼 You have {itemNum} items in your list, and you already packed{" "}
          {packed} ({packedRatio}%)
        </em>
      )}
    </footer>
  );
}
