import React from 'react'

const LocationMap = () => {
    return (
        <>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d18169.040765104237!2d72.98251995381119!3d21.6885462776667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1756308770150!5m2!1sen!2sin"
                width={800}
                height={400}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />

        </>
    )
}

export default LocationMap