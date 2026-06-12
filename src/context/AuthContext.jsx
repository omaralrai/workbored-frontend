import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../api/client';

const AuthContext = createContext(null);

const STORAGE_KEY = 'workbored_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    setUser(data.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
    return data.user;
  };

  const register = async ({ email, password, role, full_name }) => {
    const data = await registerUser({ email, password, role, full_name });
    setUser(data.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
    return data.user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
