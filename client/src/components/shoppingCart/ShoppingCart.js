import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../utils/AuthContext';
const ShoppingCart = () => {

    const user = useContext(AuthContext);
    console.log(user.user);
    const [items, setItems] = useState([{ name: "coke", price: 2.00 }, { name: "sprite", price: 3.00 }]);
    // use useEffect to fetch items from the database and set them to the items state with request to 'api/shoppingCart/:id'
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/shoppingCart`);
            const data = await res.json();
            console.log(data);
            setItems(data[0].cart);
        }
        fetchData();
    }, [])
    const addItem = (item) => {
        setItems([...items, item]);
    };

    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price}
                        <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total: ${total}</p>
            <button onClick={() => setItems([])}>Clear Cart</button>
        </div>
    );
};

export default ShoppingCart;