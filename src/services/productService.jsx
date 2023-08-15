const apiUrl = process.env.REACT_APP_BASE_URL;

const getAll = async () => {
  try {
    const response = await fetch(`${apiUrl}/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error.message);
    throw error;
  }
}

const getProduct = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/products/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error.message);
    throw error;
  }
}

const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await fetch(`${apiUrl}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId, quantity })
    });
    const data = await response.json();
    return data.cart;
  } catch (error) {
    console.log(error);
  }
}


const productApi = {
  getAll,
  getProduct,
  addToCart
};

export default productApi;