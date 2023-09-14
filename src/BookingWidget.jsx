import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}) {

    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');


    // THIS IS TO PREFIL USERNAME ON BOOKING FORM IF USER IS ALREADY SIGNED IN
    const {user} = useContext(UserContext);
    useEffect(() => {
        if(user) {
            setName(user.name);
        }
    }, [user])


    // TO CALCULATE NUMBER OF NIGHTS
    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }



    // ONCLICK FUNCTIONALTY FOR BOOKING A PLACE

   async function bookThisPlace() {
     const response = await axios.post('/bookings', {
        checkIn,checkOut,numberOfGuests,
        name,phone,
        place:place._id,
        price:numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl" >
        <div className="text-2xl text-">
        Price: ${place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
            <div className="flex flex-col sm:flex-row">
                 <div className=" py-3 px-4 ">
                 <label>Check In: </label>
                 <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                </div>
                <div className=" py-3 px-4 border-l ">
                <label>Check Out: </label>
                <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                 </div>
            </div>
            <div className=" py-3 px-4 border-t ">
                <label>Number of Guests: </label>
                <input type="Number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
                 </div>

                 {numberOfNights > 0 && (
                    <div className=" py-3 px-4 border-t ">
                    <label>Your Name </label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                    <label>Your Mobile </label>
                    <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />
                     </div> 
                 )}
        </div>
       
        <button onClick={bookThisPlace} className="primary mt-4" >Book This Place
        {numberOfNights > 0 && (
            <>
                <span>  ${numberOfNights * place.price}</span>
            </>
        )}
        </button>
    </div>
    )
}