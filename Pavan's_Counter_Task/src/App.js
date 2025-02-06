import React from "react"; // Import the React library for building components.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router for handling navigation between pages.
import Header from "./components/Header"; // Import the Header component for the navigation bar.
import Footer from "./components/Footer"; // Import the Footer component for the footer section.
import Counter from "./components/Counter"; // Import the Counter component for the main counter functionality.
import About from "./components/About"; // Import the About component for the About page.
import History from "./components/History"; // Import the History component to display history stats.
import { CounterProvider } from "./contexts/CounterContext"; // Import CounterProvider to provide the context to the entire app.
import "./App.css"; // Import the global CSS styles for the app.

function App() {
  return (
    // Wrap the entire app inside CounterProvider to provide global state/context for the counter.
    <CounterProvider>

      {/* Wrap the app with Router to enable routing/navigation between pages */}
      <Router>

        <div className="app">

          {/* Header component appears at the top of all pages, containing navigation links */}
          <Header /> 
          
          {/* Main content section where specific components/pages will be rendered */}
          <main className="content">
              {/* Define application routes using <Routes> and <Route> */}
              <Routes>

                {/* Route for the Counter component, rendered at the root path ("/") */}
                <Route path="/" element={<Counter />} /> 
                
                {/* Route for the About page */}
                <Route path="/about" element={<About />} /> 
                
                {/* Route for the History page */}
                <Route path="/history" element={<History />} /> 
                
              </Routes>
          </main>
          
          {/* Footer component appears at the bottom of all pages */}
          <Footer /> 
          
        </div>
      </Router>
    </CounterProvider>
  );
}

export default App; // Export the App component as the default export so it can be used in index.js.
