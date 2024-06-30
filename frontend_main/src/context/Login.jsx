import React, { createContext, useState } from "react";

// Create a new context
const AuthContext = createContext();

// Create a provider component to wrap your app
const AuthProvider = ({ children }) => {
  // State for the login status
  const [login, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [projectId, setProjectId] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [joinAsPro, setJoinAsPro] = useState(false);
  const [staff, setStaff] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
        joinAsPro,
        setJoinAsPro,
        accessToken,
        setAccessToken,
        userDetails,
        setUserDetails,
        projectId,
        setProjectId,
        staff,
        setStaff,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
