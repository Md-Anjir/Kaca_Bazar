// src/components/FarmerPreviousAd.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import SellerHeader from "../component/SellerHeader";
import Footer from "../component/Footer";

const SellerPreviousAd = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ads on component mount
  const fetchAds = async () => {
    try {
      const token = localStorage.getItem("sellertoken"); // Retrieve the JWT token
      const response = await axios.get("http://localhost:3000/seller/ads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAds(response.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setError("Failed to load ads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // Function to handle ad deletion
  const handleDelete = async (adId) => {
    try {
      console.log(adId);
      const token = localStorage.getItem("sellertoken");
      const response = await axios.delete(
        `http://localhost:3000/seller/ad/${adId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Ad deleted successfully");
        // Update ads state by filtering out the deleted ad
        setAds((prevAds) =>
          prevAds.filter((ad) => ad.Seller_Product_AD_ID !== adId)
        );
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
      setError("Failed to delete ad.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <SellerHeader/>
    <div className="max-w-5xl mx-auto p-5 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Your Previous Ads
      </h2>

      {error && (
        <p className="text-red-600 font-semibold text-center mb-4">{error}</p>
      )}

      {ads.length === 0 ? (
        <p className="text-center text-gray-500 font-semibold">No ads found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 text-left font-semibold">
                  Product Name
                </th>
                <th className="py-3 px-4 text-left font-semibold">Unit Name</th>
                <th className="py-3 px-4 text-left font-semibold">
                  Stock
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  Unit Price
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  Created Date
                </th>
                <th className="py-3 px-4 text-left font-semibold">
                  Description
                </th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr
                  key={ad.Seller_Product_AD_ID}
                  className="hover:bg-green-100 transition duration-200"
                >
                  <td className="py-2 px-4 border-b border-gray-200">
                    {ad.Product_Name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {ad.Unit_Name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {ad.Stock}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    ${ad.Unit_Price}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(ad.Created_Date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {ad.Description}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center">
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this ad?"
                          )
                        ) {
                          handleDelete(ad.Seller_Product_AD_ID);
                        }
                      }}
                      className="px-4 py-1 text-sm font-semibold text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <Footer/>
    </>
    
  );
};

export default SellerPreviousAd;
