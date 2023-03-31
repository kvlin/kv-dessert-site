import React from 'react';
import './index.css'

const GalleryImg = ({ data, styleClass }) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    return (
        <div className="productContainer" >
            <a href={`productDetails?name=${data.productName}`}>
                <img onLoad={() => setImageLoaded(true)}
                    className={` smooth-image image-${imageLoaded ? 'visible' : 'hidden'} ${styleClass}`} src={data.image} alt="Product" />

            </a>
            {imageLoaded &&
                <>
                    <div >{data.productName}</div>
                    <div >${data.price}</div>
                    <div className="middle">
                        <div className="text">{data.description}</div>
                    </div>
                </>
            }


        </div>
    );
};

export default GalleryImg;