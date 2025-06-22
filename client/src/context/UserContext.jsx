// context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const local = localStorage.getItem("bugtracker-user");
    return local ? JSON.parse(local) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("bugtracker-user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bugtracker-user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
