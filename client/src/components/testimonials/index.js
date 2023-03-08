import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {
    MDBRow,
    MDBCol,
    MDBCard,
} from "mdb-react-ui-kit";
import './index.css'

function Testimonials({ testimonials }) {
    // name, city, comment
    console.log(testimonials)
    return (
        <>
            <h1>Some love from our customers</h1>
            <Carousel variant="dark" id="carousel">
                {testimonials && testimonials.map((t, i) => (
                    <Carousel.Item key={i}>
                        <MDBRow>
                            {t.map((tt, ii) => (

                                <MDBCol key={ii} lg="4" className="mb-5 mb-md-0">
                                    <div className="card testimonial-card">
                                        <h5 className="mb-3 text-primary">{tt.name}</h5>
                                        <h6 className="mb-3">{tt.city}</h6>
                                        <p className="px-xl-3">
                                            {tt.comment}
                                        </p>
                                    </div>
                                </MDBCol>

                            ))}
                        </MDBRow>
                    </Carousel.Item>
                ))}
            </Carousel>

        </>
    );
}

export default Testimonials;