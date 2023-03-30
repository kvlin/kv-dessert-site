import React, { useState, useRef, useEffect } from "react";
import "./index.css"
const ProductForm = ({ categories }) => {
    const [formState, setFormState] = useState({
        productName: "",
        category: categories[0]
    });
    const [imageUploaded, setImageUploaded] = useState(false)

    useEffect(() => {
        setFormState(formState, formState.category = categories[0])
    }, [categories])
    // update state based on form input changes
    const handleChange = (event) => {

        if (event.target.value.length <= 280) {
            setFormState({ ...formState, [event.target.name]: event.target.value });
        }

    };

    // submit form
    const handleFormSubmit = (event) => {
        event.preventDefault();

        // clear form value
        setFormState({ productName: "", createdAt: "" });
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
                setImageUploaded(true)
                console.log("postImage: ", postResponse.Location)
                return postResponse.Location;
            } catch (error) {
                console.log(error);
            }
        };
        postImage();
    };
    return (
        <div id="product-form" className="modern-form">
            <h4 className="modern-form-title">Add fa product</h4>
            {categories &&
                <form
                    className="flex-row justify-center justify-space-between-md align-stretch modern-form-inner"
                    onSubmit={handleFormSubmit}
                >
                    <input
                        placeholder="Name"
                        name="productName"
                        value={formState.productName}
                        className="form-input col-6 modern-input"
                        onChange={handleChange}
                    ></input>
                    <select value={formState.category}
                        placeholder="category"
                        name="category"
                        className="form-input col-6 modern-select"
                        onChange={handleChange}
                    >
                        {categories.map((category) =>
                            <option key={category} value={category}>{category}</option>
                        )}
                    </select>
                    <div style={{ backgroundColor: "white", borderRadius: "5px" }}>
                        <label className="form-input col-12  p-1 modern-label">
                            <strong>Upload product image:</strong>
                            <input type="file" accept="image/*" ref={fileInput} className="form-input p-2 file-input" />
                            <button className="btn btn-secondary" onClick={handleImageUpload} type="submit">
                                Upload image
                            </button>
                        </label>
                    </div>

                    <button disabled={!imageUploaded} className="btn btn-success col-6 " style={{ marginTop: "10px", color: 'white' }} type="submit">
                        Add product
                    </button>
                </form>
            }
        </div>
    );
};

export default ProductForm;
