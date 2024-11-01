import React, { useState, useEffect } from "react";
import gif from "../images/logo.gif";
import shoppingcart from "../images/shopping-cart.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../component/Footer";
import WhySell from "../component/WhySell";
import FarmerHeader from "../component/FarmerHeader";

function FarmerUpdateProfile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Function to detect window size and adjust the layout for mobile or desktop
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3000/auth/update-profile", // Assuming an API endpoint for updating the profile
        values
      );
      console.log(response);
      if (response.status === 200) {
        navigate("/farmer");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <FarmerHeader/>

      <div className="flex-1 items-center">
        <div
          className="flex justify-center items-center p-4 flex-col md:flex-row py-9"
          style={{ backgroundColor: "green" }}
        >
          <div style={{ width: "50%", paddingRight: "20px" }}>
            <h1 style={{ fontSize: isMobile ? "30px" : "48px", fontWeight: "bold" }}>
              Update Your Kaca Bazar Farmer Profile
            </h1>
            <p style={{ fontSize: "20px", marginTop: "20px" }}>
              Update your profile details to ensure customers know who you are!
            </p>
            <img
              src={shoppingcart}
              alt="Shopping Cart"
              style={{ marginTop: "50px", width: "150px" }}
            />
          </div>

          {/* Form Section */}
          <div
            className="shadow-lg px-8 py-5 border w-full max-w-lg md:max-w-3xl"
            style={{ backgroundColor: "white", borderRadius: "20px" }}
          >
            <div className="flex flex-col md:flex-row justify-center items-center">
              <img
                style={{ width: "300px", height: "auto" }}
                src={gif}
                alt="Animated GIF"
                className="mb-4 md:mb-0 md:mr-4 w-full md:w-1/2"
              />
              <div className="flex justify-center items-center flex-col w-full md:w-1/2">
                <h2 className="text-lg font-bold mb-4">Update Profile</h2>
                <form className="w-full" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">
                      name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter New name"
                      className="w-full px-3 py-2 border"
                      name="name"
                      value={values.name}
                      onChange={handleChanges}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter New Email"
                      className="w-full px-3 py-2 border"
                      name="email"
                      value={values.email}
                      onChange={handleChanges}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter New Password"
                      className="w-full px-3 py-2 border"
                      name="password"
                      value={values.password}
                      onChange={handleChanges}
                    />
                  </div>
                  <button className="w-full bg-green-600 text-white py-2">
                    Update Profile
                  </button>
                </form>
                <div className="text-center mt-4">
                  <span>Want to go back to your dashboard?</span>
                  <Link to="/farmer" className="text-blue-500">
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhySell />
      <Footer />
    </>
  );
}

export default FarmerUpdateProfile;
