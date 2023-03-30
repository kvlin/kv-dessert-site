import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';

const ProductDetails = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const queryProductName = queryParameters.get("name")

    const [quantity, setQuantity] = useState(1);
    const [productDetails, setProductDetails] = useState({})
    const { image, productName, description, price } = productDetails;
    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/product/' + queryProductName);
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
        const addToCart = async () => {
            try {
                const res = await fetch('/api/cart', {
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
                console.log(data)
            } catch (error) {
                console.log(error);

            }
        }
        addToCart();
        console.log(`Added ${quantity} ${productName} to cart!`);
    };

    return (
        <div style={{ paddingTop: "3rem" }}>
            <Row >
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
        </div>
    );
};

export default ProductDetails;