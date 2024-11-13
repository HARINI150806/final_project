import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-background">
      <nav className="navbar">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/manage" className="nav-link">Manage</Link>
      </nav>
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>If you have any questions, suggestions, or need support, we're here to help!</p>

        <h2>Support</h2>
        <p>Email: support@accountingsystem.com</p>
        <p>Phone: +1 (123) 456-7890</p>

        <h2>Address</h2>
        <p>123 Finance Street</p>
        <p>Accounting City, AC 12345</p>

        <h2>Business Hours</h2>
        <p>Monday to Friday: 9:00 AM - 6:00 PM</p>
        <p>Saturday: 10:00 AM - 4:00 PM</p>
        <p>Sunday: Closed</p>

        <h2>Follow Us</h2>
        <p>Stay connected with us on social media:</p>
        <ul>
          <li><a href="#facebook">Facebook</a></li>
          <li><a href="#twitter">Twitter</a></li>
          <li><a href="#linkedin">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
