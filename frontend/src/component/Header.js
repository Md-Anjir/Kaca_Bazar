import { useState, useEffect } from "react";
import logo from "../images/KacaBazarLogo.png";
import cart from "../images/cart.png";
import orders from "../images/shopping-bag.png";
import { Link, useNavigate } from "react-router-dom";
import seller from "../images/agent.png";
import farmer from "../images/farmerlogo.png";
import profile from "../images/profile.png";
import axios from "axios";
import { Menu, X } from "react-feather";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const buyertoken = localStorage.getItem("buyertoken");
        if (buyertoken) {
          const response = await axios.get(
            "http://localhost:3000/auth/buyerinfo",
            {
              headers: { Authorization: `Bearer ${buyertoken}` },
            }
          );
          setBuyerInfo(response.data);
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
    localStorage.removeItem("buyertoken");
    setIsLoggedIn(false);
    setBuyerInfo(null);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await axios.get(
          `http://localhost:3000/buyer/search?query=${query}`
        );
        setSearchResults(response.data);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setShowSearchResults(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="border py-3 px-6 flex justify-between items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Kacha Bazar Logo"
            style={{ width: "110px", height: "50px" }}
          />
        </Link>

        {/* Search Bar */}
        <div className="ml-4 mr-4 flex flex-1 gap-3 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Search On Kaca Bazar"
          />
          {showSearchResults && (
            <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Link
                    to={`/search/products/${product.Product_ID}`}
                    key={product.Product_ID} // Ensure each item has a unique key
                    className="block p-2 hover:bg-gray-100"
                    onClick={() => setShowSearchResults(false)}
                  >
                    {product.Product_Name}
                  </Link>
                ))
              ) : (
                <div className="p-2 text-sm text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {isMenuOpen ? (
            <X onClick={toggleMenu} size={24} />
          ) : (
            <Menu onClick={toggleMenu} size={24} />
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-x-2 items-center">
          <Link
            to="/farmerlogin"
            className="flex items-center gap-x-1 py-2 px-4 hover:bg-gray-100"
          >
            <img
              src={farmer}
              alt="farmer"
              style={{ width: "30px", height: "30px" }}
            />
            <span className="text-sm font-medium">Become Farmer</span>
          </Link>
          <Link
            to="/sellerlogin"
            className="flex items-center gap-x-1 py-2 px-4 hover:bg-gray-100"
          >
            <img
              src={seller}
              alt="seller"
              style={{ width: "30px", height: "30px" }}
            />
            <span className="text-sm font-medium">Become Seller</span>
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-x-1 py-2 px-4 hover:bg-gray-100"
          >
            <img
              src={orders}
              alt="Orders"
              style={{ width: "30px", height: "30px" }}
            />
            <span className="text-sm font-medium">Orders</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-x-1 py-2 px-4 hover:bg-gray-100"
          >
            <img
              src={cart}
              alt="Cart"
              style={{ width: "30px", height: "30px" }}
            />
            <span className="text-sm font-medium">Cart</span>
          </Link>
          {isLoggedIn ? (
            <div
              className="flex items-center gap-x-1 py-2 px-4 hover:bg-gray-100 relative"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <img
                src={profile}
                alt="Profile"
                style={{ width: "35px", height: "35px" }}
              />
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-10 top-12">
                  <p>
                    <span>Name:</span> {buyerInfo.Buyer_Name}
                  </p>
                  <p>
                    <span>Email:</span> {buyerInfo.Email}
                  </p>
                  <p>
                    <span>Phone:</span> {buyerInfo.Phone_Number}
                  </p>
                  <button onClick={handleLogout} className="text-red-600">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-gray-100">
          <Link
            to="/farmerlogin"
            className="flex items-center gap-2 p-2 rounded-md"
          >
            <img
              src={farmer}
              alt="farmer"
              style={{ width: "30px", height: "30px" }}
            />
            <span>Become Farmer</span>
          </Link>
          <Link
            to="/sellerlogin"
            className="flex items-center gap-2 p-2 rounded-md"
          >
            <img
              src={seller}
              alt="seller"
              style={{ width: "30px", height: "30px" }}
            />
            <span>Become Seller</span>
          </Link>
          <Link to="/orders" className="flex items-center gap-2 p-2 rounded-md">
            <img
              src={orders}
              alt="Orders"
              style={{ width: "30px", height: "30px" }}
            />
            <span>Orders</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-2 p-2 rounded-md">
            <img
              src={cart}
              alt="Cart"
              style={{ width: "30px", height: "30px" }}
            />
            <span>Cart</span>
          </Link>
          {isLoggedIn ? (
            <div
              className="flex items-center gap-2 p-2"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <img
                src={profile}
                alt="Profile"
                style={{ width: "35px", height: "35px" }}
              />
              <div>
                <p>{buyerInfo.Buyer_Name}</p>
                <button onClick={handleLogout} className="text-red-600">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
