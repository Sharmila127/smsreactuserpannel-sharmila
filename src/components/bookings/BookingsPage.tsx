import React, { useRef, useEffect } from 'react';
import oilcare from '../../assets/oilcare.mp4';
import breakcln from '../../assets/breakcln.mp4';
import airfilter from '../../assets/airfilter.mp4';
import battery from '../../assets/battery.mp4';
import waterwash from '../../assets/waterwash.mp4';

interface CareItem {
	video: string;
	title: string;
	description: string;
}

const careItems: CareItem[] = [
	{
		video: oilcare,
		title: 'Engine Oil Replacement',
		description: 'Keep your engine running smooth and clean.',
	},
	{
		video: breakcln,
		title: 'Brake Pad Cleaning',
		description: 'Safety ensured with clear and responsive brakes.',
	},
	{
		video: airfilter,
		title: 'Air Filter Check',
		description: 'Breathe clean—your engine and you.',
	},
	{
		video: battery,
		title: 'Battery Check',
		description: 'Avoid sudden breakdowns with routine battery checks.',
	},
	{
		video: waterwash,
		title: 'Water Wash',
		description: 'Get that showroom shine, every time.',
	},
];

const MustCare: React.FC = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const scrollByAmount = 300;

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider) return;

		let scrollInterval: NodeJS.Timeout;

		// Clone length
		const itemWidth = 300 + 24; // width + gap-6
		const totalItems = careItems.length;
		const cloneLength = itemWidth * totalItems;

		const startAutoScroll = () => {
			scrollInterval = setInterval(() => {
				if (!slider) return;

				// If scrolled past the clone set, jump back to the start clone set
				if (slider.scrollLeft >= cloneLength) {
					slider.scrollLeft = 0;
				} else {
					slider.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
				}
			}, 4000);
		};

		startAutoScroll();
		return () => clearInterval(scrollInterval);
	}, []);

	// Clone items for looping effect
	const extendedItems = [...careItems, ...careItems];

	return (
		<section className='w-full my-3 relative overflow-hidden'>
			<div
				ref={sliderRef}
				className='flex w-full overflow-x-auto space-x-6 px-2 scroll-smooth scrollbar-hide'
			>
				{extendedItems.map((item, index) => (
					<div
						key={index}
						className='min-w-[300px] h-64 flex-shrink-0 rounded-xl overflow-hidden relative shadow-md hover:shadow-lg transition'
					>
						<video
							src={item.video}
							autoPlay
							loop
							muted
							playsInline
							className='w-full h-full object-cover'
						/>
						<div className='absolute inset-0 bg-black bg-opacity-40  flex flex-col justify-end p-4 text-white'>
							<h3 className='text-lg font-semibold mb-1'>{item.title}</h3>
							<p className='text-sm'>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default MustCare;
