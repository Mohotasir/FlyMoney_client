import  { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken); 
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token'); 
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setUser(decodedToken); // Set the decoded token payload as user state
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };