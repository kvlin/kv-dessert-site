import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import AuthContext from '../../utils/AuthContext';
const ProductDetails = () => {
    const user = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [waitingDB, setWaitingDB] = useState(false);
    const queryParameters = new URLSearchParams(window.location.search)
    const queryProductName = queryParameters.get("name")

    const [quantity, setQuantity] = useState(1);
    const [productDetails, setProductDetails] = useState({})
    const { image, productName, description, price } = productDetails;
    useEffect(() => {
        if (user.user == undefined)
            setShowLoginAlert(true)

    }, [user])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://3.15.220.133/api/product/' + queryProductName);
                const data = await res.json();
                // sort the array by createdAt property ordered by descending values
                setProductDetails(data[0])
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, []);


    const handleQuantityChange = event => {
        setQuantity(parseInt(event.target.value));
    };

    const handleAddToCart = (event) => {

        event.preventDefault();
        if (!user.isAuthenticated) {
            setShowLoginAlert(true)
            return
        }
        setWaitingDB(true);
        const addToCart = async () => {
            try {
                const res = await fetch('http://3.15.220.133/api/cart', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        toCart: {
                            name: productName,
                            price,
                            quantity,
                            image

                        }

                    })
                });
                const data = await res.json();
                if (data.created) {
                    setWaitingDB(false);
                    setShow(true);
                }
            } catch (error) {
                console.log(error);

            }
        }
        addToCart();
        console.log(`Added ${quantity} ${productName} to cart!`);
    };
    // Close the modal automatically after 5 seconds
    if (show) {
        setTimeout(() => {
            setShow(false)
        }, 5000)
    }
    return (
        <div >
            {showLoginAlert &&
                <Alert variant="warning" onClose={() => showLoginAlert(false)} >
                    <Alert.Heading>Please <Alert.Link href="/login">login</Alert.Link> to access cart.</Alert.Heading>
                </Alert>
            }
            {
                waitingDB &&
                <Alert variant="warning" onClose={() => setShow(false)} >
                    <Alert.Heading>Loading...</Alert.Heading>
                </Alert>
            }
            {
                show &&
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Success!</Alert.Heading>
                    {quantity} {productName} added to  <Alert.Link href="/shoppingCart">cart</Alert.Link>!
                </Alert>
            }
            <Row style={{ paddingTop: "3rem" }}>
                <Col sm={4}>
                    <Image src={image} alt={productName} fluid />
                </Col>
                <Col sm={8}>
                    <h1>{productName}</h1>
                    <p>{description}</p>
                    <p>Price: ${price}/each</p>
                    <Form style={{ maxWidth: "300px", margin: "0 auto" }}>
                        <Form.Group>
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control
                                style={{ maxWidth: "5rem", margin: "0 auto" }}
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                            />
                        </Form.Group>
                        <br />
                        <Button variant="primary" onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div >
    );
};

export default ProductDetails;