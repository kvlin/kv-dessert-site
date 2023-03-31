import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../utils/AuthContext';
import CartItemCard from '../cartItemCard';
import Alert from 'react-bootstrap/Alert'

const ShoppingCart = () => {
    const user = useContext(AuthContext);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [items, setItems] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    useEffect(() => {
        if (user.user == undefined)
            setShowLoginAlert(true)
        setDataFetched(true)

    }, [user])
    // use useEffect to fetch items from the database and set them to the items state with request to 'api/shoppingCart/:id'
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/cart`);
            const data = await res.json();
            console.log(data);
            setItems(data[0].cart);
            setDataFetched(true);
        }
        fetchData();
    }, [])
    // const addItem = (item) => {
    //     setItems([...items, item]);
    // };

    const removeItem = async (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        const res = await fetch(`http://3.15.220.133/api/cart`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ toDelete: items[index].name })
        });
        const data = await res.json();

        setItems(newItems);
    };

    const clearCart = async () => {
        // fetch delete method api with '/api/cartAll' 
        const res = await fetch(`/api/cartAll`, {
            method: 'DELETE'
        });
        const data = await res.json();
        if (data.cleared) {
            setItems([]);
        }

    }

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div >
            {showLoginAlert &&
                <Alert variant="warning" onClose={() => showLoginAlert(false)} >
                    <Alert.Heading>Please <Alert.Link href="/login">login</Alert.Link> to access cart.</Alert.Heading>
                </Alert>
            }
            {showCheckout &&
                <Alert variant="warning" onClose={() => setShowCheckout(false)} dismissible>
                    <Alert.Heading>To be continued...</Alert.Heading>
                    As this is not a real store, the checkout and payment functionalities are not implemented :)
                </Alert>
            }

            <div style={{ paddingTop: "3rem" }}>
                <h2>Shopping Cart</h2>
                <br />
                {!dataFetched && <p>Loading...</p>}
                {dataFetched && items.length !== 0 ?
                    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                        <ul style={{ paddingLeft: "0 " }}>
                            {items.map((item, index) => (
                                <div key={index}>
                                    <CartItemCard item={item} removeItem={() => removeItem(index)} />
                                    <br />
                                </div>
                            ))}
                        </ul>
                        <p>Total: ${total}</p>
                        <div style={{ justifyContent: "space-between", display: "flex" }}>
                            <button className="btn btn-danger" onClick={() => clearCart()}>Clear Cart</button>
                            <button className="btn btn-success" onClick={() => setShowCheckout(true)}>Checkout</button>

                        </div>
                    </div> :
                    null}
                {dataFetched && items.length === 0 ? <p>Your cart is empty</p> : null}
            </div >
        </div>
    );
};

export default ShoppingCart;