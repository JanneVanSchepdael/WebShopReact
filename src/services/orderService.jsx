const apiUrl = process.env.REACT_APP_BASE_URL;

const getOrders = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/order/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const addOrder = async (order) => {
    try {
        const response = await fetch(`${apiUrl}/order/add`, {
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