import React from "react";
import "./About.css"; // Importing specific styles for About component

function About() {
  return (
    <div className="about-container">
      <h2>About This Application</h2>
      <p>
        This is a simple and interactive Counter application built with React, designed to help you track and manage a count value. The app allows you to perform basic counter operations such as incrementing, decrementing, and resetting the count value. 
      </p>
      <p>
        The <b>key features</b> of this application include:
      </p>
      <ul>
        <li>
          <strong>Increment and Decrement:</strong> You can easily increase or decrease the counter with the provided buttons.
        </li>
        <li>
          <strong>Reset:</strong> The reset button allows you to set the counter back to zero.
        </li>
        <li>
          <strong>History Tracking:</strong> The History page displays a record of the number of increments, decrements, and resets that have occurred during the session.
        </li>
        <li>
          <strong>State Management with Context:</strong> The app utilizes React's Context API and custom hooks to share state between components and manage the counter's value.
        </li>
        <li>
          <strong>Routing:</strong> React Router is used to navigate between different views including the Home, About, and History pages.
        </li>
        <li>
          <strong>Accessibility:</strong> The app has been designed with accessibility in mind, including ARIA roles and attributes for better screen reader support.
        </li>
      </ul>
      <p>
        This application is a demonstration of the core React concepts including hooks, routing, state management, and component composition. It’s a great starting point for learning how to build interactive React apps with modern best practices.
      </p>
    </div>
  );
}

export default About;
