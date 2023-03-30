import React from 'react';

function index({ index, item, removeItem }) {
    const verticallyCenteredItem = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    return (

        <div className="row">

            <div className="card col-10" style={{ padding: "1rem" }}>
                <div className="row">
                    <div className="col-3">
                        <img src={item.image} className="thumbnail" style={{ maxWidth: "6rem" }} alt="..." />
                    </div>
                    <div className="col-5" style={{ textAlign: "left" }}>
                        <strong>{item.name}</strong>
                        <br />
                        Each: ${item.price}
                        <br />
                        Quantity: {item.quantity}
                    </div>
                    <div className="col-2 ms-auto" style={verticallyCenteredItem}>
                        ${item.price * item.quantity}
                    </div>
                </div>
            </div>
            <div className=" card col-2" style={{ ...verticallyCenteredItem, cursor: "pointer" }} onClick={() => removeItem()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(220,52,68)" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg></div>

        </div>

    );
}

export default index;