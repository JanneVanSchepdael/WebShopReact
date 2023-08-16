import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(user);
        setLoading(false);
    } , []);

    const setUser = (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        setLoading(false);
    }

    const logout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        toast.success('You are logged out.');
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout, loading}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };