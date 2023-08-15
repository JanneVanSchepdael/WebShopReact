import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userService from '../services/userService';
import { UserContext } from '../UserProvider';

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const login = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const user = await userService.login(formData);
            setUser(user);
            navigate('/');
            toast.success('You are logged in.');
        } catch (err) {
            setError(err.message || 'Login failed.');
            toast.error(err.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="account section border-top" style={{ minHeight: '81vh' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="login-form border p-5">
                            <div className="text-center heading">
                                <h3 className="mb-2">Log in</h3>
                                <p className="lead">Don't have an account? <Link to="/register"> Register now</Link></p>
                            </div>

                            {error && <p className="text-danger">{error}</p>}

                            <form onSubmit={login}>
                                <div className="form-group mb-4">
                                    <label>Enter Email Address</label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label>Enter Password</label>
                                    <input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>
                                <button type="submit" className="btn btn-main mt-3 btn-block" disabled={isLoading}>
                                    {isLoading ? 'Logging in...' : 'Log in'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;