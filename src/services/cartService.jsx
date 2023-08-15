const apiUrl = process.env.REACT_APP_BASE_URL + "/carts";

const getCart = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data.cart;
    } catch (error) {
        console.log(error);
    }
}

const editCart = async (cart) => {
    try {
        const transformedCart = {
            ...cart,
            items: cart.items.map(item => ({
                ...item,
                productId: item.product.id,
            }))
        };

        const response = await fetch(`${apiUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cart: transformedCart})
        });
        const data = await response.json();
        return data.cart;
    } catch (error) {
        console.log(error);
    }
}

const cartApi = {
    getCart,
    editCart
};

export default cartApi;