import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Components/Input";
import { User, Mail, Lock } from "lucide-react";
import PasswordStrength from "../Components/PasswordStrength";
import './css/RegisterPage.css';

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
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
            <PasswordStrength password={password} />
            <button className="SubmitButton" type="submit">
              Sign Up
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
