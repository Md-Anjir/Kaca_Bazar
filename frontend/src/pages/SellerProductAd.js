import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerHeader from "../component/SellerHeader";
import Footer from "../component/Footer";

function SellerProductAd() {
  const [products, setProducts] = useState([]);
  const [selectedProductID, setSelectedProductID] = useState("");
  const [unitName, setUnitName] = useState("KG");
  const [unitPrice, setUnitPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const [pictureURL, setPictureURL] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Fetch product list on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sellertoken = localStorage.getItem("sellertoken");

    if (!sellertoken) {
      setMessage("Please log in to add a product.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/seller/product_ad",
        {
          Product_ID: selectedProductID,
          Unit_Name: unitName,
          Stock: stock,
          Unit_Price: unitPrice,
          Description: description,
          Picture_URL: pictureURL,
        },
        {
          headers: {
            Authorization: `Bearer ${sellertoken}`,
          },
        }
      );

      if (response.status === 201) {
        // Check for created response status
        setMessage("Product Ads Added Successfully!");
        setMessageType("success");
        // Clear form fields
        setSelectedProductID("");
        setUnitName("KG");
        setStock(""); // Corrected this line
        setUnitPrice("");
        setDescription("");
        setPictureURL("");
      } else {
        setMessage("Failed to add product ad.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error adding product ad:", error);
      setMessage(
        "An error occurred while adding the product ad. Please try again."
      );
      setMessageType("error");
    }
  };

  // Clear message after 10 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 10000); // Adjusted to 10 seconds
      return () => clearTimeout(timer); // Cleanup
    }
  }, [message]);

  return (
    <>
    <SellerHeader/>
    <div className="max-w-lg mx-auto p-5 bg-green-200 rounded-lg shadow-md bg-green-200 m-10">
      <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
        Add New Product Ad
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Dropdown */}
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700 font-bold">Product:</label>
          <select
            value={selectedProductID}
            onChange={(e) => setSelectedProductID(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              Select a product
            </option>
            {products.map((product) => (
              <option key={product.Product_ID} value={product.Product_ID}>
                {product.Product_Name}
              </option>
            ))}
          </select>
        </div>

        {/* Unit Name Dropdown */}
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700 font-bold">Unit Name:</label>
          <select
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="KG">KG</option>
            <option value="Piece">Piece</option>
          </select>
        </div>

        {/* Stock */}
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700 font-bold">Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)} // Corrected this line
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

  
        {/* Unit Price */}
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700 font-bold">Unit Price:</label>
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        

        {/* Description */}
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700 font-bold">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Picture URL */}
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700 font-bold">Picture URL:</label>
          <input
            type="text"
            value={pictureURL}
            onChange={(e) => setPictureURL(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 p-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Product Ad
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 font-bold ${
            messageType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
    <Footer/>
    </>
    
  );
}

export default SellerProductAd;