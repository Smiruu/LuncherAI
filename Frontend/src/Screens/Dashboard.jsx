import React from "react";
import { useAuthStore } from "../Store/authStore"; // Importing the useAuthStore hook
import "./css/Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // Calls the logout function from the store
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to LuncherAI 🍱</h1>
        <p>Your smart lunchbox assistant</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Logout button */}
      </header>
      <main className="dashboard-main">
        <section className="dashboard-card">
          <h2>Today's Menu</h2>
          <p>Chicken Teriyaki, Rice, and Steamed Veggies</p>
        </section>
        <section className="dashboard-card">
          <h2>Temperature Status</h2>
          <p>Maintaining at 65°C</p>
        </section>
        <section className="dashboard-card">
          <h2>Battery Level</h2>
          <p>85% - Fully Functional</p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
