import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserProvider';
import orderService from '../services/orderService';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Profile() {
    const [orders, setOrders] = useState(null);
    const { user, setUser, loading} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            toast.warn('You need to login first!');
            navigate("/login");
        }
    }, [user, navigate, loading]);


    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const ordersData = await orderService.getOrders(user.id);
                    setOrders(ordersData);
                } catch (error) {
                    console.error("Error fetching order data:", error);
                }
            }
        };
        fetchOrders();
    }, [user]);

    const updateUser = async (e) => {
        e.preventDefault();

        try {
            await userService.updateUser(user);
            toast.success('User updated.');
        } catch (err) {
            toast.error(err.message || 'Update failed.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
      }

    return (
        <section className="user-dashboard page-wrapper border-top py-4" style={{ minHeight: '81vh' }}>
            <div className="container">
                <h2 className="py-2">My Profile</h2>
                <div className="row">
                    <div className="col-12 col-md-5 col-sm-12 col-lg-7">
                        <h2 className="py-2">Order History</h2>
                        {orders && 
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Total Products</th>
                                        <th scope="col">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td>{order.amountOfProducts}</td>
                                            <td>${order.totalPrice.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>

                    <div className="col-12 col-md-7 col-sm-12 col-lg-5">
                        <div className="acccount-settings">
                            <h4 className="mb-4">Account information</h4>
                            <form id="editForm" onSubmit={updateUser}>
                                <div className="form-row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input 
                                                value={user.firstName} 
                                                onChange={(e) => setUser({ ...user, firstName: e.target.value })} 
                                                type="text" 
                                                name="firstName" 
                                                className="form-control" 
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input 
                                                value={user.lastName} 
                                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                                type="text" 
                                                name="lastName" 
                                                className="form-control" 
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-4">
                                            <label>Email address</label>
                                            <input 
                                                value={user.email} 
                                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                type="text" 
                                                name="email" 
                                                className="form-control" 
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-dark">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;