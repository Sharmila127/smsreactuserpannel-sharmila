/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

// Import your images
import headlightled from '../../assets/LIGHT/HEAD LIGHT LED.jpg';
import headlightround from '../../assets/LIGHT/HEAD LIGHT ROUND.jpg';
import headlight from '../../assets/LIGHT/HEAD LIGHT.jpg';
import interiorlight from '../../assets/LIGHT/INTERIOR LIGHT.jpg';
import leftsidemirror from '../../assets/MIRROR/LEFTSIDEMIRROR.jpg';
import rightsidemirror from '../../assets/MIRROR/RIGHTSIDEMIRROR.jpg';
import rearmirror from '../../assets/MIRROR/REAR MIRROR.jpg';
import backsidetyre from '../../assets/TYRE/BACKSIDETYRE.jpg';
import pairtyre from '../../assets/TYRE/PAIRTYRES.jpg';
import tyres from '../../assets/TYRE/TYRES.webp';

const SingleImageCard = () => {
    const scrollRef: any = useRef(null);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -220, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 220, behavior: 'smooth' });
    };

    const images = [
        { src: headlightled, label: 'HEADLIGHT LED' },
        { src: headlightround, label: 'HEADLIGHT ROUND' },
        { src: headlight, label: 'HEADLIGHT' },
        { src: interiorlight, label: 'INTERIOR LIGHT' },
        { src: leftsidemirror, label: 'LEFTSIDE MIRROR' },
        { src: rightsidemirror, label: 'RIGHTSIDE MIRROR' },
        { src: rearmirror, label: 'REAR MIRROR' },
        { src: backsidetyre, label: 'BACKSIDE TYRE' },
        { src: pairtyre, label: 'PAIR TYRE' },
        { src: tyres, label: 'TYRES' },
    ];

    return (
        <div className="relative bg-white border rounded-lg shadow-md p-3 m-4 w-[240px] mx-auto">
            <h2 className="text-md font-semibold mb-4 text-center">PRODUCT</h2>

            {/* Left Arrow */}
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-[120px] -translate-y-1/2 z-10 bg-white border rounded-full p-1 shadow hover:bg-gray-400"
            >
                {/* &#8592; */}
                <SlArrowLeft />
            </button>

            {/* Scrollable Container (one image at a time) */}
            <div
                ref={scrollRef}
                className="flex overflow-hidden  scrollbar-hide w-[200px] mx-auto"
            >
                {images.map((img, idx) => (
                    <div key={idx} className="w-[200px] flex-shrink-0  text-center">
                        <img
                            src={img.src}
                            alt={img.label}
                            className="h-[120px] w-full object-cover rounded hover:scale-95 transition-transform duration-200"
                        />
                        <p className="mt-1 text-sm">{img.label}</p>
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={scrollRight}
                className="absolute right-0 top-[120px] -translate-y-1/2 z-10 bg-white border rounded-full p-1 hover:bg-gray-400"
            >
                {/* &#8594; */}
                <SlArrowRight />
            </button>
        </div>
    );
};

export default SingleImageCard;
