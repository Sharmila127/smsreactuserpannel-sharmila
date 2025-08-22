import React, { useEffect, useState } from 'react';

interface CarouselProps {
	images: string[];
	interval?: number; // optional auto-slide interval in ms
}

export const ImageCarousel: React.FC<CarouselProps> = ({
	images,
	interval = 3000,
}) => {
	const [current, setCurrent] = useState(0);

	// Auto-slide
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, interval);
		return () => clearInterval(timer);
	}, [images.length, interval]);

	const prevSlide = () => {
		setCurrent((prev) => (prev - 1 + images.length) % images.length);
	};

	const nextSlide = () => {
		setCurrent((prev) => (prev + 1) % images.length);
	};

	return (
		<div className='relative w-full mx-auto overflow-hidden shadow-lg'>
			{/* Image container */}
			<div className='w-full h-[445px] md:h-96'>
				<img
					src={images[current]}
					alt={`Slide ${current}`}
					className='w-full h-full object-cover transition-all duration-500'
				/>
			</div>

			{/* Prev / Next buttons */}
			<button
				onClick={prevSlide}
				className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#0050A5]  text-white p-2 rounded-full opacity-75'
			>
				‹
			</button>
			<button
				onClick={nextSlide}
				className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#0050A5]  text-white p-2 rounded-full opacity-75'
			>
				›
			</button>

			{/* Dots */}
			<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrent(index)}
						className={`w-1.5 h-1.5 rounded-full ${
							current === index ? 'bg-[#0050A5]' : 'bg-red-50'
						}`}
					/>
				))}
			</div>
		</div>
	);
};
