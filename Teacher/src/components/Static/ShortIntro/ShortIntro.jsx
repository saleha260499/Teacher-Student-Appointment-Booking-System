import React from 'react'
import './ShortIntro.css';
import ImageClass from '../../../assets/images/Classroom/Classroom1.jpg'

const ShortIntro = () => {
    return (
        <>
            <div className="intro-container">
                <div className='row'>
                    <div className="col-md-6 img-container">
                        <img src={ImageClass} alt='ImageClass' className='class-image' />
                    </div>
                    <div className="col-md-6 info-container">
                        <h1>Purple School</h1>
                        <h6>A Super special School</h6>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus facere saepe iste magni impedit, ex molestiae aperiam vero nulla obcaecati illum ipsum fuga sequi neque eligendi, ipsa in consequatur placeat aspernatur dicta beatae, officiis at error quae? Iure, quae rerum perferendis sapiente officia magnam cum nulla, sed similique impedit delectus.</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus facere saepe iste magni impedit, ex molestiae aperiam vero nulla obcaecati illum ipsum fuga sequi neque eligendi, ipsa in consequatur placeat aspernatur dicta beatae, officiis at error quae? Iure, quae rerum perferendis sapiente officia magnam cum nulla, sed similique impedit delectus.</p>
                        <button className='btn btn-success'>Book Appointment</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShortIntro