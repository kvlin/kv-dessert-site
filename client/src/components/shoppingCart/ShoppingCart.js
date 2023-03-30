import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../utils/AuthContext';
import CartItemCard from '../cartItemCard';
const ShoppingCart = () => {

    const user = useContext(AuthContext);
    console.log(user.user);
    const [items, setItems] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
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
        const res = await fetch(`/api/cart`, {
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
        <div style={{ paddingTop: "3rem" }}>
            <h2>Shopping Cart</h2>
            <br />
            {!dataFetched && <p>Loading...</p>}
            {dataFetched && items.length !== 0 ?
                <>
                    <ul style={{ maxWidth: "600px", margin: "0 auto" }}>
                        {items.map((item, index) => (
                            <div key={index}>
                                <CartItemCard item={item} removeItem={() => removeItem(index)} />
                                <br />
                            </div>
                        ))}
                    </ul>
                    <p>Total: ${total}</p>
                    <button className="btn btn-danger" onClick={() => clearCart()}>Clear Cart</button>
                </> :
                null}
            {dataFetched && items.length === 0 ? <p>Your cart is empty</p> : null}
        </div>
    );
};

export default ShoppingCart;