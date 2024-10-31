import React, { useState } from "react";
import axios from "axios";
import Header from "../component/Header";
import Footer from "../component/Footer";

function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have an API to handle the contact form submission
      const response = await axios.post("http://localhost:3000/contact", values);
      console.log(response);
      alert("Message sent successfully!");
    } catch (err) {
      console.log(err.message);
      alert("There was an error sending your message.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center py-16 bg-gray-100">
        <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
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
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={values.email}
                onChange={handleChanges}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={values.message}
                onChange={handleChanges}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
