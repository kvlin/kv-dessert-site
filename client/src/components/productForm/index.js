import React, { useState, useRef } from "react";
import "./index.css"
const ProductForm = ({ categories }) => {
    const [formState, setFormState] = useState({
        productName: "",
        category: "",
    });
    const [characterCount, setCharacterCount] = useState(0);
    const [categoryOption, setCategoryOption] = useState("")
    // update state based on form input changes
    const handleChange = (event) => {

        if (event.target.value.length <= 280) {
            setFormState({ ...formState, [event.target.name]: event.target.value });
            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = (event) => {
        event.preventDefault();

        // clear form value
        setFormState({ productName: "", createdAt: "" });
        setCharacterCount(0);
        const postData = async () => {
            const res = await fetch('/api/addProduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            })
            const data = await res.json();
            console.log(data.created)
            if (data.created) {
                window.location.reload()
            }


        }
        postData();
    };

    const fileInput = useRef(null);

    const handleImageUpload = event => {
        event.preventDefault();
        // new HTTP form for image upload
        const data = new FormData();
        data.append('image', fileInput.current.files[0]);

        const postImage = async () => {
            try {
                const res = await fetch('/api/image-upload', {
                    mode: 'cors',
                    method: 'POST',
                    body: data
                })
                if (!res.ok) throw new Error(res.statusText);
                const postResponse = await res.json();
                // Add image URL to the form
                setFormState({ ...formState, image: postResponse.Location })
                console.log("postImage: ", postResponse.Location)
                return postResponse.Location;
            } catch (error) {
                console.log(error);
            }
        };
        postImage();
    };
    return (
        <div id="product-form">
            {/* <p className={`m-0 ${characterCount === 280 ? "text-error" : ""}`}>
                Character Count: {characterCount}/280
            </p> */}
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <input
                    placeholder="Name"
                    name="productName"
                    value={formState.productName}
                    className="form-input col-6 "
                    onChange={handleChange}
                ></input>
                <select value={formState.category}
                    placeholder="category"
                    name="category"
                    className="form-input col-6 "
                    onChange={handleChange}
                >
                    {categories && categories.map(category =>
                        <option key={category} value={category}>{category}</option>
                    )}
                </select>
                <label className="form-input col-12  p-1">
                    Upload product image:
                    <input type="file" ref={fileInput} className="form-input p-2" />
                    <button className="btn" onClick={handleImageUpload} type="submit">
                        Upload
                    </button>
                </label>
                <button className="btn col-6 " type="submit">
                    Add product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;