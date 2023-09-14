import { useState } from "react";

export default function PlaceGallery({place}) {
    const [showAllPhotos,setShowAllPhotos] = useState(false);

     // FUNCTIONALITY FOR SHOWING ALL PHOTOS
     if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white  min-h-screen" >
                <div className="p-8 grid bg-black gap-4">
                    <div>
                        <h2 className="text-3xl mb-4 mr-48">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="flex right-11 top-8 fixed shadow shadow-gray-500 gap-1 py-2 px-4 rounded-2xl bg-white text-black">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                            </svg>
                            Close gallery</button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                    <div>
                        <img src={'http://localhost:4000/uploads/'+photo} alt="" />
                    </div>
                    ))},
                </div>
                
            </div>
        );
    }


    return (
        <div className="relative">
                <div className="grid rounded-3xl overflow-hidden gap-2 grid-cols-[2fr_1fr]" >
                <div>
                    {place.photos?.[0] && (
                        <div >
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square object-cover cursor-pointer" src={'http://localhost:4000/uploads/'+place.photos[0]} />
                        </div>      
                    )}
                </div>
                <div className="grid" >
                {place.photos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square object-cover cursor-pointer"  src={'http://localhost:4000/uploads/'+place.photos[1]} />
                    )}
                <div className="overflow-hidden" >
                 {place.photos?.[2] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square object-cover relative top-2 cursor-pointer"  src={'http://localhost:4000/uploads/'+place.photos[2]} />
                    )}
                </div>        
                </div>
             </div>
                <button onClick={() => setShowAllPhotos(true)} className="absolute flex gap-1 bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
             </svg>
                Show More Photos
                </button>
            </div>
    )
}