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

const addOrder = async (order) => {
    try {
        const response = await fetch(`${apiUrl}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const orderApi = {
    getOrders,
    addOrder
};

export default orderApi;