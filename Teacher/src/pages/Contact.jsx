import React from 'react'
import LocationMap from '../components/Static/Contactmap/LocationMap'
import '../components/Static/ShortIntro/ShortIntro.css';

const Contact = () => {
    return (
        <>
            <div className="d-flex mt-5 justify-content-center">
                <h6><i className="fa-solid fa-phone ms-5"></i> Contact: 1234567890</h6>
                <h6><i className="fa-solid fa-clock ms-5"></i> 6:00AM to 5:00PM</h6>
                <h6><i className="fa-solid fa-envelope ms-5"></i> help@PurpleSchool.com</h6>
            </div>
            <div className='row d-flex mt-5 intro-container'>
                <div className="col-md-6 img-container">
                    <LocationMap />
                </div>
                <div className="col-md-6 info-container">
                    <h1>Address</h1>
                    <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolore repellat laudantium sed deserunt excepturi numquam temporibus eos voluptatum ab dolor error quidem tenetur, expedita a dignissimos necessitatibus, autem earum!</h6>

                </div>
            </div>
        </>
    )
}

export default Contact