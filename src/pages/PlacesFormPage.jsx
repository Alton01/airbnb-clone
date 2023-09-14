import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";


export default function PlacesFormPage() {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [redirect,setRedirect] = useState(false);


    // TO ENABLE EDIT AND UPDATE FUNCTIONALITY FOR PLACES BY PARTICULAR PLACE CREATOR
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/'+id)
        .then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id]);

    // TO CREATE OR EDIT A PLACE

    async function savePlace(ev) {
        ev.preventDefault();

        const placeData = { 
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price}
        if (id) {
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);   
        } else {
            await axios.post('/places', placeData);
            setRedirect(true);  
        }      
    }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

    return (
        <div>
            <AccountNav />
                <form onSubmit={savePlace} >
                    <h2 className="text-2xl mt-4" >Title</h2>
                    <input className=" mb-2" type="text" placeholder="title" 
                    value={title} onChange={ev => setTitle (ev.target.value)}/>

                    <h2 className="text-2xl mt-4" >Address</h2>
                    <input type="text" placeholder="address" 
                    value={address} onChange={ev => setAddress (ev.target.value)} />

                    <h2 className="text-2xl mt-4" >Photos</h2>
                   <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    <div>
                        <h2 className="text-2xl mt-4">Description</h2>
                        <textarea 
                        value={description} onChange={ev => setDescription (ev.target.value)}  />
                    </div>

                    <Perks selected={perks} onChange={setPerks} />

                    <h2 className="text-2xl mt-4 grid gap-4">Extra Info</h2>
                    <textarea 
                    value={extraInfo} onChange={ev => setExtraInfo (ev.target.value)}  />

                    <h2 className="text-2xl mt-4 grid gap-4 mb-6">Check in & out times, max guests</h2>
                    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                        <div>
                            <h3 className="mt-2 -mb-2">Check in time</h3>
                            <input type="text" placeholder="14:00" 
                            value={checkIn} onChange={ev => setCheckIn (ev.target.value)}  />
                        </div> 
                        <div>
                        <h3>Check out time</h3>
                            <input type="text" placeholder="11:00" 
                            value={checkOut} onChange={ev => setCheckOut (ev.target.value)}  />
                        </div>
                        <div>
                        <h3>Max No. of Guests.</h3>
                            <input type="number" placeholder="2 People Max" 
                            value={maxGuests} onChange={ev => setMaxGuests (ev.target.value)}  />
                        </div>
                        <div>
                        <h3>Price Per Night</h3>
                            <input type="number" placeholder="How much per night" 
                            value={price} onChange={ev => setPrice (ev.target.value)}  />
                        </div>
                    </div>
                    <div>
                        <button className="primary my-10">Save</button>
                    </div>
                </form>
                </div>
    )
}