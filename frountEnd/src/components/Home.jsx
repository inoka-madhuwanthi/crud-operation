import React, { useState } from 'react';
import './style.css';

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Admin Dashboard!</h1>
        <p>This dashboard allows you to efficiently manage all users in the system.</p>
        <button className="popup-toggle" onClick={togglePopup}>See what you can do</button>
        {isPopupOpen && (
          <div className="popup">
            <ul>
              <li>Add new users</li>
              <li>Edit existing user profiles</li>
              <li>Delete users if needed</li>
              <li>View detailed user information</li>
            </ul>
            <button className="close-popup" onClick={togglePopup}>Close</button>
          </div>
        )}
      </div>
      <img className="homescreen" src={"https://live.staticflickr.com/1167/1388140691_ba35f8c9fb_b.jpg"} alt="Home" />
    </div>
  );
};

export default Home;
