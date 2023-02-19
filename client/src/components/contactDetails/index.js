import React, { useState, useEffect } from 'react';
import ContactDetailsExpand from '../contactDetailsExpand';
const ContactDetails = ({ contactDetails, order }) => {
    const [orderedDetails, setOrderedDetails] = useState([])
    console.log(Object.keys(contactDetails))
    console.log(order)
    const tempContactObj = {};
    if (order) {
        order.reverse().forEach((x) => {
            tempContactObj[x] = contactDetails[x]
            console.log(tempContactObj)
        })

    }
    return (
        <address>
            {tempContactObj && Object.keys(tempContactObj).map((heading, i) => (
                <div key={heading}>
                    <strong>{heading[0].toUpperCase().concat(heading.slice(1), ":")}</strong>
                    <ContactDetailsExpand heading={heading} contactDetailsData={tempContactObj[heading]} />
                </div>

            ))}
        </address>
    );
};

export default ContactDetails;