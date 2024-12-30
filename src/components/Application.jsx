import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./data/Logo.png";
import { db } from "../firebaseConfig"; // Adjust path if necessary
import { ref, push } from "firebase/database";
import Loading from "./Loading";

const Application = () => {
  const location = useLocation();
  const [jobTitle, setJobTitle] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gender: "",
    languages: "",
    designation: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  // Extract job title from the query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jobTitleFromParams = params.get("jobTitle");
    if (jobTitleFromParams) {
      setJobTitle(decodeURIComponent(jobTitleFromParams));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (type === "file" && files.length > 0) {
      setUploadStatus(`Selected file: ${files[0].name}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions
    if (!formData.resume) {
      setPopupMessage("Please upload a resume before submitting.");
      setShowPopup(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Save form data to Firebase Realtime Database
      const applicationsRef = ref(db, "applications");
      await push(applicationsRef, {
        ...formData,
        jobTitle,
        resume: formData.resume ? formData.resume.name : null, // Save only the file name
        submittedAt: new Date().toISOString(),
      });

      // Send form data to backend for email service
      const emailFormData = new FormData();
      emailFormData.append("resume", formData.resume); // Ensure "resume" matches Multer's field name
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "resume") emailFormData.append(key, value);
      });

      const response = await fetch(
        "https://pending-oo5r.onrender.com/send-email",
        {
          method: "POST",
          body: emailFormData,
        }
      );

      if (response.ok) {
        setPopupMessage("Application submitted successfully!");
        setShowPopup(true);

        // Reset form data
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          gender: "",
          languages: "",
          designation: "",
          resume: null,
        });
        setUploadStatus("");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setPopupMessage("Error submitting application. Please try again.");
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
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
                  <Link to="/careers">
                    <a>Careers</a>
                  </Link>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {isSubmitting && <Loading />}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button
              className="close-button"
              onClick={() => setShowPopup(false)}
            >
              x
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="form"
        encType="multipart/form-data"
      >
        {jobTitle && <h2 className="title">Application for: {jobTitle}</h2>}

        <div className="field">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="field">
          <label>Languages Known</label>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="e.g., English, Hindi, Telugu"
          />
        </div>
        <div className="field">
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Enter Designation"
            required
          />
        </div>
        <div className="field1">
          <label>Resume</label>
          <input
            type="file"
            name="resume"
            className="file-upload"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            required
          />
          <p>{uploadStatus}</p>
          <p className="note">Accepted formats: PDF, DOC, DOCX</p>
        </div>
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default Application;
