import React, { useState } from 'react';

const ShoppingCart = () => {
    const [items, setItems] = useState([{ name: "coke", price: 2.00 }, { name: "sprite", price: 3.00 }]);

    const addItem = (item) => {
        setItems([...items, item]);
    };

    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const total = items.reduce((acc, item) => acc + item.price, 0);

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