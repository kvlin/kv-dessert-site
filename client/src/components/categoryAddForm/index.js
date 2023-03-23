import React, { useState } from 'react';
import "./index.css"
const CategoryAddForm = ({ categories }) => {
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
        <div id="category-add-form" className="modern-form">
            <h4 className="modern-form-title">Add a category</h4>
            <form onSubmit={handleFormSubmit}>
                <input placeholder="Name" defaultValue={newCategory}
                    name="category"
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="form-input col-8 modern-input" ></input>
                <button className="btn col-4" style={{ color: 'white', backgroundColor: 'rgb(34, 126, 187)' }} type="submit">
                    Add
                </button>
            </form>
        </div >

    );
};

export default CategoryAddForm;


