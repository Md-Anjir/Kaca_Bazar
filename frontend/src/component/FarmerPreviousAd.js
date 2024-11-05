// src/components/FarmerPreviousAd.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FarmerPreviousAd = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ads on component mount
  const fetchAds = async () => {
    try {
      const token = localStorage.getItem('farmertoken'); // Retrieve the JWT token
      const response = await axios.get('http://localhost:3000/farmer/ads', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
      setError('Failed to load ads.');
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
      const token = localStorage.getItem('farmertoken');
      const response = await axios.delete(`http://localhost:3000/farmer/ad/${adId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        alert("Ad deleted successfully");
        // Update ads state by filtering out the deleted ad
        setAds((prevAds) => prevAds.filter((ad) => ad.Farmer_Product_AD_ID !== adId));
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
      setError('Failed to delete ad.');
    }
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Your Previous Ads</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ads.length === 0 ? (
        <p>No ads found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Unit Name</th>
              <th>Minimum Order Quantity</th>
              <th>Unit Price</th>
              <th>Delivery Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad.Farmer_Product_AD_ID}>
                <td>{ad.Farmer_Product_AD_ID}</td>
                <td>{ad.Product_Name}</td>
                <td>{ad.Unit_Name}</td>
                <td>{ad.Minimum_Order_Quantity}</td>
                <td>{ad.Unit_Price}</td>
                <td>{new Date(ad.Delivery_Date).toLocaleDateString()}</td>
                <td>{ad.Description}</td>
                <td>
                  <button onClick={() => handleDelete(ad.Farmer_Product_AD_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FarmerPreviousAd;
