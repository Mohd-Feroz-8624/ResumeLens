// Frontend Auth Service - Use this in your React app
// Save as: src/services/authService.js

const API_BASE_URL = "http://localhost:3000/api/auth";

export const authService = {
  // Register new user
  async register(firstName, lastName, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },

  // Login user
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Get current user profile
  async getProfile() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      return data.user;
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  },

  // Verify if token is still valid
  async verifyToken() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/verify-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Token verification error:", error);
      return false;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Get stored user
  getStoredUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Get stored token
  getToken() {
    return localStorage.getItem("token");
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};

// Example usage in SignIn.jsx:
// const handleSignIn = async (email, password) => {
//   try {
//     const response = await authService.login(email, password);
//     console.log('Logged in:', response.user);
//     // Redirect to dashboard
//   } catch (error) {
//     console.error('Sign in failed:', error.message);
//   }
// };
