import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({
    isStudent: true,
    isAuthenticated: null,
    loginHandler: () => {},
    logoutHandler: () => {}
});

const AuthContextProvider = (props) => {
    const alreadyAuthenticated = localStorage.getItem('token');
    if(alreadyAuthenticated) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${alreadyAuthenticated}`;
    }
    const [isAuthenticated, setIsAuthenticated] = useState(!(!(alreadyAuthenticated)));
    const [isStudent, setIsStudent] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if(token && role) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
            setIsStudent(role === 'student');
        } else if(token || role) {
            logoutHandler();
        }
    }, []);

    const loginHandler = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role.toLowerCase());
        if(role.toLowerCase() === 'professor') {
            setIsStudent(false);
        } else {
            setIsStudent(true);
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
    }

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        delete axios.defaults.headers.common['Authorization'];
        setIsStudent(true);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            loginHandler,
            logoutHandler,
            isStudent,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };
export default AuthContext;
