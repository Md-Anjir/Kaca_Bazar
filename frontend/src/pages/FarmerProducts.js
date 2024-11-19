import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SellerHeader from "../component/SellerHeader";
import Footer from "../component/Footer";

// Utility function to format date to YYYY-MM-DD
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

const FarmerProducts = () => {
  const { farmerId } = useParams(); // Updated to farmerId
  const [products, setProducts] = useState([]);
  const [farmerName, setFarmerName] = useState(""); // State for farmer name
  const [phoneNumber, setPhoneNumber] = useState(""); // State for farmer's phone number
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFarmerProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/seller/farmer-products/${farmerId}` // Updated endpoint
        );
        if (response.data.length === 0) {
          setMessage(`No products available from farmer with ID: ${farmerId}.`);
        } else {
          setMessage("");
          setProducts(response.data);
          setFarmerName(response.data[0].Farmer_Name); // Set farmer name
          setPhoneNumber(response.data[0].Phone_Number); // Set farmer phone number
        }
      } catch (error) {
        console.error("Error fetching farmer's products:", error);
        setMessage(
          `Error loading products for farmer with ID: ${farmerId}. Please try again later.`
        );
      }
    };

    fetchFarmerProducts();
  }, [farmerId]);

  return (
    <>
      <SellerHeader />
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="border rounded-lg items-center bg-green-500 p-5">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl text-center">
              {farmerName}'s Products {/* Display the farmer's name */}
            </h2>
            {phoneNumber && (
              <p className="text-center text-gray-700 mt-2">
                Contact: <a href={`tel:${phoneNumber}`} className="text-blue-500 underline">{phoneNumber}</a>
              </p>
            )}
            {message && (
              <p className="text-center text-red-500 font-semibold mt-6">
                {message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {products.map((product) => (
              <div
                key={product.Farmer_Product_Ad_ID} // Updated to Farmer_Product_Ad_ID
                className="product-card bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  className="w-full h-36 object-cover"
                  src={product.Picture_URL || "https://via.placeholder.com/150"}
                  alt={product.Product_Name}
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold">
                    {product.Product_Name}
                  </h3>
                  <p className="text-gray-600 mb-2 text-sm">{`Price: $${product.Unit_Price} per ${product.Unit_Name}`}</p>
                  <p className="text-gray-600 mb-2 text-sm">{`Minimum Order Quantity: ${product.Minimum_Order_Quantity}`}</p>
                  <p className="text-gray-600 mb-2 text-sm">{`Delivery Date: ${formatDate(product.Delivery_Date)}`}</p>
                  <p className="text-gray-600 mb-2 text-sm">
                    {product.Description}
                  </p>
                  <a
                    href={`tel:${product.Phone_Number}`}
                    style={{
                      display: "block",
                      padding: "0.5rem 1rem",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      backgroundColor: "#10b981",
                      color: "#fff",
                      borderRadius: "16px",
                      textAlign: "center",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Call Farmer
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FarmerProducts;
