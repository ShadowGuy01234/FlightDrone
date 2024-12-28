import React from 'react';

const VideoCard = () => {
    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl">
                
                <div className="w-2/3">
                    <video className="w-full h-full object-cover" autoPlay loop muted>
                        <source src="./13370-247710847_medium.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

            
                <div className="w-1/3 p-5 flex flex-col justify-between">
                    <div className="mb-5">
                        <h2 className="text-lg font-bold">Drone Repair</h2>
                        <p className="text-gray-600">At your door step</p>
                    </div>
                    <div className="mb-5">
                        <h2 className="text-lg font-bold">What You See Is</h2>
                        <p className="text-gray-600">What You Get In</p>
                    </div>
                    <div className="mb-5">
                        <h2 className="text-lg font-bold">Electronics</h2>
                        <p className="text-gray-600">After Drone Crash</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <img src="./ser.png" alt="Drone" className="h-40" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
