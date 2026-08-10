import {  createContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    const login = useCallback((newToken, newUser) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/")
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ login, logout, user, token }}>
            { children }
        </AuthContext.Provider>
    )
};

export { AuthContext };
export default AuthProvider;

// work on homepage between dashboard and login according to token
// save token when login, transfer between back to front 