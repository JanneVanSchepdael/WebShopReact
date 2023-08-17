const apiUrl = process.env.REACT_APP_BASE_URL;

const getAll = async (params) => {
  let url = new URL(`${apiUrl}/products`);

  try {
    if (params.searchTerm) {
      url.searchParams.append('searchTerm', params.searchTerm);
  }
  if (params.page) {
      url.searchParams.append('page', params.page);
  }
  if (params.amount) {
      url.searchParams.append('amount', params.amount);
  }
  if (params.minDaysOld) {
      url.searchParams.append('minDaysOld', params.minDaysOld);
  }
  if (params.maxDaysOld) {
      url.searchParams.append('maxDaysOld', params.maxDaysOld);
  }
  if (params.orderBy) {
      url.searchParams.append('orderBy', params.orderBy);
  }

    const response = await fetch(url.toString());
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