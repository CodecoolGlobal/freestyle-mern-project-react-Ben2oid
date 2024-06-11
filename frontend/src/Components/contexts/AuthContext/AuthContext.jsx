import { createContext, useEffect, useState } from "react";
//Everything related to authentication and the authentication state management is found here!

export const AuthContext = createContext({
  user: null,
  token: null,
  authoriseUser: () => null,
  logout: () => null,
  isItLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isItLoggedIn, setIsItLoggedIn] = useState(false);

  useEffect(() => {
    //For testing
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    console.log("token", storedToken);
    console.log("user", storedUser);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsItLoggedIn(true);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    setIsItLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsItLoggedIn(false);
  };

  const authoriseUser = async (endpoint, formFields) => {
    try {
      const response = await fetch(`/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFields),
      });
      if (!response.ok) {
        console.error("Fail:", data.message);
        //we will send back an error, for example username is occupied!
        return { ok: false, message: data.message, errors: data.errors || {} };
      }

      const data = await response.json();
      console.log("data received", data);
      login(data.token, data.user);
      console.log("Success:", data.token);
      console.log("user", data.user);
      return { ok: true };
    } catch (error) {
      console.error("Error:", error);
      return {
        ok: false,
        message: "Something is not right, I can feel it... ,",
        errors: {},
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isItLoggedIn, logout, authoriseUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
