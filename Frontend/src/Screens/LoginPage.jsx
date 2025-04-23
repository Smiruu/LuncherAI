import React, { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../Components/Input";
import "./css/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = false;

  const handleLogin = (e) => {
    e.preventDefault();
    // Add logic later
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? <Loader size={20} className="animate-spin" /> : "Login"}
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
