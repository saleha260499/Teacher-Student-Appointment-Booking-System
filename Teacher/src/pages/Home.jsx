import React from 'react';
import Slider from '../components/Slider/slider';
import Facility from '../components/Static/Facility/Facility';
import ShortIntro from '../components/Static/ShortIntro/ShortIntro';
const Home = () => {
    return (
        <>
            <Slider />
            {/* Facility */}
            <Facility />
            {/* short hospital intro */}
            <ShortIntro>

            </ShortIntro>
        </>
    )
}

export default Home