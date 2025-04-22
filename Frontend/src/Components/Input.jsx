import React from "react";

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div style={styles.container}>
      <div style={styles.iconWrapper}>
        <Icon size={20} style={styles.icon} />
      </div>
      <input style={styles.input} {...props} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    padding: "10px 12px",
    borderRadius: "6px",
    marginBottom: "15px",
    backgroundColor: "#fff",
  },
  iconWrapper: {
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    color: "#888",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "transparent",
  },
};

export default Input;
