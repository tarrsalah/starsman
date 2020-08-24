import React, {createContext, useState, useEffect, useContext} from "react";

const AuthContext = createContext();

function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function login() {
      let options = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      };

      try {
        let response = await fetch("http://localhost:3000/api/user", options);
        let user = await response.json();
        setUser(user);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }

    login();
  }, []);

  let auth = {user, isLoading, error};
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export {AuthProvider, useAuth};
