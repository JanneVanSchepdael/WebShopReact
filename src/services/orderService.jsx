const apiUrl = process.env.REACT_APP_BASE_URL + "/orders";

const getOrders = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data.orders;
    } catch (error) {
        console.log(error);
    }
}

const addOrder = async (cart) => {
    const transformedCart = {
        userId: cart.userId,
        items: cart.items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity
        }))
    };
    
    try {
        const response = await fetch(`${apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({order: transformedCart})
        });
        const data = await response.json();
        return data.order;
    } catch (error) {
        console.log(error);
    }
}

const orderApi = {
    getOrders,
    addOrder
};

export default orderApi;