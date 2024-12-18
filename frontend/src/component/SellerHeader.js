import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../images/KacaBazarLogo.png";
import seller from "../images/agent.png";

import profile from "../images/profile.png";
import axios from "axios"; // Make sure to import axios

export default function SellerHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sellerInfo, setsellerInfo] = useState(null);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // New state for profile dropdown

  const [pendingOrderCount, setPendingOrderCount] = useState(0);

  useEffect(() => {
    const fetchPendingOrderCount = async () => {
      try {
        const sellertoken = localStorage.getItem("sellertoken"); // Get seller token
        if (sellertoken) {
          const response = await axios.get(
            "http://localhost:3000/seller/orders/pending-count",
            {
              headers: { Authorization: `Bearer ${sellertoken}` }, // Include token in headers
            }
          );
          setPendingOrderCount(response.data.count); // Update the state with the count
        }
      } catch (error) {
        console.error("Error fetching pending order count :", error);
      }
    };
  
    // Fetch immediately on mount
    fetchPendingOrderCount();
  
    // Set an interval to fetch periodically
    const interval = setInterval(fetchPendingOrderCount, 60000); // Fetch every 60 seconds
  
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);
  
  

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const sellertoken = localStorage.getItem("sellertoken"); // Change from Buyer_ID to sellertoken
        if (sellertoken) {
          const response = await axios.get(
            "http://localhost:3000/auth/sellerInfo",
            {
              headers: { Authorization: `Bearer ${sellertoken}` }, // Include the sellertoken in the request headers
            }
          );
          setsellerInfo(response.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching buyer info:", error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sellertoken"); // Clear the sellertoken from local storage
    console.log("Log out Succesfully!");
    setIsLoggedIn(false);
    setsellerInfo(null);
    navigate("/"); // Redirect to login page after logout
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown); // Toggle the profile dropdown
  };

  return (
    <>
      {/* Seller Header Component */}
      <div className="bg-white">
        <div className="border py-3 px-6">
          <div className="flex justify-between">
            {/* Logo */}
            <div className="flex items-center py-0 px-1">
              <Link to="/seller">
                <img
                  src={logo}
                  alt="Kaca Bazar Logo"
                  style={{ width: "110px", height: "50px", padding: "0" }}
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="ml-6 flex flex-1 gap-3">
              <input
                type="text"
                className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
                placeholder="Search on Kaca Bazar"
              />
            </div>

            {/* Seller Links */}
            <div className="flex gap-x-2">
              {/* Update Profile */}
              <div
                className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100"
                onClick={() =>
                  (window.location.href = "/seller/update-profile")
                }
              >
                <img
                  src={seller}
                  alt="seller"
                  style={{ width: "30px", height: "30px", padding: "0" }}
                />
                <span className="text-sm font-medium">Update Profile</span>
              </div>

              {/* Sales */}
              <div
                className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100"
                onClick={() => (window.location.href = "/seller/sales")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path
                    fillRule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Sales</span>
              </div>

              {/* Orders */}
              <div
                className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100"
                onClick={() => (window.location.href = "/seller/orders")}
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  {pendingOrderCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                      {pendingOrderCount}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">Orders</span>
              </div>

              {/* Logout */}
              {isLoggedIn ? (
                <div
                  className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100"
                  style={{ position: "relative" }}
                >
                  <img
                    src={profile}
                    alt="Profile"
                    style={{
                      width: "35px",
                      height: "35px",
                      cursor: "pointer",
                      padding: "0",
                    }}
                    onClick={handleProfileClick} // Toggle dropdown visibility
                  />
                  {showProfileDropdown &&
                    sellerInfo && ( // Show dropdown if it's visible and buyer info is available
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          backgroundColor: "#b5f8f1",
                          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                          position: "absolute",
                          top: "100%",
                          right: "0",
                          padding: "10px",
                          minWidth: "260px",
                          zIndex: "1",
                        }}
                      >
                        <p style={{ margin: "0", padding: "5px 0" }}>
                          <span style={{ color: "#0010ad", fontSize: "18px" }}>
                            Name:{" "}
                          </span>{" "}
                          {sellerInfo.Seller_Name}
                        </p>
                        <p style={{ margin: "0", padding: "5px 0" }}>
                          <span style={{ color: "#0010ad", fontSize: "18px" }}>
                            Email:{" "}
                          </span>{" "}
                          {sellerInfo.Email}
                        </p>
                        <p style={{ margin: "0", padding: "5px 0" }}>
                          <span style={{ color: "#0010ad", fontSize: "18px" }}>
                            {" "}
                            Phone Number:{" "}
                          </span>
                          {sellerInfo.Phone_Number}
                        </p>
                        <p style={{ margin: "0", padding: "5px 0" }}>
                          <span style={{ color: "#0010ad", fontSize: "18px" }}>
                            Location:{" "}
                          </span>
                          {sellerInfo.Location_Name}
                        </p>
                        <button
                          onClick={() =>
                            (window.location.href = "/seller/update-profile")
                          }
                          style={{
                            marginTop: "10px",
                            padding: "4px",
                            backgroundColor: "#009e48",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "17px",
                          }}
                        >
                          Update Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          style={{
                            marginTop: "10px",
                            padding: "4px",
                            backgroundColor: "#009e48",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "17px",
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                </div>
              ) : (
                <Link
                  to="/login"
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontSize: "20px",
                  }}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
