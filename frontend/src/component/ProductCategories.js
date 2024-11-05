import React, { useState } from "react";
import axios from "axios";
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
  const [message, setMessage] = useState(""); // State for message

  const handleClick = async (category) => {
    try {
      console.log(`Category clicked: ${category}`);
      const response = await axios.get(`http://localhost:3000/buyer/product-ads?category=${category}`);

      if (response.data.length === 0) {
        setMessage("No products available for this category.");
      } else {
        setMessage(""); // Clear message if ads are available
      }

      setAds(response.data);
    } catch (error) {
      console.error("Error fetching product ads:", error);
      setMessage("Error loading products. Please try again later.");
    }
  };

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Our Product Categories
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600">
            Discover our range of products sourced directly from farmers.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
          {/* Category items */}
          {[
            { name: 'Egg', image: eggImage },
            { name: 'Fish', image: fishImage },
            { name: 'Chicken', image: chickenImage },
            { name: 'Vegetables', image: vegetableImage },
            { name: 'Fruits', image: fruitImage },
            { name: 'Rice', image: riceImage },
            { name: 'Meat', image: meatImage },
            { name: 'Spice', image: spiceImage },
          ].map((item) => (
            <div
              key={item.name}
              className="relative group cursor-pointer"
              onClick={() => handleClick(item.name)}
            >
              <div className="overflow-hidden">
                <img className="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125" src={item.image} alt={item.name} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl text-center mt-4">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Message Display */}
      {message && <p className="text-center text-red-500 font-semibold mt-6">{message}</p>}

      {/* Product Ads Display */}
<div className="product-ads mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-7 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
  {ads.length > 0 ? (
    ads.map((ad) => (
      <div key={ad.Product_AD_ID} className="product-card bg-white rounded-lg shadow-md overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src="https://via.placeholder.com/150" // Replace with placeholder or actual image URL
          alt={ad.Product_Name}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{ad.Product_Name}</h3>
          <p className="text-gray-600 mb-2">{`Price: $${ad.Unit_Price} per ${ad.Unit_Name}`}</p>
          <p className="text-gray-600 mb-2">{`Minimum Order: ${ad.Minimum_Order_Quantity}`}</p>
          <p className="text-gray-600 mb-2">{`Delivery Date: ${ad.Delivery_Date}`}</p>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Stock: {ad.Stock} available</p>
            <button
              className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-full hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No ads available.</p>
  )}
</div>
    </section>
  );
};

export default ProductCategories;
