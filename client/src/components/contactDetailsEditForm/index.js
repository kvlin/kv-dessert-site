import React from 'react';
import ContactDetailsExpandInput from '../contactDetailsExpandInput';
const ContactDetailsEditForm = ({ contactDetails, order }) => {
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
                    <ContactDetailsExpandInput heading={heading} contactDetailsData={tempContactObj[heading]} />
                </div>

            ))}
        </address>
    );
};

export default ContactDetailsEditForm;