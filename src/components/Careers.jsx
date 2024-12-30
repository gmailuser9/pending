import React from "react";
import jobs from "./internsips.json";
import { Link } from "react-router-dom";
import Logo from "./data/Logo.png";

function Careers() {
  return (
    <div className="careers-container">
      <header className="header">
        <div className="header-content">
          <div className="header-right-content">
            <div className="logo">
              <a href="/">
                <img src={Logo} alt="Logo" />
              </a>
            </div>
            <div className="header-right">
              <nav>
                <ul>
                  <Link to="/">
                    <a>Home</a>
                  </Link>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className="careers-page">
        <h1>Careers</h1>
        <h2>Join our team and help us build amazing solutions!</h2>
        <div className="job-listings">
          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <h2>{job.title}</h2>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>{job.description}</p>
              <Link
                to={`/application?jobTitle=${encodeURIComponent(job.title)}`}
              >
                <button type="submit">Apply Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Careers;
