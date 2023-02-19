import React from 'react';
import './index.css'
const ContactDetailsExpand = ({ heading, contactDetailsData }) => {
    console.log(contactDetailsData)
    const address = heading == "address";
    console.log(address)
    return (
        <p style={{ "whiteSpace": "pre-line" }}>
            {heading ? contactDetailsData.map((c, i) => {
                return (`${c} \n`)
            }) : ""}
        </p>

    );
};

export default ContactDetailsExpand;