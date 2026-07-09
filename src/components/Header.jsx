function Header({ search, setSearch, sort, setSort, cartCount, onCheckout }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        background: "#f5f5f5",
        marginBottom: "20px",
      }}
    >
      <h2>🛍️ Product Store</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sort}
           onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        <button type="button">
          🛒 Cart ({cartCount})
        </button>

        <button type="button" onClick={onCheckout} disabled={cartCount === 0}>
          Proceed To Checkout
        </button>
      </div>
    </header>
  );
}

export default Header;
