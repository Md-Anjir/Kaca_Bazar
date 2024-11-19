import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SellerHeader from "../component/SellerHeader";
import Footer from "../component/Footer";
import GifComponent from "../component/gif";

function SellerHomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const sellertoken = localStorage.getItem("sellertoken");
    if (!sellertoken) {
      navigate("/sellerlogin");
    }
  }, [navigate]);

  return (
    <>
      <SellerHeader />
      <GifComponent />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <h1
          className="font-bold text-4xl"
          style={{ textAlign: "center", marginBottom: "20px", color: "green" }}
        >
          Seller Dashboard
        </h1>

        <section style={{ display: "flex", justifyContent: "space-around", marginBottom: "40px" }}>
          {/* Seller Previous Ad Button */}
          <div style={{ textAlign: "center" }}>
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
              onClick={() => navigate("/seller/previous-ad")}
            >
              Go to Previous Ads
            </button>
          </div>

          {/* Seller Product Ad Button */}
          <div style={{ textAlign: "center" }}>
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
              onClick={() => navigate("/seller/product-ad")}
            >
              Go to Product Ads
            </button>
          </div>

          {/* Buy from Farmers Button */}
          <div style={{ textAlign: "center" }}>
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
              onClick={() => navigate("/seller/buy-from-farmers")}
            >
              Buy Products from Farmers
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default SellerHomePage;
