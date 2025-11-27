// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Keep localStorage <-> context in sync
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("seeker_user");
      localStorage.removeItem("provider_user");
      localStorage.removeItem("seeker_register_response");
      localStorage.removeItem("provider_register_response");
    }
  }, [user]);

  useEffect(() => {
    // Listen for changes in other tabs
    const onStorage = (e) => {
      if (e.key === "user") {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      const res = await fetch(
        "https://novel-fresh-spaniel.ngrok-free.app/api/accounts/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!res.ok) {
        console.log(email, password);
        const err = await res.json();
        throw new Error(err.detail || "Login failed");
      }

      const data = await res.json();
      const storage = rememberMe ? localStorage : sessionStorage;

      // Store tokens
      storage.setItem("accessToken", data.access);
      storage.setItem("refreshToken", data.refresh);
      storage.setItem("rememberMe", JSON.stringify(rememberMe));

      // Set user with user_type from API response
      const loggedInUser = {
        username: email,
        full_name: data.user?.full_name || "",
        user_type: data.user?.user_type || "seeker", // Track user role
        ...data.user,
      };
      setUser(loggedInUser);
      storage.setItem("user", JSON.stringify(loggedInUser));

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    // Clear all auth-related items
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("seeker_user");
    localStorage.removeItem("provider_user");
    localStorage.removeItem("seeker_register_response");
    localStorage.removeItem("provider_register_response");
    localStorage.removeItem("is_subscribed");
    localStorage.removeItem("just_logged_in");
    localStorage.removeItem("rememberMe");

    // Clear sessionStorage as well
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("rememberMe");
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch(
        "https://novel-fresh-spaniel.ngrok-free.app/api/accounts/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: name,
            email: email,
            password: password,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        console.log("🚨 Register error response:", err);
        throw new Error(
          err.detail || Object.values(err).join(", ") || "Registration failed"
        );
      }

      console.log("✅ Registration successful, auto-logging in...");
      return await login(email, password, true);
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
