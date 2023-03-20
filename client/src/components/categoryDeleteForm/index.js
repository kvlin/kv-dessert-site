import React, { useState } from 'react';
import "./index.css"
const CategoryAdd = ({ categories }) => {
    const [currentCategory, setCurrentCategory] = useState()

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (currentCategory || currentCategory != null) {
            const updatedCategories = categories.filter(c => c !== currentCategory)
            console.log(updatedCategories)
            const deleteData = async () => {
                const res = await fetch('/api/deleteCategory', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ values: [...updatedCategories] })
                })
                const data = await res.json();
                console.log(data.created)
                if (data.created) {
                    window.location.reload()
                }


            }
            setCurrentCategory("")
            deleteData();
        }


    }

    return (
        <div id="category-delete-form">
            <form onSubmit={handleFormSubmit}>
                <select defaultValue={currentCategory}
                    placeholder="Category to delete"
                    name="category"
                    className="form-input col-6 "
                    onChange={(e) => setCurrentCategory(e.target.value)}
                >
                    {categories && categories.map(category =>
                        <option key={category} value={category}>{category}</option>
                    )}
                </select>
                <input defaultValue={currentCategory}
                    name="category"
                    onChange={(e) => setCurrentCategory(e.target.value)}
                    className="form-input col-6 "></input>
                <button className="btn col-6 " type="submit">
                    Delete category
                </button>
            </form>
        </div >

    );
};

export default CategoryAdd;