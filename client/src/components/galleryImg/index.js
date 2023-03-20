import React from 'react';


const GalleryImg = ({ data, styleClass }) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    return (
        <div>
            <img loading='lazy' width="200px" height="200px" onLoad={() => setImageLoaded(true)}
                className={`smooth-image image-${imageLoaded ? 'visible' : 'hidden'} ${styleClass}`} src={data.image} alt="Product" />
        </div>
    );
};

export default GalleryImg;