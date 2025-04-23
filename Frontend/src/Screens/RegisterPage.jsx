import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { User, Mail, Lock, Loader } from "lucide-react";
import PasswordStrength from "../Components/PasswordStrength";
import './css/RegisterPage.css';
import { useAuthStore } from "../Store/authStore";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async(e) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="Container">
        <div className="Logo Card">
          <h1>LuncherAI</h1>
        </div>
        <div className="Sign-up Card">
          <h2>Create Account</h2>
          <form onSubmit={handleSignUp}>
            <Input
              icon={User}
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              icon={Mail}
              type="text"
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
            {error && <p>{error}</p>}
            <PasswordStrength password={password} />
            <button className="SubmitButton" type="submit" disabled={isLoading}>
              {isLoading ? <Loader/> : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    
      <div className="LoginSection">
        <p className="LoginText">
          Already have an account?{" "}
          <Link to={"/login"}>Log In</Link>
        </p>
      </div>
    </>
  );
}

export default RegisterPage;
