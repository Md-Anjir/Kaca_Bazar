import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";

const SellerProducts = () => {
  const { sellerId } = useParams();
  const [products, setProducts] = useState([]);
  const [sellerName, setSellerName] = useState(""); // State for seller name
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/buyer/seller-products/${sellerId}`
        );
        if (response.data.length === 0) {
          setMessage(`No products available from seller with ID: ${sellerId}.`);
        } else {
          setMessage("");
          setProducts(response.data);
          setSellerName(response.data[0].Seller_Name); // Set seller name from the first product
        }
      } catch (error) {
        console.error("Error fetching seller's products:", error);
        setMessage(
          `Error loading products for seller with ID: ${sellerId}. Please try again later.`
        );
      }
    };

    fetchSellerProducts();
  }, [sellerId]);

  return (
    <>
      <Header />
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl ">
          <div className="border rounded-lg items-center bg-green-500 p-5">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl text-center">
              {sellerName}'s Products {/* Display the seller's name */}
            </h2>
            {message && (
              <p className="text-center text-red-500 font-semibold mt-6">
                {message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {products.map((product) => (
              <div
                key={product.Seller_Product_Ad_ID} // Use Seller_Product_Ad_ID for unique key
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
                  <p className="text-gray-600 mb-2 text-sm">{`Stock: ${product.Stock} available`}</p>
                  <p className="text-gray-600 mb-2 text-sm">
                    {product.Description}
                  </p>
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

export default SellerProducts;
