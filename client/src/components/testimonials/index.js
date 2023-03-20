import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {
    MDBRow,
    MDBCol
} from "mdb-react-ui-kit";
import './index.css'

function Testimonials({ testimonials }) {
    // name, city, comment
    return (
        <>
            <h1>Some love from our customers</h1>
            <Carousel variant="dark" id="carousel">
                {testimonials && testimonials.flatMap((t) => t).map((tt, i) => (
                    <Carousel.Item key={i}>
                        <MDBRow>
                            <MDBCol md="6" className="mb-5 mb-md-0 mx-auto">
                                <div className="card testimonial-card">
                                    <h5 className="mb-3" style={{ color: 'var(--main-theme-color)' }}>{tt.name}</h5>
                                    <h6 className="mb-3">{tt.city}</h6>
                                    <p className="px-xl-3">
                                        {tt.comment}
                                    </p>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </Carousel.Item>
                ))}
            </Carousel>

        </>
    );
}

export default Testimonials;