import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch('/product.json') // Assuming product.json is in the public folder
      .then(response => response.json())
      .then(data => setProducts(data.products)); // Accessing the 'products' array from the JSON data
  }, []);

  const categories = ["smartphones","laptops","fragrances","skincare","groceries","home-decoration","furniture"];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Ensure filteredProducts is properly initialized and filtered
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      <h1>Product List</h1>
      <select onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="all">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
