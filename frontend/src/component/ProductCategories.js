import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import eggImage from "../images/egg.png";
import fishImage from "../images/fish.png";
import chickenImage from "../images/chicken.png";
import fruitImage from "../images/fruit.png";
import vegetableImage from "../images/vegitable.png";
import riceImage from "../images/rice.png";
import meatImage from "../images/meat.png";
import spiceImage from "../images/spice.png";

const ProductCategories = () => {
  const [ads, setAds] = useState([]);
  const [visibleAds, setVisibleAds] = useState(15); // Initial visible ads count
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/buyer/product-ads");
        if (response.data.length === 0) {
          setMessage("No products available.");
        } else {
          setMessage("");
          setAds(response.data);
        }
      } catch (error) {
        console.error("Error fetching all product ads:", error);
        setMessage("Error loading products. Please try again later.");
      }
    };

    fetchAllProducts();
  }, []);

  const handleClick = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/buyer/seller-product-ads?category=${category}`
      );
      if (response.data.length === 0) {
        setMessage("No products available for this category.");
      } else {
        setMessage("");
      }
      setAds(response.data);
      setVisibleAds(15); // Reset to show only first 20 ads for new category
    } catch (error) {
      console.error("Error fetching product ads:", error);
      setMessage("Error loading products. Please try again later.");
    }
  };

  const handleSellerClick = (sellerId) => {
    navigate(`/seller/${sellerId}/products`);
  };

  const handleShowMore = () => {
    setVisibleAds((prev) => prev + 15);
  };

  return (
    <section style={{ padding: "3rem 1rem", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1rem" }}>
        <div style={{ maxWidth: "30rem", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>Our Product Categories</h2>
          <p style={{ marginTop: "1rem", fontSize: "1rem", color: "#666" }}>
            Discover our range of products sourced directly from farmers.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}>
          {[
            { name: "Egg", image: eggImage },
            { name: "Fish", image: fishImage },
            { name: "Chicken", image: chickenImage },
            { name: "Vegetables", image: vegetableImage },
            { name: "Fruits", image: fruitImage },
            { name: "Rice", image: riceImage },
            { name: "Meat", image: meatImage },
            { name: "Spice", image: spiceImage },
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => handleClick(item.name)}
              style={{
                cursor: "pointer",
                textAlign: "center",
                padding: "0.5rem",
              }}
            >
              <div style={{ overflow: "hidden", borderRadius: "8px" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "150px",
                    transition: "all 0.3s ease-in-out",
                    transform: "scale(1)",
                  }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#333", marginTop: "0.5rem" }}>
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {message && <p style={{ textAlign: "center", color: "red", fontWeight: "bold", marginTop: "1rem" }}>{message}</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        padding: "1rem",
        maxWidth: "80rem",
        margin: "2rem auto",
      }}>
        {ads.slice(0, visibleAds).map((ad) => (
          <div
            key={ad.Seller_Product_Ad_ID}
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <img
              src={ad.Picture_URL || "https://via.placeholder.com/150"}
              alt={ad.Product_Name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <div style={{ padding: "1rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "bold" }}>{ad.Product_Name}</h3>
              <p
                style={{ color: "#3b82f6", fontSize: "0.9rem", cursor: "pointer", marginTop: "0.5rem" }}
                onClick={() => handleSellerClick(ad.Seller_ID)}
              >
                {`Seller: ${ad.Seller_Name}`}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>{`Price: $${ad.Unit_Price} per ${ad.Unit_Name}`}</p>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>{`Stock: ${ad.Stock} available`}</p>
              <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>{ad.Description}</p>
              <button style={{
                padding: "0.5rem 1rem",
                fontSize: "0.8rem",
                fontWeight: "bold",
                backgroundColor: "#10b981",
                color: "#fff",
                borderRadius: "16px",
                cursor: "pointer",
                border: "none",
              }}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleAds < ads.length && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={handleShowMore}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#3b82f6",
              borderRadius: "24px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductCategories;
