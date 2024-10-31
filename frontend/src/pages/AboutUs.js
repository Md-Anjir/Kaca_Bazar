import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

function AboutUs() {
  return (
    <>
      <Header />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "35px", fontWeight: "bold" , backgroundColor: "#e2f8c5", padding: "8px"}}>About Us</h1>

        <p>
          Welcome to <strong style={{ fontSize: "20px", fontWeight: "bold", color: "green"}}>Kaca Bazar</strong>! We are an online marketplace
          created with a vision to connect local farmers directly to customers
          who are looking for fresh, high-quality agricultural products.
        </p>

        <h2>Our Mission</h2>
        <p>
          At Kaca Bazar, our mission is to empower farmers by providing them
          with a platform where they can sell their produce directly to
          customers. We aim to create a transparent marketplace that supports
          local agriculture, reduces food miles, and ensures that consumers get
          access to the freshest products at fair prices.
        </p>
        <br></br>

        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "red"}}>What We Offer?</h2>
        <p>
          Our platform allows farmers to create accounts and list their products
          for sale. Customers can browse through a wide range of agricultural
          products, from fruits and vegetables to grains and dairy. With easy
          online ordering and secure payment options, Kaca Bazar offers a
          seamless shopping experience for both buyers and sellers.
        </p>
        <br></br>

        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "red"}}>Why Choose Kaca Bazar?</h2>
        <p>
          <ul>
            <li style={{ padding: "5px"}}><strong>Fresh from the Farm:</strong> Get products directly from local farmers, ensuring maximum freshness and quality.</li>
            <li style={{ padding: "5px"}}><strong>Empowering Farmers:</strong> We provide farmers with a fair and transparent platform to sell their goods and grow their businesses.</li>
            <li style={{ padding: "5px"}}><strong>Sustainability:</strong> By supporting local agriculture, we help reduce the environmental impact of long supply chains.</li>
            <li style={{ padding: "5px"}}><strong>Community Focused:</strong> We are committed to building a strong community of farmers and consumers who value high-quality, locally-produced goods.</li>
          </ul>
        </p>
        <br></br>

        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "red"}}>Our Values</h2>
        <p>
          <ul>
            <li style={{ padding: "5px"}}><strong>Integrity:</strong> We believe in honesty and fairness in all our transactions.</li>
            <li style={{ padding: "5px"}}><strong>Quality:</strong> We ensure that all products sold through our platform meet the highest standards of quality and freshness.</li>
            <li style={{ padding: "5px"}}><strong>Transparency:</strong> We strive to provide clear and accurate information to both farmers and consumers.</li>
            <li style={{ padding: "5px"}}><strong>Innovation:</strong> We embrace technology to create new opportunities and solutions for the agricultural community.</li>
          </ul>
        </p>
        <br></br>

        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "blue", cursor: "pointer"}} onClick={() => (window.location.href = "/contact")}>Contact Us</h2>
        <p>
          If you have any questions, concerns, or feedback, we’d love to hear
          from you. Please feel free to reach out to our team at{" "}
          <a href="mailto:support@kacabazar.com">support@kacabazar.com</a>.
        </p>
        <br></br>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
