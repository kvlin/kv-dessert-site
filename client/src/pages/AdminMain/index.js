import React, { useState, useEffect, useRef } from 'react';
import { useDrop, useDrag, DragSourceMonitor, DropTargetMonitor } from "react-dnd";
import GalleryListUpdate from '../../components/galleryListUpdate';
import ProductForm from '../../components/productForm';
import CategoryAddForm from '../../components/categoryAddForm'
import CategoryDeleteform from '../../components/categoryDeleteForm'
import GalleryListUncategorized from '../../components/galleryListUncategorized'
import Callout from '../../components/callout';
import Animate from 'react-smooth'
const Admin = () => {
  const fileInput = useRef(null);

  const galleryImgStyle = "galleryImgStyle"
  // useEffect(()=>{
  //     fetchData('Thoughts').then(res => setGalleryData(res));
  // },[])
  const [galleryData, setGalleryData] = useState(false);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formState, setFormState] = useState()
  const uniqueCategories = new Set();
  const [uncategorized, setUncategorized] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/allProducts');
        const jsonData = await res.json();
        // sort the array by createdAt property ordered by descending values
        const data = jsonData.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
        console.log(data)

        // const allCategories = data.forEach(d => { uniqueCategories.add(d.category) })
        // setCategories(Array.from(uniqueCategories))

        setGalleryData(data)
        setGalleryLoaded(true)

      } catch (error) {
        console.log(error);
      }
    }

    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/settings');
        const jsonData = await res.json();
        jsonData.forEach(d => {
          if (d.configs == "categories") {
            setCategories(d.values)
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
    fetchCategories();


  }, []);
  useEffect(() => {
    if (galleryLoaded && categories.length > 0) {
      console.log(galleryData.length)
      console.log(categories.length)
      let tempArray = [];
      // get products with no categories available
      galleryData.forEach((product) => {
        if (categories.length > 0 && !categories.includes(product.category)) {
          console.log(product)
          tempArray.push(product)
        }
      });
      console.log(tempArray)
      setUncategorized([...tempArray])
    }
  }, [galleryData, categories]);


  // function to delete a product data
  const deleteProduct = ({ productName, createdAt }) => {
    console.log(productName)
    try {
      const deleteData = async () => {
        await fetch('/api/deleteProduct', {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ productName: productName, createdAt: createdAt }),
        })
          .then((data) => {
            if (data.ok) {
              console.log("Deleted: ", productName)
              // const oldGalleryData = ["ok", "wtf"]
              // const anotherOldGalleryData = oldGalleryData.filter(product => {
              //   if (product.productName != productName) {
              //     console.log(product)
              //     return product
              //   }
              // })
              // // remove the deleted product from the state
              // setGalleryData(
              //   anotherOldGalleryData
              // );
              return true
            }
            return false
          })
      }
      return deleteData()
    } catch (error) {
      console.log(error);
    }
  }

  // if (!galleryData) {
  //   return <><div id="loader"></div></>;
  // }
  return (

    <div>
      <CategoryAddForm categories={categories} />
      <CategoryDeleteform categories={categories} />
      <ProductForm categories={categories} />
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
      {galleryLoaded &&
        <Callout style={{ maxWidth: "945px", display: "block", margin: "1.5rem auto" }} />}

    </div>
  );
};

export default Admin;