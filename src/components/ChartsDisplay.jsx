import React from 'react'
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const ChartsDisplay = ({ title, id, image, name = null }) => {
    return (
        <div className='bg-[#1b103f] p-4 rounded-lg '>
                <Link
                    to={`playlists/${id}`}
                    className='flex gap-4 items-center'
                >
                    <LazyLoadImage
                        src={image[1].link}
                        alt= {title || name}
                        effect='blur'
                        className="w-24 h-full object-cover rounded-lg"
                    />
                    <h4
                        className=" lg:text-xl font-semibold"
                        title={title}
                    >
                        {title || name}
                    </h4>
                </Link>
        </div>
    )
}

export default ChartsDisplay