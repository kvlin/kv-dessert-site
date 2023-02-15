import React, { useState, useEffect } from 'react';
import { useDrop, useDrag, DragSourceMonitor, DropTargetMonitor } from "react-dnd";
import GalleryListUpdate from '../../components/galleryListUpdate';
import Callout from '../../components/callout';
import Animate from 'react-smooth'

const Admin = () => {

  const galleryImgStyle = "galleryImgStyle"
  // useEffect(()=>{
  //     fetchData('Thoughts').then(res => setGalleryData(res));
  // },[])
  const [galleryData, setGalleryData] = useState(false);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const uniqueCategories = new Set();
  const fetchData = async () => {
    try {
      const res = await fetch('/api/allProducts');
      const jsonData = await res.json();
      // sort the array by createdAt property ordered by descending values
      const data = jsonData.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
      console.log(data)

      data.forEach(d => { uniqueCategories.add(d.category) })
      setCategories(Array.from(uniqueCategories))

      setGalleryData(data)
      setGalleryLoaded(true)

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {

    fetchData();


  }, []);
  useEffect(() => {

    console.log(galleryData)


  }, [galleryData]);
  // function to add product
  // const deleteProduct = (productName, createdAt) => {
  //   try {
  //     console.log("In delete API", productName)
  //     const deleteData = async () => {
  //     await fetch('/api/deleteProduct', {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-type': 'application/json'
  //     },
  //       body: JSON.stringify({productName: productName, createdAt: createdAt}),
  //     })
  //     .then((data) => {
  //       if(data.ok) console.log("Deleted: ", productName)
  //     })
  //   }
  //   deleteData()
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
              const oldGalleryData = ["ok", "wtf"]
              const anotherOldGalleryData = oldGalleryData.filter(product => {
                if (product.productName != productName) {
                  console.log(product)
                  return product
                }
              })
              // remove the deleted product from the state
              setGalleryData(
                oldGalleryData
              );
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

      {galleryLoaded && categories.map((cat, index) => (
        <Animate key={index} to="1" from="0.5" attributeName="opacity">
          <GalleryListUpdate key={cat} galleryData={galleryData} category={cat} styleClass={galleryImgStyle} deleteProduct={deleteProduct} />
        </Animate>
      ))}
      {galleryLoaded &&
        <Callout style={{ maxWidth: "945px", display: "block", margin: "1.5rem auto" }} />}

    </div>
  );
};

export default Admin;