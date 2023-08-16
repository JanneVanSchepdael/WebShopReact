import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../UserProvider';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';


function Register() {
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
            setError('Make sure all fields are filled out!');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        setLoading(true);

        try {
            const user = await userService.register(formData);
            setUser(user);
            navigate('/');
            toast.success("Registration successful!")
        } catch (err) {
            setError(err.message || 'Registration failed.');
            toast.error(err.message || 'Registration failed.');
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
                                <h3 className="mb-2">Sign Up</h3>
                                <p className="lead">Already have an account? <a href="/login"> Login now</a></p>
                            </div>

                            {error && <p className="text-danger">{error}</p>}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-4">
                                    <label>Enter Email Address</label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label>Confirm Password</label>
                                    <input
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                    />
                                </div>
                                <button type="submit" className="btn btn-main mt-3 btn-block" disabled={isLoading}>{isLoading ? 'Loading...' : 'Register'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;