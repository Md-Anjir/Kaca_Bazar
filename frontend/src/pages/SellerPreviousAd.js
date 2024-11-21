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

  // Handle toggling ad status (on/off)
  const toggleAdStatus = async (adId, currentStatus) => {
    try {
      const token = localStorage.getItem("sellertoken");
      const response = await axios.patch(
        `http://localhost:3000/seller/ad/status/${adId}`,
        { status: currentStatus === "on" ? "off" : "on" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Ad status updated successfully");
        // Update the ad's status in the state
        setAds((prevAds) =>
          prevAds.map((ad) =>
            ad.Seller_Product_AD_ID === adId
              ? { ...ad, Status: currentStatus === "on" ? "off" : "on" }
              : ad
          )
        );
      }
    } catch (error) {
      console.error("Error updating ad status:", error);
      setError("Failed to update ad status.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // Separate active and inactive ads
  const activeAds = ads.filter((ad) => ad.Status === "on");
  const inactiveAds = ads.filter((ad) => ad.Status === "off");

  return (
    <>
      <SellerHeader />
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
                  <th className="py-3 px-4 text-left font-semibold">Product Name</th>
                  <th className="py-3 px-4 text-left font-semibold">Unit Name</th>
                  <th className="py-3 px-4 text-left font-semibold">Stock</th>
                  <th className="py-3 px-4 text-left font-semibold">Unit Price</th>
                  <th className="py-3 px-4 text-left font-semibold">Created Date</th>
                  <th className="py-3 px-4 text-left font-semibold">Description</th>
                  <th className="py-3 px-4 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {[...activeAds, ...inactiveAds].map((ad) => (
                  <tr
                    key={ad.Seller_Product_AD_ID}
                    className="hover:bg-green-100 transition duration-200"
                  >
                    <td className="py-2 px-4 border-b border-gray-200">{ad.Product_Name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{ad.Unit_Name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{ad.Stock}</td>
                    <td className="py-2 px-4 border-b border-gray-200">${ad.Unit_Price}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {new Date(ad.Created_Date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">{ad.Description}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                      <button
                        onClick={() => toggleAdStatus(ad.Seller_Product_AD_ID, ad.Status)}
                        className={`px-4 py-1 text-sm font-semibold border rounded ${
                          ad.Status === "on"
                            ? "text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                            : "text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                        } transition duration-200`}
                      >
                        {ad.Status === "on" ? "Turn Off" : "Turn On"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SellerPreviousAd;
