/* eslint-disable */
import React, { useMemo, useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

function MapSection(props) {
    const { singleTransaction,containerStyle } = props
    const [isMarker, setIsMarker] = useState(false)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBDh1-A2uvWQvAZ2GiFabxchWsMdzfrbpM",
    });
    if (!isLoaded) return <div>Loading...</div>;
    function handleMarker() {
        setIsMarker(true)
        // alert(1)
    }
    function Map() {
        const center = useMemo(() => ({ lat: singleTransaction?.data?.ip_details?.latitude, lng: singleTransaction?.data?.ip_details?.longitude }), []);
        
        
        return (
            <>
                {/* {isMarker ?
                    <>
                        <div className='marker-label'>
                           
                            <div className='text-data-marker'>
                                <span>Ip geolocation</span>
                                <span>{singleTransaction?.data?.ip_details?.latitude},{singleTransaction?.data?.ip_details?.longitude}</span>
                            </div>
                        </div>
                    </>
                    : null} */}
                    {/* {singleTransaction?.data?.ip_details?.latitude==0?<div className='no data'>
                    <span>Sorry we don't have any location to show</span>
                    </div>: */}
                    <GoogleMap zoom={10} center={center} mapContainerStyle={containerStyle} mapContainerClassName="map-container">

                    <Marker onClick={handleMarker} position={center} />
                </GoogleMap>
                {/* } */}
            </>
        );
    }
    return (
        <div> <Map /></div>
    )
}

export default MapSection