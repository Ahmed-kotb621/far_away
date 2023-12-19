export default function Stats({ item }) {
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
