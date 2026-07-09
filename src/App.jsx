import { getAllProducts, addToCart } from "./server/api";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import useProductFilters from "./Hooks/useProductFilters";
import { Suspense, lazy, useMemo, useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import "./App.css";

const CheckoutModal = lazy(() => import("./components/CheckoutModal"));

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { search, setSearch, sort, setSort } = useProductFilters();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const filteredProducts = useMemo(() => {
    console.count("Filter and sort calculation");
    let updatedProducts = [...(data?.products || [])];

    if (search) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    return updatedProducts;
  }, [data, search, sort]);

  const { mutate: addProductToCart } = useMutation({
    mutationFn: addToCart,
    onMutate: async () => {
      let previousCartCount = 0;

      setCartCount((prev) => {
        previousCartCount = prev;
        return prev + 1;
      });

      return { previousCartCount };
    },
    onError: (_error, _product, context) => {
      if (context) {
        setCartCount(context.previousCartCount);
      }

      alert("Failed to add product to cart. Please try again.");
    },
    onSuccess: () => {
      console.log("Product added to cart successfully");
    },
  });

  const handleAddToCart = useCallback(
    (product) => {
      addProductToCart(product);
    },
    [addProductToCart]
  );

  if (isLoading) {
    return (
      <div className="loading-wrap">
        <div className="spinner"></div>
        <h1>Loading products...</h1>
      </div>
    );
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  console.log("Search:", search);
  console.log("Sort:", sort);

  return (
    <div style={{ padding: "20px" }}>
      <Header
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        cartCount={cartCount}
        onCheckout={() => setIsCheckoutOpen(true)}
      />
      <h1 style={{ textAlign: "center" }}>🛍️ Product Dashboard</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {isCheckoutOpen && (
        <Suspense fallback={<div className="modal-fallback">Loading checkout...</div>}>
          <CheckoutModal
            cartCount={cartCount}
            onClose={() => setIsCheckoutOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
