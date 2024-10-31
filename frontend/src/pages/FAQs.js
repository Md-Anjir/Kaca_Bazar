import React, { useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import GifComponent from "../component/gif";
function FAQs() {
  // State to track the visibility of each section
  const [activeSection, setActiveSection] = useState("");

  // Function to toggle sections
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  return (
    <>
      <Header />
      <GifComponent/>
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "green" }}>FAQs</h1>

        {/* General Questions */}
        <h2
          onClick={() => toggleSection("general")}
          style={{
            color: "green",
            cursor: "pointer",
            borderBottom: "2px solid green",
            paddingBottom: "10px",
          }}
        >
          General Questions
        </h2>
        {activeSection === "general" && (
          <div>
            <h3 style={{ color: "green" }}>What is Kaca Bazar?</h3>
            <p>
              Kaca Bazar is an online marketplace where farmers can sell their agricultural
              products directly to customers.
            </p>

            <h3 style={{ color: "green" }}>Who can shop on Kaca Bazar?</h3>
            <p>
              Anyone looking to purchase high-quality agricultural products directly from
              farmers can shop on Kaca Bazar.
            </p>

            <h3 style={{ color: "green" }}>Who can sell on Kaca Bazar?</h3>
            <p>
              Any farmer or producer who grows or makes agricultural products can sell
              on Kaca Bazar.
            </p>
          </div>
        )}

        {/* For Buyers */}
        <h2
          onClick={() => toggleSection("buyers")}
          style={{
            color: "green",
            cursor: "pointer",
            borderBottom: "2px solid green",
            paddingBottom: "10px",
          }}
        >
          For Buyers
        </h2>
        {activeSection === "buyers" && (
          <div>
            <h3 style={{ color: "green" }}>How do I place an order?</h3>
            <p>
              Placing an order is simple! Browse our selection of products, add your
              desired items to the cart, and proceed to checkout.
            </p>

            <h3 style={{ color: "green" }}>What payment methods are accepted?</h3>
            <p>We accept various payment methods including credit/debit cards.</p>

            <h3 style={{ color: "green" }}>When will I receive my order?</h3>
            <p>
              Delivery times vary depending on the location of the farmer and your
              shipping address.
            </p>

            <h3 style={{ color: "green" }}>Can I track my order?</h3>
            <p>
              Yes, once your order is confirmed and shipped, you will receive a tracking
              number via email.
            </p>

            <h3 style={{ color: "green" }}>What is your return policy?</h3>
            <p>
              Due to the nature of agricultural products, we do not accept returns.
            </p>
          </div>
        )}

        {/* For Sellers */}
        <h2
          onClick={() => toggleSection("sellers")}
          style={{
            color: "green",
            cursor: "pointer",
            borderBottom: "2px solid green",
            paddingBottom: "10px",
          }}
        >
          For Sellers
        </h2>
        {activeSection === "sellers" && (
          <div>
            <h3 style={{ color: "green" }}>How do I become a seller?</h3>
            <p>
              Becoming a seller on Kaca Bazar is easy! Simply go to the seller registration
              page and fill out your details.
            </p>

            <h3 style={{ color: "green" }}>What can I sell on Kaca Bazar?</h3>
            <p>
              Kaca Bazar is a platform for agricultural products such as fruits,
              vegetables, grains, dairy, and more.
            </p>

            <h3 style={{ color: "green" }}>How do I manage my product listings?</h3>
            <p>
              Once registered, you’ll have access to a dashboard where you can manage
              your products.
            </p>

            <h3 style={{ color: "green" }}>How do I get paid?</h3>
            <p>
              Payments are securely processed and transferred to your account after
              a successful sale.
            </p>

            <h3 style={{ color: "green" }}>Is there any fee for selling on Kaca Bazar?</h3>
            <p>
              Creating a seller account and listing your products is free. However, a small
              commission is taken on each sale.
            </p>
          </div>
        )}

        {/* Support */}
        <h2
          onClick={() => toggleSection("support")}
          style={{
            color: "green",
            cursor: "pointer",
            borderBottom: "2px solid green",
            paddingBottom: "10px",
          }}
        >
          Support
        </h2>
        {activeSection === "support" && (
          <div>
            <h3 style={{ color: "green" }}>How do I contact customer support?</h3>
            <p>
              If you need help or have any questions, you can reach out to our support team
              by emailing us at <a href="mailto:support@kacabazar.com" style={{ color: "green" }}>support@kacabazar.com</a>.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default FAQs;
