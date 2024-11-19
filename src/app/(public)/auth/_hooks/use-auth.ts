import { useState } from "react";

interface User {
  email: string;
  password: string;
}

const useAuth = () => {
  const storedUser: User | null = JSON.parse(
    localStorage.getItem("user") || "null"
  );
  const [user, setUser] = useState<User | null>(storedUser);

  //sign up
  const signUp = (email: string, password: string) => {
    const newUser: User = { email, password };
    localStorage.setItem("user", JSON.stringify(newUser)); // Simpan ke localStorage
    setUser(newUser); // Set state user
  };

  // sign in
  const signIn = (email: string, password: string) => {
    const storedUser: User | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setUser(storedUser);
    } else {
      console.error("Email atau password salah");
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("user"); // Hapus user dari localStorage
    setUser(null);
  };

  return {
    user,
    signUp,
    signIn,
    logout,
  };
};

export default useAuth;
