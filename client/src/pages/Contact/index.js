import React, { useState, useEffect } from 'react';
//import Map from '../../components/map'
import mapScreenshot from "../../components/map/Screenshot.PNG"
import ContactDetails from '../../components/contactDetails';
import "./index.css"


function Contact(props) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [contactDetails, setContactDetails] = useState("")
    const [contactDetailsOrder, setContactDetailsOrder] = useState(false)
    useEffect(() => {
        const fetchContactDetailsAndOrder = async () => {
            try {
                const res = await fetch('http://3.15.220.133/api/settings');
                const jsonData = await res.json();
                console.log(jsonData)
                jsonData.forEach((config) => {
                    if (config.configs === "contactInfo") {
                        setContactDetails(config.values)
                    }
                    if (config.configs === "contactDetailsOrder") {
                        setContactDetailsOrder(config.values)
                    }
                })

            } catch (error) {
                console.log(error);
            }
        }
        fetchContactDetailsAndOrder()
    }, [])


    return (
        <div className="row" style={{ paddingTop: "3rem" }}>
            <div className="col-12">
                <h1 className="page-title">Contact</h1>
            </div>
            <div className="col">
                <div className="row d-flex flex-lg-row-reverse ">
                    <div className="col-lg-6">
                        <ContactDetails contactDetails={contactDetails} order={contactDetailsOrder} />
                    </div>
                    <div id="map-col" className="col-lg-6">
                        <p>(Random screenshot of the map for demo purpose)</p>
                        <img onLoad={() => setImageLoaded(true)} src={mapScreenshot} className={`smooth-image image-${imageLoaded ? 'visible' : 'hidden'}`} alt="Screenshot of the location on Google Map" />
                        <button type="button" className="btn btn-primary"

                            id="mapButton">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z" />
                            </svg>

                            Get directions
                        </button>


                    </div>

                </div>
            </div>
        </div>
    );
}

export default Contact;