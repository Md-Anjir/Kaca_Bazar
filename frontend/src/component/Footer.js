import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px 0",
  };

  const footerContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 50px",
  };

  const footerSectionStyle = {
    flex: 1,
    margin: "0 20px",
  };

  const headingStyle = {
    marginBottom: "15px",
    fontSize: "18px",
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
  };

  const listItemStyle = {
    marginBottom: "10px",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
  };

  const socialLinksStyle = {
    display: "flex",
    gap: "15px",
  };

  const footerBottomStyle = {
    textAlign: "center",
    padding: "15px",
    backgroundColor: "#222",
    marginTop: "20px",
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyle}>
      <div style={footerContainerStyle}>
        <div style={footerSectionStyle}>
          <h4 style={headingStyle}>Company</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}><a href="/aboutus" style={linkStyle}>About Us</a></li>
            <li style={listItemStyle}><a href="/careers" style={linkStyle}>Careers</a></li>
            <li style={listItemStyle}><a href="/termsandconditions" style={linkStyle}>Terms & Conditions</a></li>
            <li style={listItemStyle}><a href="/press" style={linkStyle}>Press</a></li>
          </ul>
        </div>
        <div style={footerSectionStyle}>
          <h4 style={headingStyle}>Customer Service</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}><a href="/contact" style={linkStyle}>Contact Us</a></li>
            <li style={listItemStyle}><a href="/shipping" style={linkStyle}>Shipping Info</a></li>
            <li style={listItemStyle}><a href="/returns" style={linkStyle}>Returns & Exchanges</a></li>
            <li style={listItemStyle}><a href="/faqs" style={linkStyle}>FAQs</a></li>
          </ul>
        </div>
        <div style={footerSectionStyle}>
          <h4 style={headingStyle}>Follow Us</h4>
          <ul style={socialLinksStyle}>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div style={footerBottomStyle}>
        <p>&copy; {currentYear} Kaca Bazar. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
