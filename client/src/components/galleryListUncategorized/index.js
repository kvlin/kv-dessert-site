import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./index.css"
const GalleryListUncategorized = ({ uncategorized, styleClass, deleteProduct }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [productToDelete, setProductToDelete] = useState([])
    const [updatedProducts, setUpdatedProducts] = useState([])
    const isInitialMount = useRef(true);
    //Modal state
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // Show modal on productToDelete state update
    useEffect(() => {
        setUpdatedProducts([...uncategorized])
        console.log(uncategorized)
    }, [uncategorized])
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // Your useEffect code here to be run on update
            handleShow()
            console.log(productToDelete)
        }
    }, [productToDelete])
    const confirmDelete = async () => {
        deleteProduct(productToDelete);

        modalClose()
        if (deleteProduct(productToDelete)) {
            const oldGalleryData = [...updatedProducts]

            const newGalleryData = oldGalleryData.filter(product => {
                if (product.productName != productToDelete.productName) {
                    console.log(product)
                    return product
                }
            })

            console.log([...newGalleryData])

            if (newGalleryData.length === 0) {
                window.location.reload(); // reload to remove the section/category title when there is no product

            }
            else {
                setUpdatedProducts([...newGalleryData])
            }
        }
    }
    // Modal closed, so reset to null
    const modalClose = () => {
        handleClose();
        isInitialMount.current = true;
        setProductToDelete(null)
    }

    return (
        <div className="row d-flex justify-content-center product-section dets ">


            {updatedProducts.length > 0 && <h2 className="uncategorized-title">Uncategorized</h2>}

            {updatedProducts && updatedProducts.map(({ productName, createdAt, image, category }) => (
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


};

export default GalleryListUncategorized;