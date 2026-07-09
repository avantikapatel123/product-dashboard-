const API_URL = 'https://dummyjson.com';

const request = async (path, options) => {
  const response = await fetch(`${API_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const getAllProducts = async () => {
  try {
    return await request('/products');
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const getSingleProduct = async (id) => {
  try {
    return await request(`/products/${id}`);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};


export const getCarts = async () => {
  try {
    return await request('/carts');
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error;
  }
};

export const addToCart = async (product) => {
  return request("/carts/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: product.id,
          quantity: 1,
        },
      ],
    }),
  });
};
