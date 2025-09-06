import { createContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase.config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user with profile update
  const register = async (email, password, name, photoURL) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (name || photoURL) {
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || ""
      });
    }
    return result;
  };

  // Login user
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  //Server api
  const localServer= "http://localhost:3000"
  const vercelServer= "https://b11a12-server-side-rabbanictgbd.vercel.app"
  const serverApi= localServer
  // const serverApi= vercelServer

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, serverApi }}>
      {children}
    </AuthContext.Provider>
  );
}
