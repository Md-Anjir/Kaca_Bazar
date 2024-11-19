// Header.js
import React from "react";

function Adminheader({ isLoggedIn, onLogout, onNavigate }) {
  return (
    <header className="bg-green-400 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <a className="text-xl font-bold" href="/" onClick={() => onNavigate("admin")}>
          Home
        </a>
        <nav className="flex space-x-4">
          <a className="hover:text-gray-400" href="/add-product" onClick={() => onNavigate("products")}>Products</a>
          <a className="hover:text-gray-400" href="#" onClick={() => onNavigate("orders")}>Orders</a>
          <a className="hover:text-gray-400" href="#" onClick={() => onNavigate("customers")}>Customers</a>
          <a className="hover:text-gray-400" href="#" onClick={() => onNavigate("reports")}>Reports</a>
        </nav>
       
      </div>
    </header>
  );
}

export default Adminheader;
