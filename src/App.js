import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landingpage";
import Careers from "./components/Careers";
import Footer from "./components/Footer";
import Application from "./components/Application";
import ErrorPage from "./components/Errorpage"; // Import the ErrorPage component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/Application" element={<Application />} />
          {/* Catch-all Route for handling undefined paths */}
          <Route path="*" element={<ErrorPage errorType="notFound" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
