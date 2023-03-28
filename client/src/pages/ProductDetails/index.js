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
                            quantity
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
        <Row>
            <Col md={4}>
                <Image src={image} alt={productName} fluid />
            </Col>
            <Col md={8}>
                <h1>{productName}</h1>
                <p>{description}</p>
                <p>Price: ${price}</p>
                <Form>
                    <Form.Group>
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default ProductDetails;