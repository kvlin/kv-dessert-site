import React, { useState, useEffect, useRef } from 'react'
// import ProductSectioning from '../productSectioning'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./index.css"
const GalleryList = ({ galleryData, category, styleClass, deleteProduct, }) => {
    // console.log(galleryData)
    // console.log(category)
    // Initial load
    const isInitialMount = useRef(true);
    //Modal state
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [filteredProduct, setFilteredProduct] = useState(false);
    const [saveStatus, setSaveStatus] = useState(false)
    const [productOrder, setProductOrder] = useState({})
    const [orderRepeated, setOrderRepeated] = useState(false)
    const [productToDelete, setProductToDelete] = useState([])
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



        // setTimeout(() => {
        //     setFilteredProduct(a)
        // }, 3000)
        // const orderObj = galleryData.filter((data) => {
        //     if (data.category === category) {

        //         return { [data.productName]: data.createdAt }
        //     }

        // })
        // setProductOrder({ ...productOrder, orderObj })
        // console.log(productOrder)

    }, [])

    // Show modal on productToDelete state update
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // Your useEffect code here to be run on update
            handleShow()
            console.log(productToDelete)
        }
    }, [productToDelete])

    const validateChanges = (data) => {

    }

    const checkOrderRepeated = (orderArray) => {
        orderArray.forEach((order) => { })
    }
    // const onInputChange = (event) => {
    //     let currentIndex = event.target.dataset.index
    //     // Update order index in the original list
    //     // setFilteredProduct({...filteredProduct[currentIndex],[event.target.name]:event.target.value} )
    //     let testUpdateIndex = {...filteredProduct[currentIndex],[event.target.name]:event.target.value}
    //     // go through the list and check if duplicate indexes exists
    //     filteredProduct.forEach((product) => {

    //         if (product.name !== event.target.name && product.createdAt === event.target.createdAt) {
    //             console.log("duplicate found: ", event.target.createdAt)
    //         } 

    //     })
    //     console.log(event.target.value)
    //     setProductOrder({...productOrder, [event.target.name]:event.target.value})
    //     console.log(productOrder)
    // }

    // Confirm Delete and reset to initial page load ref and state update to null
    const confirmDelete = async () => {
        deleteProduct(productToDelete);

        modalClose()
        if (deleteProduct(productToDelete)) {
            console.log("okk")
            const oldGalleryData = [...galleryData]

            const newGalleryData = oldGalleryData.filter(product => {
                if (product.productName != productToDelete.productName && product.category == category) {
                    console.log(product)
                    return product
                }
            })

            console.log([...newGalleryData])
            if (newGalleryData.length === 0) {
                window.location.reload(); // reload to remove the section/category title when there is no product

            } else {
                setFilteredProduct([...newGalleryData])
            }
        }
    }
    // Modal closed, so reset to null
    const modalClose = () => {
        handleClose();
        isInitialMount.current = true;
        setProductToDelete(null)
    }


    // // if no product found for a category return nothing
    // if (filteredProduct.length === 0) return
    return (

        <div key={category} className="row d-flex justify-content-center product-section dets ">
            <h2 className="category-title">{category[0].toUpperCase().concat(category.slice(1), 's')}</h2>
            {filteredProduct && filteredProduct.map(({ productName, createdAt, image, category }) => (
                <div key={createdAt} className="col-auto product-details d-flex flex-column" >
                    {/* <input data-index={data.displayIndex} type="number" name={data.productName} defaultValue={data.createdAt} onChange={e=>onInputChange(e)}  ></input> */}
                    <div className={"btn btn-danger"} onClick={() => setProductToDelete({ productName, createdAt })}>Delete product</div>
                    <img name={productName} onLoad={() => setImageLoaded(true)}
                        className={`smooth-image image-${imageLoaded ? 'visible' : 'hidden'} ${styleClass}`} src={image} alt="Product" />
                </div>

            ))
            }

            {/* {filteredProduct && <div onClick={() => validateChanges()} className='btn btn-success'>Save changes</div>} */}
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
            {/* <ProductSectioning/> */}
        </div>

    )
}

export default GalleryList  