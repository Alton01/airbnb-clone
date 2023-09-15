import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";



export default function IndexPage() {
    const [places,setPlaces] = useState([]);
    useEffect (() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);

    return (
        <div className="grid  gap-6  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {places.length > 0 && places.map(place => (
                < Link to={'/place/'+place._id} >
                    <div className="bg-gray-500 rounded-2xl mb-2 flex object-cover aspect-square" >
                    {place.photos?.[0] && (
                        <img className="rounded-2xl" src={'https://airbnb-api-dtre.onrender.com/uploads/'+place.photos?.[0]} alt="" />
                    )}
                    </div>
                    <h2 className="text-sm truncate">{place.title}</h2>
                    <h3 className="font-bold" text-gray-500 >{place.address}</h3>
                    <div className="mt-1" >
                        <span className="font-bold" >${place.price}</span> per night
                    </div>
                </Link>
            ))}
       </div>
    );
}