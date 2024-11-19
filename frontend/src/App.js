import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddProductPage from "./pages/AddProductpage"
import AdminPage from "./pages/Adminpage"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import SellerLogin from "./pages/SellerLogin"
import SellerRegister from "./pages/SellerRegister"
import SellerProducts from "./pages/SellerProducts"
import SearchProducts from "./pages/SearchProducts"
import Contact from "./pages/Contact"
import TermsAndConditions from "./pages/TermsAndConditions"
import AboutUs from "./pages/AboutUs"
import FAQs from "./pages/FAQs"
import Seller from "./pages/Seller"
import SellerUpdateProfile from "./pages/SellerUpdateProfile"
import SellerOrders from "./pages/SellerOrders"
import SellerPreviousAd from "./pages/SellerPreviousAd"
import SellerProductAd from "./pages/SellerProductAd"
import FarmerProducts from "./pages/FarmerProducts"
import BuyFromFarmers from "./pages/BuyFromFarmers"
import FarmerLogin from "./pages/FarmerLogin"
import FarmerRegister from "./pages/FarmerRegister"
import Farmer from "./pages/Farmer"
import FarmerUpdateProfile from "./pages/FarmerUpdateProfile"
import FarmerProductAd from "./pages/FarmerProductAd"
import FarmerPreviousAd from "./pages/FarmerPreviousAd"


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/sellerregister" element={<SellerRegister/>}></Route>
        <Route path="/sellerlogin" element={<SellerLogin/>}></Route>
        <Route path="/seller/:sellerId/products" element={<SellerProducts />} />
        <Route path="/farmer/:farmerId/products" element={<FarmerProducts />} />
        <Route path="/search/products/:productId" element={<SearchProducts />} />
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/termsandconditions" element={<TermsAndConditions/>}></Route>
        <Route path="/aboutus" element={<AboutUs/>}></Route>
        <Route path="/faqs" element={<FAQs/>}></Route>
        <Route path="/seller" element={<Seller/>}></Route>
        <Route path="/seller/update-profile" element={<SellerUpdateProfile/>}></Route>
        <Route path="/seller/orders" element={<SellerOrders/>}></Route>
        <Route path="/seller/previous-ad" element={<SellerPreviousAd />} />
        <Route path="/seller/product-ad" element={<SellerProductAd />} />
        <Route path="/seller/buy-from-farmers" element={<BuyFromFarmers />} />
        <Route path="/farmerlogin" element={<FarmerLogin/>}></Route>
        <Route path="/farmerregister" element={<FarmerRegister/>}></Route>
        <Route path="/farmer" element={<Farmer/>}></Route>
        <Route path="/farmer/update-profile" element={<FarmerUpdateProfile/>}></Route>
        <Route path="/farmer/previous-ad" element={<FarmerPreviousAd />} />
        <Route path="/farmer/product-ad" element={<FarmerProductAd />} />
        <Route path="/add-product" element={<AddProductPage />} > </Route>
        <Route path="/admin" element={<AdminPage/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
