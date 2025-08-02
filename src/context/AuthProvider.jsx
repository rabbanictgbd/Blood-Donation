import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // Temporary role: change this to test (guest, donor, volunteer, admin)
  const [role, setRole] = useState("guest");
  const [user, setUser] = useState(null);

  const login = (mockUser, mockRole) => {
    setUser(mockUser);
    setRole(mockRole);
  };

  const logout = () => {
    setUser(null);
    setRole("guest");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
