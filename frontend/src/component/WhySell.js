import React, { useState, useEffect } from "react";
import farmer1 from "../images/farmer1.png";
import farmer2 from "../images/farmer2.png";
import farmer3 from "../images/farmer3.png";
const WhySell = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Function to detect window size and adjust the layout for mobile or desktop
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ padding: isMobile ? "20px" : "50px" }}>
      {/* Section: Why Sell on Kaca Bazar */}
      <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: isMobile ? "20px" : "40px", fontWeight: "bold"}}>
        Why Sell on Kaca Bazar?
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-around",
          marginBottom: "50px",
        }}
      >
        {[
          {
            title: "Reach",
            desc: "Millions of customers on Kaca Bazar",
            icon: "📦",
          },
          {
            title: "Free Registration",
            desc: "Account registration is free",
            icon: "✅",
          },
          {
            title: "Reliable Shipping",
            desc: "Hassle-free delivery",
            icon: "🚚",
          },
          {
            title: "Timely Payments",
            desc: "Funds are safely deposited",
            icon: "💸",
          },
          {
            title: "Marketing Tools",
            desc: "Advertise with marketing tools",
            icon: "📊",
          },
          {
            title: "Support & Training",
            desc: "Learn about ecommerce",
            icon: "🎓",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: isMobile ? "100%" : "120px",
              textAlign: "center",
              marginBottom: isMobile ? "20px" : "0",
            }}
          >
            <div style={{ fontSize: "40px" }}>{item.icon}</div>
            <h4>{item.title}</h4>
            <p style={{ fontSize: "14px" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Section: Testimonies */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-around",
          marginBottom: "50px",
        }}
      >
        {/* First Testimony */}
        <div
          style={{
            width: isMobile ? "100%" : "60%",
            marginBottom: isMobile ? "20px" : "0",
            padding: "20px",
                backgroundColor: "#f8f8f8",
                borderRadius: "8px"
          }}
        >
          <img
            src={farmer1} // Path to your first image
            alt="Testimony"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <p style={{ fontWeight: "bold", marginTop: "10px" }}>
            We cannot imagine doing business without Kaca Bazar now
          </p>
          <p>Ali Khemani, Fashion Distributor</p>
        </div>

        {/* Second and Third Testimonies */}
        <div
          style={{
            width: isMobile ? "100%" : "35%",
            
            // height: isMobile ? "100%" : "35px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {[
            {
              name: "Zaid Asghar",
              desc: "At just 16 years old, Zaid runs his own shop on Kaca Bazar. He is an inspiration to budding entrepreneurs.",
              image: farmer2, // Path to second image
            },
            {
              name: "Abdullah Bawa",
              desc: "Abdullah used to run a brick-and-mortar business, now seeing a boom after joining Kaca Bazar.",
              image: farmer3, // Path to third image
            },
          ].map((person, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                backgroundColor: "#f8f8f8",
                borderRadius: "8px",
              }}
            >
              <img
                src={person.image}
                alt={`${person.name}'s Testimony`}
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h4 style={{ marginBottom: "10px" }}>Testimony</h4>
              <h5>{person.name}</h5>
              <p>{person.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Section: 5 Simple Steps */}
      <h2 style={{ textAlign: "center", marginBottom: "40px",  fontSize: "25px", fontWeight: "bold"}}>
        5 Simple Steps to Start Selling
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-around",
        }}
      >
        {[
          { step: "Signup for Free", icon: "📝" },
          { step: "Add Profile Information", icon: "👤" },
          { step: "Add Address Information", icon: "🏡" },
          { step: "Add ID & Bank Information", icon: "💳" },
          { step: "List Products", icon: "📦" },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: isMobile ? "100%" : "120px",
              marginBottom: isMobile ? "20px" : "0",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>
              {item.icon}
            </div>
            <h4>{item.step}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhySell;
