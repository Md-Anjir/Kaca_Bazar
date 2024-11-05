import React, { useState, useEffect } from "react";
import axios from "axios";

function FarmerProductAd() {
  const [products, setProducts] = useState([]);
  const [selectedProductID, setSelectedProductID] = useState("");
  const [unitName, setUnitName] = useState("KG");
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
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

    const farmertoken = localStorage.getItem("farmertoken");

    if (!farmertoken) {
      setMessage("Please log in to add a product.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/farmer/product_ad",
        {
          Product_ID: selectedProductID,
          Unit_Name: unitName,
          Minimum_Order_Quantity: minimumOrderQuantity,
          Unit_Price: unitPrice,
          Delivery_Date: deliveryDate,
          Phone_Number: phoneNumber,
          Description: description,
          Picture_URL: pictureURL,
        },
        {
          headers: {
            Authorization: `Bearer ${farmertoken}`,
          },
        }
      );

      if (response.status === 201) { // Check for created response status
        setMessage("Product ad added successfully!");
        setMessageType("success");
        // Clear form fields
        setSelectedProductID("");
        setUnitName("KG");
        setMinimumOrderQuantity("");
        setUnitPrice("");
        setDeliveryDate("");
        setPhoneNumber("");
        setDescription("");
        setPictureURL("");
      } else {
        setMessage("Failed to add product ad.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error adding product ad:", error);
      setMessage("An error occurred while adding the product ad. Please try again.");
      setMessageType("error");
    }

    // Clear the message after 3 seconds
    setTimeout(() => setMessage(""), 10000); // Adjusted to 10 seconds
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2 style={{ color: "green" }}>Add New Product Ad</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Dropdown */}
        <div style={{ marginBottom: "10px" }}>
          <label>Product:</label>
          <select
            value={selectedProductID}
            onChange={(e) => setSelectedProductID(e.target.value)}
            required
          >
            <option value="" disabled>Select a product</option>
            {products.map((product) => (
              <option key={product.Product_ID} value={product.Product_ID}>
                {product.Product_Name}
              </option>
            ))}
          </select>
        </div>

        {/* Remaining fields for product ad details */}
        <div style={{ marginBottom: "10px" }}>
          <label>Unit Name:</label>
          <select value={unitName} onChange={(e) => setUnitName(e.target.value)} required>
            <option value="KG">KG</option>
            <option value="Piece">Piece</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Minimum Order Quantity:</label>
          <input type="number" value={minimumOrderQuantity} onChange={(e) => setMinimumOrderQuantity(e.target.value)} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Unit Price:</label>
          <input type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Delivery Date:</label>
          <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Picture URL:</label>
          <input type="text" value={pictureURL} onChange={(e) => setPictureURL(e.target.value)} />
        </div>

        <button type="submit">Add Product Ad</button>
      </form>

      {message && (
        <p
          style={{
            color: messageType === "success" ? "green" : "red",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default FarmerProductAd;
