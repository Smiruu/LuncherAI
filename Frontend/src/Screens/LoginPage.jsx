import React, { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../Components/Input";
import "./css/LoginPage.css";
import { useAuthStore } from "../Store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Link to="/forgot-password">
              Forgot your password? Bobo! click mo toh hays
            </Link>
          </div>
          {error && <p>{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              "Login"
            )}
          </button>
          <div>
            <p>
              Don't have an account? <Link to="/register">Click here!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
