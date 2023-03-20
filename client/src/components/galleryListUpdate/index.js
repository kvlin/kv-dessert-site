import React, { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./index.css"

const GalleryList = ({ galleryData, category, styleClass, deleteProduct }) => {
    const isInitialMount = useRef(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [filteredProduct, setFilteredProduct] = useState(false);
    const [productToDelete, setProductToDelete] = useState([])

    useEffect(() => {
        const filteredList = galleryData.filter(data => data.category === category);
        setFilteredProduct(filteredList);
    }, [galleryData, category])

    useEffect(() => {
        if (!isInitialMount.current) {
            handleShow();
        } else {
            isInitialMount.current = false;
        }
    }, [productToDelete])

    const confirmDelete = async () => {
        deleteProduct(productToDelete);

        modalClose()
        if (deleteProduct(productToDelete)) {
            const newGalleryData = galleryData.filter(product => product.productName !== productToDelete.productName && product.category === category);

            if (newGalleryData.length === 0) {
                window.location.reload();
            } else {
                setFilteredProduct([...newGalleryData])
            }
        }
    }

    const modalClose = () => {
        handleClose();
        isInitialMount.current = true;
        setProductToDelete(null)
    }

    return (
        <div key={category} className="row d-flex justify-content-center product-section dets ">
            <h2 className="category-title">{category[0].toUpperCase().concat(category.slice(1), 's')}</h2>
            {filteredProduct && filteredProduct.map(({ productName, createdAt, image, category }) => (
                <div key={createdAt} className="col-auto product-details d-flex flex-column" >
                    <div className={"btn btn-danger"} onClick={() => setProductToDelete({ productName, createdAt })}>Delete product</div>
                    <img name={productName} onLoad={() => setImageLoaded(true)}
                        className={`smooth-image image-${imageLoaded ? 'visible' : 'hidden'} ${styleClass}`} src={image} alt="Product" />
                </div>
            ))}
            <Modal show={show} onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalClose}>
                        Back
                    </Button>
                    <Button variant="primary" id="confirmDelBtn" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default GalleryList
