import React , {useState, useEffect} from 'react';
import slideExample from "../../components/assets/images/slide-example.PNG"
import jumboBgImg from "../../components/assets/images/jumbo-bg-img2.PNG"
import GalleryList from '../../components/galleryList';
import Callout from '../../components/callout';
import Animate from 'react-smooth'

import {  Container, Row, Col } from 'react-bootstrap';
import './index.css'
function Home(props) {

  const galleryImgStyle = "galleryImgStyle"
    // useEffect(()=>{
    //     fetchData('Thoughts').then(res => setGalleryData(res));
    // },[])
    const [galleryData, setGalleryData] = useState(false);
    const [galleryLoaded, setGalleryLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
      useEffect(() => {
        const uniqueCategories = new Set();
        const fetchData = async () => {
          try {
            const res = await fetch('/api/allProducts');
            const jsonData = await res.json();
            // sort the array by createdAt property ordered by descending values
             const data = jsonData.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
            console.log(data)

            const allCategories = data.forEach(d => {uniqueCategories.add(d.category)})
            setCategories(Array.from(uniqueCategories))

            setGalleryData(data)
            setGalleryLoaded(true)
            
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
        setTimeout(()=>{
          

         console.log(categories)
       },3000)
        
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
            {/* <button onClick={() => fetchDataFormDynamoDb()}> Fetch </button> */}

            {/* {galleryData[0]  && 
              <GalleryList  galleryData={galleryData} styleClass={galleryImgStyle}/> } */}
            
            {galleryLoaded &&  categories.map((cat, index) => (
               <Animate  key={cat} to="1" from="0.5" attributeName="opacity"><GalleryList key={cat} galleryData={galleryData} category={cat} styleClass={galleryImgStyle}/>
              </Animate>
              ))} 
            {galleryLoaded && 
              <Callout  style={{maxWidth:"945px", display: "block", margin: "1.5rem auto"}}/>}
  
        </div>
    );
}

export default Home;