import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FONTS } from '../../constants/constant';
import { getHomeData } from '../../features/home';

const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
	options = {}
) => {
	const [isVisible, setIsVisible] = useState(false);
	const elementRef = useRef<T>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px',
				...options,
			}
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, []);

	return { elementRef, isVisible };
};

const CustomServicesGrid: React.FC = () => {
	const [spareParts, setSpareParts] = useState<any[]>([]);
	const navigate = useNavigate();
	const spareTitle = useScrollAnimation<HTMLHeadingElement>();

	useEffect(() => {
		const fetchSpareParts: any = async () => {
			try {
				const response: any = await getHomeData({});
				if (response) {
					setSpareParts(response.data.data);
				}
			} catch (error) {
				console.error('Error fetching spare parts data:', error);
				throw new Error('Error fetching spare parts data');
			}
		};
		fetchSpareParts();
	}, []);

	return (
		<div className='py-10 '>
			<h1
				ref={spareTitle.elementRef}
				className='text-2xl mb-10 text-red-900 text-center'
				style={{ ...FONTS.heading }}
			>
				<span className='inline-block pb-1 relative text-[#0050A5]'>
					Available Spare Parts
				</span>
			</h1>
			{spareParts.length !== 0 ? (
				<div className='grid grid-cols-5 gap-10'>
					{spareParts?.slice(0, 15)?.map((item) => (
						<Link to={`/spare-parts/product/${item._id}`}>
						<div
							key={item._id}
							className='bg-[#d8e1ef] rounded-lg p-2 shadow-3xl hover:shadow-4xl hover:scale-102 transition-transform duration-300 relative cursor-pointer'
							onClick={() => navigate('/spare-parts')}
						>
							<div className='w-full h-[125px] rounded'>
								<img
									src={item?.image}
									alt={item?.productName}
									className='w-full h-full object-cover '
								/>
							</div>
							{item?.label && (
								<span
									className='absolute top-1 left-[198px] -translate-x-1/2 bg-green-600 text-white font-semibold text-[10px] 
								px-2 py-0.5 rounded'
								>
									{item?.brand}
								</span>
							)}
							<p
								className='mt-3 text-[#0050A5] text-center'
								style={{ ...FONTS.paragraph, fontWeight: 600 }}
							>
								{item?.productName}
							</p>
						</div>
						</Link>
					))}
				</div>
			) : (
				<div className='flex items-center justify-center'>
					<p className='text-lg font-semibold'>No Spare Parts available</p>
				</div>
			)}
		</div>
	);
};

export default CustomServicesGrid;
