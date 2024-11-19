// AddProduct.js
import React, { useState } from 'react';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPictureFile, setProductPictureFile] = useState(null);
  const [products, setProducts] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductPictureFile(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      category: productCategory,
      picture: URL.createObjectURL(productPictureFile),
    };
    setProducts([...products, newProduct]);
    setProductName('');
    setProductCategory('');
    setProductPictureFile(null);
    e.target.reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Products display section */}
      <div className="container mx-auto my-8 p-4">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <img src={product.picture} alt={product.name} className="w-full h-48 object-cover rounded" />
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-gray-600">{product.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Form */}
      <div className="container mx-auto my-8 p-4">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">Product Category</label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              id="productCategory"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fish">Fish</option>
              <option value="Meat">Meat</option>
              <option value="Rice">Rice</option>
              <option value="Dal">Dal</option>
              <option value="Spice">Spice</option>
              <option value="Fruits">Fruits</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="productPicture" className="block text-sm font-medium text-gray-700">Product Picture</label>
            <input
              type="file"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              id="productPicture"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
