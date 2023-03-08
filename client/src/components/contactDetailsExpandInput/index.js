import React from 'react';
const ContactDetailsExpandInput = ({ heading, contactDetailsData }) => {
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

export default ContactDetailsExpandInput;