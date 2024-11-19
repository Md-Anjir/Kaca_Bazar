import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FarmerHeader from "../component/FarmerHeader";
import Footer from "../component/Footer";
import GifComponent from "../component/gif";

function FarmerHomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the farmer is logged in by looking for a farmertoken or login status
    const farmertoken = localStorage.getItem("farmertoken");
    if (!farmertoken) {
      // If no farmertoken, redirect to login
      navigate("/farmerlogin");
    }
  }, [navigate]);

  return (
    <>
      <FarmerHeader />
      <GifComponent />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <h1
          className="font-bold text-4xl"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "green",
          }}
        >
          Farmer Dashboard
        </h1>

        {/* Overview Section */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              color: "green",
              borderBottom: "2px solid green",
              paddingBottom: "10px",
            }}
          >
            Welcome, [Farmer Name]
          </h2>
          <p style={{ fontSize: "16px" }}>
            Welcome to your farmer dashboard. Here, you can manage your
            products, view your sales, respond to customer inquiries, and update
            your account information. Use the options below to navigate your
            dashboard and stay updated with your business on Kaca Bazar.
          </p>
        </section>

        {/* Action Buttons for Farmer Pages */}
        <section
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "40px",
          }}
        >
          {/* Previous Ads */}
          <div
            style={{
              border: "2px solid green",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              width: "30%",
            }}
          >
            <h3 style={{ color: "green", marginBottom: "10px" }}>
              Previous Ads
            </h3>
            <p>Check and manage your previous advertisements.</p>
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                margin: "7px",
              }}
              onClick={() => navigate("/farmer/previous-ad")}
            >
              Go to Previous Ads
            </button>
          </div>

          {/* Product Ads */}
          <div
            style={{
              border: "2px solid green",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              width: "30%",
            }}
          >
            <h3 style={{ color: "green", marginBottom: "10px" }}>
              Product Ads
            </h3>
            <p>Create your product advertisements.</p>
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                margin: "7px",
              }}
              onClick={() => navigate("/farmer/product-ad")}
            >
              Go to Product Ads
            </button>
          </div>
        </section>

        {/* Support Section */}
        <section>
          <h2
            style={{
              color: "green",
              borderBottom: "2px solid green",
              paddingBottom: "10px",
            }}
          >
            Need Help?
          </h2>
          <p style={{ fontSize: "16px" }}>
            If you have any questions or need assistance, please contact our
            support team at{" "}
            <a href="mailto:support@kacabazar.com" style={{ color: "green" }}>
              support@kacabazar.com
            </a>
            .
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default FarmerHomePage;
