import React, { useState } from "react";
import gif from "../images/logo.gif";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import Footer from "../component/Footer";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values
      );
      console.log(response);

      if (response.status === 200) {
        const { buyertoken } = response.data; // Adjust to match your backend response
        localStorage.setItem("buyertoken", buyertoken); // Store the buyertoken

        console.log(`Login successful! buyertoken: ${buyertoken}`);
        navigate("/"); // Redirect to the home page
      }
    } catch (err) {
      if (err.response) {
        // Check specific error messages from the server
        if (err.response.status === 404) {
          setErrorMessage("User not found"); // Set error for user not found
        } else if (err.response.status === 401) {
          setErrorMessage("Incorrect password"); // Set error for incorrect password
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        console.log(err.message);
        setErrorMessage("An error occurred. Please check your connection.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex-1 flex justify-center items-center h-screen p-4">
        <div className="shadow-lg px-8 py-5 border w-full max-w-lg md:max-w-3xl">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <img
              style={{ width: "300px", height: "auto" }}
              src={gif}
              alt="Animated GIF"
              className="mb-4 md:mb-0 md:mr-4 w-full md:w-1/2"
            />
            <div className="flex justify-center items-center flex-col w-full md:w-1/2">
              <h2 className="text-lg font-bold mb-4">Login</h2>
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full px-3 py-2 border"
                    name="email"
                    onChange={handleChanges}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full px-3 py-2 border"
                    name="password"
                    onChange={handleChanges}
                    required
                  />
                </div>
                <button className="w-full bg-green-600 text-white py-2">
                  Login
                </button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
                {/* Display error message */}
              </form>
              <div className="text-center mt-4">
                <span>Don't have an account?</span>
                <Link to="/register" className="text-blue-500">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
