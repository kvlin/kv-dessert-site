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
        <div id="category-delete-form" className="modern-form">
            <h4 className="modern-form-title">Delete a category</h4>
            <form onSubmit={handleFormSubmit}>
                <div className="row">
                    <select defaultValue={currentCategory}
                        placeholder="Category to delete"
                        name="category"
                        className="form-input col-7 modern-select"
                        onChange={(e) => setCurrentCategory(e.target.value)}
                    >
                        {categories && categories.map(category =>
                            <option key={category} value={category}>{category}</option>
                        )}
                    </select>
                    <button className="btn col-5" style={{ color: 'white', backgroundColor: 'rgb(226, 65, 132)' }} type="submit">
                        Delete
                    </button>
                </div>
            </form>
        </div >

    );
};

export default CategoryAdd;
