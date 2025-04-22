import React from "react";
import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    {
      label: "Contains a special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <div style={{ marginTop: "1rem" }}>
      {criteria.map((item) => (
        <div
          key={item.label}
          style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
        >
          {item.met ? (
            <Check color="green" size={16} style={{ marginRight: "6px" }} />
          ) : (
            <X color="red" size={16} style={{ marginRight: "6px" }} />
          )}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrength = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z\d]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 1) return "red";
    if (strength === 2) return "orange";
    if (strength === 3) return "blue";
    return "green";
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
        <span><strong>Password Strength:</strong></span>
        <span>{getStrengthText(strength)}</span>
      </div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            style={{
              width: "25px",
              height: "6px",
              borderRadius: "3px",
              marginRight: "5px",
              backgroundColor: index < strength ? getColor(strength) : "#ddd",
            }}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrength;
