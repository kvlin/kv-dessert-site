import React, { useEffect } from 'react'
// import ProductSectioning from '../productSectioning'
import "./index.css"
const GalleryList = ({ galleryData, category, styleClass }) => {
    // console.log(galleryData)
    // console.log(category)


    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [filteredProduct, setFilteredProduct] = React.useState([]);
    // const filteredList = [];


    // galleryData.forEach((data) => {
    //    if(data.category === category)
    //    filteredList.push(data)
    // })

    useEffect(() => {
        const filteredList = galleryData.filter((data) => {
            if (data.category === category) {
                return data
            }

        })
        setFilteredProduct(filteredList)

    }, [])
    // if no product found for a category return nothing
    if (filteredProduct.length === 0) return


    return (
        <div key={category} className="row d-flex justify-content-center product-section dets ">
            <h2 className="category-title">{category[0].toUpperCase().concat(category.slice(1), 's')}</h2>
            {filteredProduct && filteredProduct.map((data) => (
                <div key={data.createdAt} className="col-auto product-details" >
                    <img onLoad={() => setImageLoaded(true)}
                        className={`smooth-image image-${imageLoaded ? 'visible' : 'hidden'} ${styleClass}`} src={data.image} alt="Product" />
                </div>

            ))

            }
            {/* <ProductSectioning/> */}
        </div>
    )
}

export default GalleryList