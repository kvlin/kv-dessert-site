import React, { useState } from 'react';
import "./index.css"
const CategoryAddForm = ({ categories }) => {
    console.log(categories)
    const [newCategory, setNewCategory] = useState()

    const handleFormSubmit = (event) => {
        if (newCategory || newCategory != null) {

            const postData = async () => {
                const res = await fetch('/api/addCategory', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ values: [...categories, newCategory] })
                })
                const data = await res.json();
                console.log(data.created)
                if (data.created) {
                    window.location.reload()
                }


            }
            setNewCategory("")
            postData();
        }
        event.preventDefault();

    }

    return (
        <div id="category-add-form">
            <form onSubmit={handleFormSubmit}>
                <input defaultValue={newCategory}
                    name="category"
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="form-input col-6 "></input>
                <button className="btn col-6 " type="submit">
                    Add category
                </button>
            </form>
        </div >

    );
};

export default CategoryAddForm;