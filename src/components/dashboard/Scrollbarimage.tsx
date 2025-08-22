/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';


//LIGHT
import headlightled from '../../assets/LIGHT/HEAD LIGHT LED.jpg'
import headlightround from '../../assets/LIGHT/HEAD LIGHT ROUND.jpg'
import headlight from '../../assets/LIGHT/HEAD LIGHT.jpg'
import interiorlight from '../../assets/LIGHT/INTERIOR LIGHT.jpg'

//MIRROR
import leftsidemirror from '../../assets/MIRROR/LEFTSIDEMIRROR.jpg'
import rightsidemirror from '../../assets/MIRROR/RIGHTSIDEMIRROR.jpg'
import rearmirror from '../../assets/MIRROR/REAR MIRROR.jpg'

// TYRES
import backsidetyre from '../../assets/TYRE/BACKSIDETYRE.jpg'
import pairtyre from '../../assets/TYRE/PAIRTYRES.jpg'
import tyres from '../../assets/TYRE/TYRES.webp'

const ImageScrollGallery = () => {
    const scrollRef: any = useRef(null);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="relative w-full">
            <h2 className='font-bold text-xl p-2'>PRODUCTS</h2>
            {/* Left Arrow */}
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-100"
            >
                &#8592;
            </button>

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-2 scrollbar-hide scrollbar-thumb-gray-400 scrollbar-track-gray-100 px-3 py-4 scroll-smooth"
            >
                <img src={headlightled} className="w-[200px] h-[120px] rounded object-cover" alt="Image 2" />
                <img src={headlightround} className="w-[200px] h-[120px] rounded object-cover" alt="Image 3" />
                <img src={headlight} className="w-[200px] h-[120px] rounded object-cover" alt="Image 4" />
                <img src={interiorlight} className="w-[200px] h-[120px] rounded object-cover" alt="Image 5" />
                <img src={leftsidemirror} className="w-[200px] h-[120px] rounded object-cover" alt="Image 1" />
                <img src={rightsidemirror} className="w-[200px] h-[120px] rounded object-cover" alt="Image 1" />
                <img src={rearmirror} className="w-[200px] h-[120px] rounded object-cover" alt="Image 1" />
                <img src={backsidetyre} className="w-[200px] h-[120px] rounded object-cover" alt="Image 1" />
                <img src={pairtyre} className="w-[200px] h-[120px] rounded object-cover" alt="Image 1" />
                <img src={tyres} className="w-[200px] h-[120px] rounded object-cover" alt="Image 1" />
            </div>

            {/* Right Arrow */}
            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-100"
            >
                &#8594;
            </button>
        </div>
    );
};

export default ImageScrollGallery;
