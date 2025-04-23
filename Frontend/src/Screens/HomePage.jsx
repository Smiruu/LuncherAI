import React from 'react';
import './css/HomePage.css'; // Make sure you link the CSS

function HomePage() {
  return (
    <div className="homepage">
      <div className="hero">
        <h1>Welcome to Smart Lunchbox</h1>
        <p>Your lunch, smarter!</p>
        <button className="login-button">Login</button>
      </div>

      <div className="features">
        <h2>Why choose Smart Lunchbox?</h2>
        <ul>
          <li>Keep your food fresh and warm.</li>
          <li>Track your meal's nutritional value.</li>
          <li>Get personalized meal suggestions.</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
