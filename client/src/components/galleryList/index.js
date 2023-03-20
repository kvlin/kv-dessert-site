import React, { useEffect, lazy } from 'react'
// import GalleryImg from '../galleryImg';
// import ProductSectioning from '../productSectioning'
import "./index.css"

const GalleryImg = lazy(() => import('../galleryImg/index.js'))
const GalleryList = ({ galleryData, category, styleClass }) => {


    const [filteredProduct, setFilteredProduct] = React.useState([]);

    useEffect(() => {
        const filteredList = galleryData.filter(data => data.category === category);
        setFilteredProduct(filteredList);
    },[galleryData, category]);
    // if no product found for a category return nothing
    if (filteredProduct.length === 0) return


    return (
        <div key={category} className="row d-flex justify-content-center product-section dets ">

            <h2 className="category-title">{category[0].toUpperCase().concat(category.slice(1), 's')}</h2>
            {filteredProduct && filteredProduct.map((data) => (
                <div key={data.createdAt} className="col-auto product-details" >
                    <GalleryImg data={data} styleClass={styleClass} />

                </div>

            ))

            }
            {/* <ProductSectioning/> */}

        </div>
    )
}

export default GalleryList