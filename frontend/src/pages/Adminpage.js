// AdminPage.js
import React from 'react';
import Footer from '../component/Footer'; // Import the Footer component
import AdminMain from '../component/AdminMain'; // Import the AdminMain component
import Adminheader from '../component/Adminheader';

function AdminPage() {
  return (
    <>
      <Adminheader/> 
      <AdminMain /> 
      <Footer /> 
    </>
  );
}

export default AdminPage;
