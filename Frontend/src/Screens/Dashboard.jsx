import React from "react";
import "./css/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to LuncherAI 🍱</h1>
        <p>Your smart lunchbox assistant</p>
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
