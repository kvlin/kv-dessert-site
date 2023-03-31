import React, { useState, useEffect } from 'react';
import GalleryList from '../../components/galleryList';
import Callout from '../../components/callout';
import Animate from 'react-smooth'

import './index.css'
import Testimonials from '../../components/testimonials';

function Home(props) {

  const galleryImgStyle = "galleryImgStyle"
  // useEffect(()=>{
  //     fetchProducts('Thoughts').then(res => setGalleryData(res));
  // },[])
  const [galleryData, setGalleryData] = useState(false);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [testimonialsData, setTestimonialData] = useState([]);
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const res = await fetch('http://3.15.220.133/api/allProducts');
        const jsonData = await res.json();
        // sort the array by createdAt property ordered by descending values
        const data = jsonData.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
        // const allCategories = data.forEach(d => { uniqueCategories.add(d.category) })
        // setCategories(Array.from(uniqueCategories))

        setGalleryData(data)
        setGalleryLoaded(true)

      } catch (error) {
        console.log(error);
      }
    }


    const fetchSettings = async () => {
      try {
        const res = await fetch('http://3.15.220.133/api/settings');
        const jsonData = await res.json();
        jsonData.forEach(d => {
          if (d.configs === "categories") {
            setCategories(d.values)
          }
          if (d.configs === "testimonials") {
            setTestimonialData(d.values)
          }
        })

      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
    fetchSettings();


  }, []);


  // if (!galleryData) {
  //   return <><div id="loader"></div></>;
  // }
  return (

    <div>
      <Animate to="1" from="0.5" attributeName="opacity">
        <div className="jumbotron d-flex flex-column justify-content-center" >
          <p className=" display-6 ">Boutique dessert shop </p>
          <p className=" display-6 ">in heart of Sydney </p>
        </div>
      </Animate>
      {/* <Animate to="1" from="0.5" attributeName="opacity">
            <img style={{width: '100%', minWidth:"300px"}} src={slideExample}/>
            </Animate> */}
      {/* <button onClick={() => fetchProductsFormDynamoDb()}> Fetch </button> */}

      {/* {galleryData[0]  && 
              <GalleryList  galleryData={galleryData} styleClass={galleryImgStyle}/> } */}

      {galleryLoaded && categories.map((cat, index) => (
        <GalleryList key={cat} galleryData={galleryData} category={cat} styleClass={galleryImgStyle} />
      ))}
      {galleryLoaded &&
        <Testimonials testimonials={testimonialsData} />}
      {galleryLoaded &&
        <Callout style={{ maxWidth: "945px", display: "block", margin: "1.5rem auto" }} />}


    </div>
  );
}

export default Home;