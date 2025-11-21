import React from 'react'
import './Facility.css'
import FacilityData from './FalicityData.json'

const Facility = () => {
    return (
        <>
            <h1 className='facilityHeading'>Student Facilities</h1>
            <div className="facility-container">
                {FacilityData.map((d, i) => (
                    <div className="card" key={i}>
                        <i className={`${d.icon} card-img-top`}></i>
                        <div className="card-body">
                            <h5 className="car-title">{d.title}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Facility