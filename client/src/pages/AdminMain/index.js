import React, { useState, useEffect } from 'react';
import GalleryListUpdate from '../../components/galleryListUpdate';
import ProductForm from '../../components/productForm';
import CategoryAddForm from '../../components/categoryAddForm'
import CategoryDeleteform from '../../components/categoryDeleteForm'
import GalleryListUncategorized from '../../components/galleryListUncategorized'
import Animate from 'react-smooth'

const Admin = () => {
  const galleryImgStyle = "galleryImgStyle"
  const [galleryData, setGalleryData] = useState(false);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [uncategorized, setUncategorized] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch('/api/allProducts');
        const productsJson = await productsRes.json();
        const sortedData = productsJson.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);

        const settingsRes = await fetch('/api/settings');
        const settingsJson = await settingsRes.json();
        const categoriesData = settingsJson.find(d => d.configs === "categories")?.values || [];

        setGalleryData(sortedData);
        setGalleryLoaded(true);
        setCategories(categoriesData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (galleryLoaded && categories.length > 0) {
      const tempArray = galleryData.filter(product => !categories.includes(product.category));
      setUncategorized(tempArray);
    }
  }, [galleryData, categories, galleryLoaded]);

  const deleteProduct = async ({ productName, createdAt }) => {
    try {
      const response = await fetch('/api/deleteProduct', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ productName: productName, createdAt: createdAt }),
      });

      if (response.ok) {
        console.log("Deleted: ", productName);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <CategoryAddForm className="col-6" categories={categories} />
        </div>
        <div className="col-md-4">
          <ProductForm className="col-6" categories={categories} />
        </div>
        <div className="col-md-4">
          <CategoryDeleteform className="col-6" categories={categories} />
        </div>



      </div>
      {galleryLoaded && categories.map((cat, index) => (
        <Animate key={index} to="1" from="0.5" attributeName="opacity">
          <GalleryListUpdate key={cat} galleryData={galleryData} category={cat} styleClass={galleryImgStyle} deleteProduct={deleteProduct} />
        </Animate>
      ))}
      {uncategorized &&
        <Animate key={"x"} to="1" from="0.5" attributeName="opacity">
          <GalleryListUncategorized key={"x"} uncategorized={uncategorized} styleClass={galleryImgStyle} deleteProduct={deleteProduct} />
        </Animate>
      }
    </div>
  );
};

export default Admin;
