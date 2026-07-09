import { memo } from "react";
function ProductCard({ product,onAddToCart }) {
  console.count(`ProductCard Render: ${product.title}`);

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        borderRadius: "8px",
        margin: "10px",
        width: "220px",
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        width="150"
      />

      <h3>{product.title}</h3>

      <p>Price: ${product.price}</p>

      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default memo(ProductCard);
