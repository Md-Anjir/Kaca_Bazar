import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";

const SearchProducts = () => {
  const { productId } = useParams();  // Get the productId from the URL params
  const [products, setProducts] = useState([]);  // Store the fetched products
  const [message, setMessage] = useState("");  // For displaying error or success messages
  const [productName, setProductName] = useState("");
  const [cart, setCart] = useState([]);  // Store the products added to cart
  const navigate = useNavigate();


  // Fetch products by product ID from the backend
  useEffect(() => {
    const fetchSearchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/buyer/search-products/${productId}`
        );
        
        if (response.data.length === 0) {
          setMessage(`No products available for the product ID: ${productId}.`);
        } else {
          setMessage("");
          setProducts(response.data);  // Set fetched products into state
          setProductName(response.data[0].Product_Name);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setMessage(`Error loading products. Please try again later.`);
      }
    };

    fetchSearchProducts();
  }, [productId]);  // Trigger when productId changes

  const handleSellerClick = (sellerId) => {
    navigate(`/seller/${sellerId}/products`);
  };

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product is already in the cart
      const existingProduct = prevCart.find(item => item.Seller_Product_Ad_ID === product.Seller_Product_Ad_ID);
      if (existingProduct) {
        return prevCart;  // Don't add duplicate
      }
      return [...prevCart, product];
    });
    alert(`${product.Product_Name} added to cart!`);
  };

  return (
    <>
      <Header />
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl ">
          <div className=" p-5">
          Search Result of,
            <h2 className="text-2xl font-bold text-gray-900 sm:text-2xl">
             {productName} {/* Display the seller's name */}
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
                key={product.Seller_Product_Ad_ID}  // Use Seller_Product_Ad_ID for unique key
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
                  <p
                style={{ color: "#3b82f6", fontSize: "0.9rem", cursor: "pointer", marginTop: "0.5rem" }}
                onClick={() => handleSellerClick(product.Seller_ID)}
              >
                {`Seller: ${product.Seller_Name}`}
              </p>
                  <p className="text-gray-600 mb-2 text-sm">{`Price: $${product.Unit_Price} per ${product.Unit_Name}`}</p>
                  <p className="text-gray-600 mb-2 text-sm">{`Stock: ${product.Stock} available`}</p>
                  <p className="text-gray-600 mb-2 text-sm">{product.Description}</p>
                  
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
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

export default SearchProducts;
