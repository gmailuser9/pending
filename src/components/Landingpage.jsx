import React, { useEffect, useState, useRef } from "react";
import videoSrc from "./data/home_video.mp4";
import image1 from "./data/image1.png";
import Logo from "./data/Logo.png";
import Mainpage from "./data/Mainpage.png";
import Projectflow from "./data/Project-flow.png";
import projects from "./projects.json";
import web from "./data/web.png";
import App from "./data/App.png";
import Marketing from "./data/marketing.png";
import Socialmedia from "./data/social-media.png";
import Bot from "./data/bot.png";
import Grafhic from "./data/grafic.png";
import Seo from "./data/seo.png";
import Software from "./data/software-dev.png";
import Uiux from "./data/uiux.png";
import Analytics from "./data/analytics.png";
import datascraping from "./data/data-scraping.png";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { ref, push } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Anon from "./data/Anon.png";
import Loruki from "./data/Loruki.jpg";
import Restarent from "./data/Restarent.jpg";

const images = {
  Anon,
  Loruki,
  Restarent,
};
function Landingpage() {
  const serviceCardsRef = useRef(null);
  const scrollInterval = useRef(null);

  const scrollLeft = () => {
    if (serviceCardsRef.current) {
      serviceCardsRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
      resetAutoScroll(); // Reset auto-scroll when manually scrolled
    }
  };

  const scrollRight = () => {
    if (serviceCardsRef.current) {
      serviceCardsRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
      resetAutoScroll(); // Reset auto-scroll when manually scrolled
    }
  };
  useEffect(() => {
    startAutoScroll();

    const handleTouchStart = () => clearInterval(scrollInterval.current);
    const handleTouchEnd = () => resetAutoScroll();

    const element = serviceCardsRef.current;

    if (element) {
      element.addEventListener("touchstart", handleTouchStart);
      element.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      clearInterval(scrollInterval.current);
      if (element) {
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  const [showAll, setShowAll] = useState(false);

  // Toggle between showing all projects or only the first 3
  const toggleProjects = () => {
    setShowAll((prevState) => !prevState);
  };

  const startAutoScroll = () => {
    scrollInterval.current = setInterval(() => {
      if (serviceCardsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          serviceCardsRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          // Loop back to the start
          serviceCardsRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          serviceCardsRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 2500); // Adjust the interval (ms) as needed
  };

  const resetAutoScroll = () => {
    clearInterval(scrollInterval.current);
    startAutoScroll();
  };

  useEffect(() => {
    startAutoScroll();

    return () => {
      clearInterval(scrollInterval.current); // Cleanup interval on unmount
    };
  }, []);

  const Counter = ({ end, duration }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const stepTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 1;
        if (start > end) {
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }, [end, duration]);

    return <span>{count}</span>;
  };
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer custom Website development and custom Mobile Application development to suit your specific need.",
    },
    {
      question: "How can I contact you?",
      answer:
        "You can contact us via email, phone, or the contact form on our website.",
    },
    {
      question: "How long will you take to complete the project?",
      answer:
        "The project timeline depends on its scope and requirements. We’ll provide an estimate during consultation.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // contact form

  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    countryCode: "+91",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save data to Firebase Realtime Database
      const clientRef = ref(db, "client");
      await push(clientRef, {
        ...contactData,
        submittedAt: new Date().toISOString(),
      });

      setPopupMessage("Message sent successfully!");
      setShowPopup(true);

      setContactData({
        name: "",
        phone: "",
        countryCode: "+91",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting message:", error);
      setPopupMessage("Failed to send message. Please try again.");
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button
              className="close-button"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
      {/* Header Section */}
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
                  <Link to="/Careers">
                    <a>Careers</a>
                  </Link>
                  <a href="#contact">Contact us</a>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Video Section */}
      <section className="video-section">
        <video autoPlay loop muted className="background-video">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay-content">
          <img src={Mainpage} alt="text" />
        </div>
      </section>

      {/* Technology Solutions Section */}
      <section className="technology-solutions">
        <div className="technology-solutions-12">
          <div className="technology-solutions1">
            <h1>IT SOLUTIONS</h1>
            <p>
              We leverage the full breadth of advanced IT services and expert
              business consulting tailored specifically for the healthcare
              industry, driving innovation and optimizing processes to enhance
              patient outcomes, streamline operations, and elevate
              overall care quality.
            </p>
          </div>
          <div className="technology-solutions2">
            <img src={image1} alt="image" />
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="sec-services">
        <h1>WE PROVIDE</h1>
        <div className="scroll-card">
          <button className="scroll-button left" onClick={scrollLeft}>
            &#8249;
          </button>
          <div className="service-cards" ref={serviceCardsRef}>
            <div className="card">
              <div className="card-img">
                <img src={web} alt="img" />
              </div>
              <div>
                <h3>Web Development</h3>
                <p>Expert consulting for healthcare organizations.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-img">
                <img src={App} alt="img" />
              </div>
              <div>
                <h3>App Development</h3>
                <p>Customized IT solutions tailored to your needs.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-img">
                <img src={Marketing} alt="img" />
              </div>
              <div>
                <h3>Marketing</h3>
                <p>We built personalized AI chatbots.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-img">
                <img src={Socialmedia} alt="img" />
              </div>
              <div>
                <h3>Social Media Management</h3>
                <p>Streamline operations for maximum efficiency.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-img">
                <img src={Bot} alt="img" />
              </div>
              <div>
                <h3>Custom Bots</h3>
                <p>Streamline operations for maximum efficiency.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-img">
                <img src={Grafhic} alt="img" />
              </div>
              <div>
                <h3>Graphic Design</h3>
                <p>Streamline operations for maximum efficiency.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-img">
                <img src={Seo} alt="img" />
              </div>
              <div>
                <h3>SEO & SEM</h3>
                <p>Streamline operations for maximum efficiency.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-img">
                <img src={Software} alt="img" />
              </div>
              <div>
                <h3>Software Development</h3>
                <p>Streamline operations for maximum efficiency.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-img">
                <img src={Uiux} alt="img" />
              </div>
              <div>
                <h3>UI/UX Design</h3>
                <p>Streamline operations for maximum efficiency.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-img">
                <img src={Analytics} alt="img" />
              </div>
              <div>
                <h3> Data Analytics</h3>
                <p>Streamline operations for maximum efficiency.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-img">
                <img src={datascraping} alt="img" />
              </div>
              <div>
                <h3>Data Scrapping</h3>
                <p>Streamline operations for maximum efficiency.</p>
              </div>
            </div>
          </div>
          <button className="scroll-button right" onClick={scrollRight}>
            &#8250;
          </button>
        </div>
      </section>

      {/* Partners Section */}
      <section className="sec-flow">
        <div>
          <h1>Work Flow</h1>
        </div>
        <div className="partner-logos">
          <img src={Projectflow} alt="image" />
        </div>
      </section>

      {/* Project Count Section */}
      <section className="sec-project-count">
        <div ref={sectionRef} className="stats-section">
          <h2>Building Relationships With Clients All Over The World!</h2>
          <div className="stats-container">
            {isVisible && (
              <>
                <div className="stat-item">
                  <h1>
                    <Counter end={10} duration={1000} />
                  </h1>
                  <p>Projects Completed till 2024</p>
                </div>
                <div className="stat-item">
                  <h1>
                    <Counter end={8} duration={1000} />
                  </h1>
                  <p>Satisfied clients across the globe</p>
                </div>
                <div className="stat-item">
                  <h1>
                    <Counter end={2} duration={1000} />
                  </h1>
                  <p>Years Of Experience In The Industry</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Project list Section */}
      <section id="work" className="projects-section">
        <h2 className="section-title">Our Work</h2>
        <div className="projects-container">
          {(showAll ? projects : projects.slice(0, 3)).map((project, index) => (
            <div className="project-card" key={index}>
              <img
                src={images[project.image]}
                alt={project.title}
                className="project-image"
              />
              <div className="project-overlay">
                <div className="project-details">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p>
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="toggle-button" onClick={toggleProjects}>
          {showAll ? "Show Less" : "View More"}
        </button>
      </section>

      {/* contact form Section */}
      <section id="contact" className="sec-contact">
        <div className="contact-section">
          <div className="contact-form">
            <h2>Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={contactData.name}
                onChange={handleChange}
                required
              />
              <div className="phone-input">
                <select
                  name="countryCode"
                  value={contactData.countryCode}
                  onChange={handleChange}
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={contactData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                required
              />
              <textarea
                className="message-box"
                placeholder="Your Message"
                name="message"
                value={contactData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <div className="contact-info">
            <h2>Our Contact Information</h2>
            <p>
              <strong>Address:</strong> Hyderabad, India
            </p>
            <p>
              <strong>Phone:</strong> +91 9346011959
            </p>
            <p>
              <strong>Email:</strong> contactelevix@gmail.com
            </p>
            <p>
              <strong>Follow us:</strong>
            </p>
            <div className="icons">
              <a
                href="https://www.linkedin.com/in/elevix-solutions-404863343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://www.instagram.com/elevixsolutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61571230323372&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Faq Section */}
      <section className="faq-sec">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-section">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                {faq.question}
                <span className="faq-icon">
                  {activeIndex === index ? "▲" : "▼"}
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Section Footer */}
      <section className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <a href="/">
              <img src={Logo} alt="Logo" className="footer-logo" />
            </a>
            <div className="icons">
              <a
                href="https://www.linkedin.com/in/elevix-solutions-404863343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://www.instagram.com/elevixsolutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61571230323372&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#work">Our Work</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
              <li>
                <a href="#contact">Contact us</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>
              <strong>Email :&nbsp;&nbsp;</strong>
              <a href="mailto:contactelevix@gmail.com">
                contactelevix@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone :&nbsp;</strong>
              <a href="tel:+919110326779">+91 9346011959</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landingpage;
