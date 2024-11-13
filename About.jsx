import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';


const About = () => {
  return (
    <div className="about-background">
      <nav className="nav">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/manage" className="nav-link">Manage</Link>
        </nav>
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to our Accounting System! Our platform is designed to help you
          manage your finances with ease and efficiency. Whether you're a small
          business owner, freelancer, or just someone who wants to keep track of
          your personal finances, we've got you covered.
        </p>
        <p>
          Our mission is to simplify financial management by providing a
          comprehensive, user-friendly tool that caters to all your accounting
          needs. From invoicing and expense tracking to detailed financial reports
          and tax filing, our system is built to help you stay on top of your
          financial game.
        </p>
        <p>
          We are committed to providing the best possible experience to our users
          and continuously improving our platform. Thank you for choosing our
          accounting system!
        </p>
      </div>
    </div>
  );
};

export default About;
