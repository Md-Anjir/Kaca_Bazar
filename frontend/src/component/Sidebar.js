import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarStyle = {
    position: "fixed",
    top: "70px", // Adjust based on header height
    left: isOpen ? 0 : "-250px", // Sidebar hidden by default
    width: "250px",
    height: "100%",
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px",
    transition: "left 0.3s ease",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Align items at the start
  };

  const firstComponentStyle = {
    marginBottom: "50px", // Adjust the space as needed
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
    display: isOpen ? "block" : "none",
  };

  const buttonStyle = {
    position: "fixed",
    top: "55px", // Button will show after the header (adjust header height accordingly)
    left: isOpen ? "210px" : "10px", // Move button inside the sidebar when it's open
    padding: "10px 20px",
    backgroundColor: "transparent", // Make background transparent
    color: "blue",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: isOpen ? 1101 : 1100, // Keep button above sidebar
    transition: "left 0.3s ease",
    fontSize: "28px",
  };

  const listItemStyle = {
    backgroundColor: "#444", // Background color for list items
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px", // Space between list items
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button style={buttonStyle} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={firstComponentStyle}>
          <h1 style={{fontSize: "18px", backgroundColor: "green", padding: "10px", marginBottom: "10px"}}>Product Categories</h1>
          <ul>
            <li style={listItemStyle}>
              <a
                href="/electronics"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Electronics
              </a>
            </li>
            <li style={listItemStyle}>
              <a
                href="/clothing"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Clothing
              </a>
            </li>
            <li style={listItemStyle}>
              <a href="/home" style={{ color: "#fff", textDecoration: "none" }}>
                Home & Furniture
              </a>
            </li>
            <li style={listItemStyle}>
              <a href="/toys" style={{ color: "#fff", textDecoration: "none" }}>
                Toys
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 style={{fontSize: "18px", backgroundColor: "green", padding: "10px", marginBottom: "10px"}}>Filters</h3>
          <ul>
            <li style={listItemStyle}>
              <a
                href="/price-low-to-high"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Price: Low to High
              </a>
            </li>
            <li style={listItemStyle}>
              <a
                href="/price-high-to-low"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Price: High to Low
              </a>
            </li>
            <li style={listItemStyle}>
              <a
                href="/customer-ratings"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Customer Ratings
              </a>
            </li>
            <li style={listItemStyle}>
              <a
                href="/new-arrivals"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                New Arrivals
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      <div style={overlayStyle} onClick={toggleSidebar}></div>
    </>
  );
};

export default Sidebar;
