import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Search, X } from 'lucide-react';
import {
	getSparePartsData,
	postSparePartsData,
} from '../../features/spareparts';
import { FONTS } from '../../constants/constant';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import LoginPromptModal from '../../components/Authentication/LoginPromptModal';
import { toast } from 'react-toastify';

interface SparePart {
	id: any;
	spareparts_name: string;
	price: number;
	stock: any;
	inStock: any;
	images: string[];
	brand: string;
	image: string;
	category?: string;
	warrentyPeriod?: string;
}

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
				rootMargin: '0px 0px -100px 0px',
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

const SpareParts: React.FC = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [selectedPart, setSelectedPart] = useState<SparePart | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [parts, setParts] = useState<SparePart[]>([]);
	const [categories, setCategories] = useState<
		{
			id: string;
			title: string;
			image: string;
			items: string[];
			_id?: string;
		}[]
	>([]);

	const [showAllProducts, setShowAllProducts] = useState(false);
	const { isAuthenticated } = useAuth();
	const [showLoginModal, setShowLoginModal] = useState(false);

	const fetchSpareParts = async () => {
		try {
			const response: any = await getSparePartsData({});

			if (response && response?.data && response?.data?.data) {
				if (Array.isArray(response.data.data)) {
					const validatedParts = response?.data?.data?.map((part: any) => {
						return {
							id: part._id || '',
							spareparts_name: part.productName || '',
							price: Number(part.price) || 0,
							stock: part.stock || '',
							images: Array.isArray(part.images)
								? part.images
								: [part.image || ''],
							brand: part.brand || '',
							image:
								part.image ||
								(Array.isArray(part.images) ? part.images[0] : ''),
							category: part.category || 'Uncategorized',
							inStock: part?.inStock,
							warrentyPeriod: part.warrentyPeriod,
						};
					});

					setParts(validatedParts);
					const categoriesData = transformToCategories(validatedParts);
					setCategories(categoriesData as any);
					// setIsLoading(false);
				} else {
					throw new Error('API response data is not an array');
				}
			} else {
				throw new Error('Invalid API response structure');
			}
		} catch (error) {
			console.error('Error fetching spare parts:', error);
			setParts([]);
			setCategories([]);
		}
	};

	const transformToCategories = (parts: SparePart[]) => {
		const categoriesMap = parts.reduce((acc: any, part: any) => {
			const categoryName = part.category || 'Uncategorized';
			if (!acc[categoryName]) {
				acc[categoryName] = {
					id: categoryName.toLowerCase().replace(/\s+/g, '-'),
					title: categoryName,
					image: part.image,
					items: [],
					_id: part.id,
				};
			}
			if (!acc[categoryName].items.includes(part.spareparts_name)) {
				acc[categoryName].items.push(part.spareparts_name);
			}
			return acc;
		}, {} as Record<string, { id: string; title: string; image: string; items: string[] }>);

		return Object.values(categoriesMap).slice(0, 4);
	};

	useEffect(() => {
		fetchSpareParts();
	}, []);

	const handleTouchStart = (e: React.TouchEvent): void => {
		const startX = e.touches[0].clientX;
		(e.currentTarget as HTMLElement).dataset.startX = startX.toString();
	};

	const handleTouchEnd = (e: React.TouchEvent): void => {
		const startX = parseFloat(
			(e.currentTarget as HTMLElement).dataset.startX || '0'
		);
		const endX = e.changedTouches[0].clientX;
		const diff = startX - endX;

		if (Math.abs(diff) > 50) {
			if (diff > 0) {
				setCurrentIndex((prev) => {
					if (prev >= parts.length - 1) return 0;
					return prev + 1;
				});
			} else {
				setCurrentIndex((prev) => {
					if (prev <= 0) return parts.length;
					return prev - 1;
				});
			}
		}
	};

	const filteredParts = parts?.filter((part) =>
		part?.spareparts_name?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	console.log(parts, 'parts');

	// Add to cart button functions
	const handleAddToCart = async (part: SparePart) => {
		if (isAuthenticated) {
			try {
				const payload = {
					products: {
						productId: part?.id,
						price: part?.price?.toString(),
						quantity: quantity,
					},
					type: 'spare',
				};
				const response: any = await postSparePartsData(payload);
				if (response) {
					toast.success('Item added to cart!', { autoClose: 2000 });
					if ((window as any).refreshCartCount) {
						(window as any).refreshCartCount();
					}
				} else {
					toast.error(
						response?.message || 'Booking failed, please update your profile',
						{ autoClose: 2000 }
					);
				}
			} catch (error) {
				console.error('Error adding to cart:', error);
			}
		} else if (!isAuthenticated) {
			setShowLoginModal(true);
		}
	};

	const displayedParts = showAllProducts
		? filteredParts
		: filteredParts.slice(0, 8);

	const offerTitle = useScrollAnimation<HTMLHeadingElement>();
	const productTitle = useScrollAnimation<HTMLHeadingElement>();
	const bundleTitle = useScrollAnimation<HTMLHeadingElement>();

	return (
		<div className='p-12 mx-8'>
			<h1 className='text-center' ref={offerTitle.elementRef}>
				<span
					className='inline-block pb-1 relative text-[#0050A5] mb-2'
					style={{ ...FONTS.heading }}
				>
					Spare Parts
				</span>
			</h1>

			{/* Hero Card */}
			<div className='mb-8 w-full bg-gray-100 rounded-xl shadow p-4 md:p-6 flex flex-row lg:flex-row items-center gap-6 hover:shadow-lg transition-shadow duration-300 h-[280px]'>
				{/* Content - Left Side */}
				<div className='flex-1 order-none lg:order-none'>
					<h2
						className='text-[#0050A5] mb-3 md:mb-4'
						style={{ ...FONTS.sub_heading }}
					>
						Ready to upgrade? Start exploring now!
					</h2>
					<p className='text-gray-700 mb-3 text-sm md:text-base'>
						From trusted genuine parts to reliable aftermarket options — we’ve
						got what your car needs. Quick delivery and happy customers are our
						promise!
					</p>
				</div>

				{/* Image - Right Side */}
				<div className='flex-1 w-full lg:flex lg:justify-end order-0 lg:order-none'>
					<img
						src='https://t4.ftcdn.net/jpg/05/21/93/17/360_F_521931702_TXOHZBa3tLVISome894Zc061ceab4Txm.jpg'
						alt='Spare Parts Overview'
						className='rounded-lg max-h-[200px] md:max-h-[250px] w-full lg:w-auto object-cover shadow'
					/>
				</div>
			</div>

			<h1 className='text-center' ref={productTitle.elementRef}>
				<span
					className='inline-block pb-1 relative text-[#0050A5] mb-3'
					style={{ ...FONTS.heading }}
				>
					Products
				</span>
			</h1>

			<div className='flex items-center justify-end flex-wrap gap-4 mb-6'>
				{/* Search Bar */}
				<div className='relative w-full max-w-md'>
					<input
						type='text'
						placeholder='Search by product name...'
						className='border border-[#0050A5] rounded-full px-5 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-[#0050A5]'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button
						className='absolute right-3 top-[85%] -translate-y-1/2 text-xl text-[#0050A5] hover:text-white transition-all duration-200 hover:scale-105 hover:bg-[#0050A5] p-1 rounded-full'
						onClick={() => {
							if (searchTerm !== '') {
								setSearchTerm('');
							}
						}}
						aria-label={searchTerm ? 'Clear search' : 'Search'}
					>
						{searchTerm ? <X size={20} /> : <Search size={20} />}
					</button>
				</div>
			</div>

			{/* Product Grid */}
			<div className=' mx-auto'>
				<div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8 px-2'>
					{displayedParts?.length === 0 ? (
						<div className='col-span-full text-center py-8'>
							<p className='text-gray-500 text-lg'>
								{searchTerm
									? 'No products found matching your search'
									: 'No products available'}
							</p>
						</div>
					) : (
						<>
							{displayedParts?.map((part, index) => (
								<div
									key={part.id}
									className='group relative border rounded-lg overflow-hidden shadow transition-transform duration-300 cursor-pointer bg-[#BED0EC]  hover:shadow-[0_0_10px_#BED0EC]'
									onClick={() => setSelectedPart(part)}
									onMouseEnter={() => setHoveredIndex(index)}
									onMouseLeave={() => setHoveredIndex(null)}
									style={{ minHeight: '260px' }}
								>
									<div className='h-[155px] flex justify-center items-center overflow-hidden'>
										<img
											src={
												(hoveredIndex === index &&
													part?.images &&
													part?.images[1]) ||
												part?.images[0] ||
												part?.image
											}
											alt={part?.spareparts_name}
											className=' rounded object-cover transition-all duration-300 ease-in-out border w-48 h-32 rounded-md'
										/>
									</div>
									<div className='p-6 px-6 relative'>
										<div className='text-xl font-semibold line-clamp-2 mb-1'>
											{part?.spareparts_name}
										</div>
										<div className='text-md text-gray-600 mb-1'>
											{part?.brand}
										</div>
										<div className='text-md font-bold text-[#0050A5]'>
											&#8377;{part?.price.toLocaleString()}
										</div>
										<div
											className={`mt-2 text-xs font-semibold ${
												part?.stock >= 1 ? 'text-green-600' : 'text-red-600'
											}`}
										>
											{part?.stock >= 1 ? 'In Stock' : 'Out of Stock'}
										</div>

										{/* Cart Icon Button */}
										{part?.stock >= 1 && (
											<button
												className='absolute bottom-4 right-5 bg-white p-3 rounded-full shadow hover:bg-[#0050A5] hover:text-white transition'
												onClick={(e) => {
													e.stopPropagation();
													handleAddToCart(part);
												}}
											>
												<ShoppingCart size={28} />
											</button>
										)}
									</div>
								</div>
							))}
						</>
					)}
				</div>

				{/* View All/Show Less Buttons */}
				<div className='flex justify-center gap-4 mt-6'>
					{!showAllProducts && filteredParts?.length > 8 && (
						<button
							onClick={() => setShowAllProducts(true)}
							className='bg-[#0050A5] text-white px-6 py-2 rounded-md  transition-colors duration-200'
						>
							View All Products ({filteredParts.length})
						</button>
					)}

					{showAllProducts && (
						<button
							onClick={() => {
								setShowAllProducts(false);
								window.scrollTo({
									top: 0,
									behavior: 'smooth',
								});
							}}
							className='bg-[#9b111e] text-white px-6 py-2 rounded-md hover:bg-[#7a0d17] transition-colors duration-200'
						>
							Show Less
						</button>
					)}
				</div>
			</div>

			{/* Bundles Section - Only show if there are parts */}
			{parts?.length > 0 && (
				<div className='bg-gray-100 mt-16 transition-shadow p-8'>
					<h1 className='text-center' ref={bundleTitle.elementRef}>
						<span
							className='inline-block pb-1 relative text-[#0050A5] mb-2'
							style={{ ...FONTS.heading }}
						>
							Our Bundles
							<span
								className={`absolute top-11 left-1/2 h-[1px] bg-[#0050A5] transform -translate-x-1/2 origin-center transition-all duration-700 ${
									bundleTitle.isVisible
										? 'scale-x-100 w-full'
										: 'scale-x-0 w-full'
								}`}
							></span>
						</span>
					</h1>

					<div className='overflow-hidden mt-10 relative'>
						<div
							className='flex transition-transform duration-500 ease-in-out'
							style={{
								transform: `translateX(-${currentIndex * 320}px)`,
							}}
							onTouchStart={handleTouchStart}
							onTouchEnd={handleTouchEnd}
						>
							{/* Add clones at the beginning and end for seamless looping */}
							{[...parts?.slice(-3), ...parts, ...parts?.slice(0, 3)]?.map(
								(part, index) => (
									<div
										key={`${part.id}-${index}`}
										className='min-w-[300px] flex-shrink-0 mr-5'
									>
										<div className='bg-gradient-to-br rounded-lg p-6 text-center text-white h-64 flex flex-col justify-center items-center shadow-2xl transition-transform duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden'>
											{/* Background Image with Overlay */}
											<div
												className='absolute inset-0 bg-cover bg-center blur-[2px]'
												style={{ backgroundImage: `url(${part?.image}` }}
											/>
											<div className='absolute inset-0 bg-black opacity-10' />

											{/* Content */}
											<div className='relative z-10 flex flex-col items-center'>
												<div className='w-16 h-16 mb-4 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm'>
													<img
														src={part?.image}
														alt={part?.spareparts_name}
														className='w-12 h-12 object-cover rounded-full'
													/>
												</div>
												<div className='text-xl font-semibold mb-2'>
													{part?.spareparts_name}
												</div>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>

					{/* Navigation Buttons - Updated with infinite loop logic */}
					<div className='flex justify-center mt-6 space-x-4'>
						<button
							onClick={() => {
								setCurrentIndex((prev) => {
									if (prev <= 0) {
										return parts.length;
									}
									return prev - 1;
								});
							}}
							className='bg-[#0050A5] text-white px-6 py-2 rounded-lg  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#BED0EC] focus:ring-opacity-50'
							aria-label='Previous slide'
						>
							← Previous
						</button>
						<button
							onClick={() => {
								setCurrentIndex((prev) => {
									if (prev >= parts.length - 1) {
										return 0;
									}
									return prev + 1;
								});
							}}
							className='bg-[#0050A5] text-white px-6 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#BED0EC] focus:ring-opacity-50'
							aria-label='Next slide'
						>
							Next →
						</button>
					</div>

					{/* Dots Indicator - Show only for real items */}
					<div className='flex justify-center mt-4 space-x-2'>
						{parts.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-3 h-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${
									index === currentIndex
										? 'bg-[#0050A5]'
										: 'bg-gray-400 hover:bg-gray-500'
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			)}

			{/* Bottom Full Width Section */}
			<div className='w-full py-12 px-6 flex flex-col-2 lg:flex-row items-center gap-8'>
				<div className='flex-1 max-w-2xl lg:order-1'>
					<h2 className='text-[#0050A5] mb-6' style={{ ...FONTS.sub_heading }}>
						Professional Auto Service & Support
					</h2>
					<p className='text-gray-700 mb-6 text-sm leading-relaxed'>
						Need help installing your spare parts? Our certified technicians
						provide expert installation services and comprehensive support. We
						ensure your vehicle gets the best care with genuine parts and
						professional service.
					</p>
					<div className='flex flex-wrap gap-4 mb-8'>
						<div className='bg-white px-4 py-2 rounded-full text-sm border shadow-sm'>
							✓ Expert Installation
						</div>
						<div className='bg-white px-4 py-2 rounded-full text-sm border shadow-sm'>
							✓ Quality Guarantee
						</div>
						<div className='bg-white px-4 py-2 rounded-full text-sm border shadow-sm'>
							✓ 24/7 Support
						</div>
					</div>
				</div>
				<div className='flex-1 lg:order-2'>
					<img
						src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
						alt='Professional Auto Service'
						className='w-full h-[400px] object-cover rounded-lg shadow-lg'
					/>
				</div>
			</div>

			<div className='max-w-full px-4 md:px-6 lg:px-8'>
				<h1
					className=' text-[#0050A5] mb-8 text-center'
					style={{ ...FONTS.heading }}
				>
					By Categories
				</h1>

				{categories?.length !== 0 ? (
					<div className=' grid grid-cols-4 gap-6'>
						{categories?.map(({ id, title, items, image, _id }) => (
							<div
								key={id}
								className='flex flex-col gap-4 p-6 border rounded-2xl shadow-md'
							>
								<div className='flex justify-between items-center'>
									<h2 className='text-md font-bold uppercase text-[#0050A5]'>
										{title}
									</h2>
									<div className='border '>
										<img
											src={image}
											alt={title}
											className='w-16 h-16 object-contain border rounded-md'
										/>
									</div>
								</div>
								<ul className='space-y-1 text-sm'>
									{items?.slice(0, 3).map((item, index) => {
										return (
											<Link to={`/spare-parts/product/${_id}`}>
												<li
													key={index}
													className='hover:underline cursor-pointer'
												>
													{item}
												</li>
											</Link>
										);
									})}
								</ul>
								<Link
									to={`/spare-parts/category/${id}`}
									className='text-sm font-semibold relative bottom-[1px] text-[#0050A5] cursor-pointer hover:underline mt-1'
								>
									ALL CATEGORIES →
								</Link>
							</div>
						))}
					</div>
				) : (
					<div className='flex items-center justify-center'>
						<p className='text-gray-500'>No Categories available</p>
					</div>
				)}
			</div>

			{/* Edit Product Modal */}
			{selectedPart && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'
					onClick={() => setSelectedPart(null)}
				>
					<div
						className='bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative'
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setSelectedPart(null)}
							className='absolute top-2 right-2 text-3xl font-bold text-gray-600 hover:text-[#0050A5]'
							aria-label='Close modal'
						>
							&times;
						</button>

						{/* Product Image */}
						<div className='mb-4 flex justify-center'>
							<img
								src={
									selectedPart.images && selectedPart.images[0]
										? selectedPart.images[0]
										: selectedPart.image
								}
								alt={selectedPart.spareparts_name}
								className='w-48 h-48 object-cover rounded-lg shadow-md'
							/>
						</div>

						<h2 className='text-lg font-bold mb-2'>
							{selectedPart.spareparts_name}
						</h2>
						<div className='flex justify-between items-center mb-4'>
							<p className='text-sm text-gray-600'>
								Brand: {selectedPart.brand}
							</p>

							<p
								className={`${
									selectedPart.stock > 0 ? 'bg-green-700' : 'bg-red-500'
								} text-white px-2 py-1 rounded-full text-sm font-semibold`}
							>
								{selectedPart.stock && parseInt(selectedPart.stock) > 0 ? (
									<span>Stock : {selectedPart.stock}</span>
								) : (
									<span>Out of Stock</span>
								)}
							</p>
						</div>
						{selectedPart.warrentyPeriod !== '' && (
							<div className='flex justify-between items-center mb-4'>
								<p className='text-sm text-gray-600'>
									Warrenty : {selectedPart.warrentyPeriod}
								</p>
							</div>
						)}

						<div className='flex items-center gap-2 mb-4'>
							<span className='text-sm font-medium'>Quantity:</span>
							<button
								onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
								className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
							>
								-
							</button>
							<span className='px-2'>{quantity}</span>
							<button
								onClick={() =>
									setQuantity((prev) =>
										quantity < parseInt(selectedPart.stock) ? prev + 1 : prev
									)
								}
								className={`px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 ${
									parseInt(selectedPart.stock) <= quantity
										? 'cursor-not-allowed opacity-50'
										: ''
								}`}
							>
								+
							</button>
						</div>

						<div className='text-sm mt-3 mb-2'>
							Total Price:{' '}
							<span className='font-semibold text-[#0050A5]'>
								&#8377;{(selectedPart.price * quantity).toLocaleString()}
							</span>
						</div>

						<div>
							{parseInt(selectedPart.stock) >= quantity ? (
								<button
									onClick={() => handleAddToCart(selectedPart)}
									className='mt-2 w-full bg-[#0050A5] text-white px-4 py-2 rounded  transition'
								>
									Add to Cart
								</button>
							) : (
								<span className='text-sm font-semibold text-red-700 cursor-pointer hover:underline mt-2'>
									Out of Stock
								</span>
							)}
						</div>
					</div>
				</div>
			)}
			<LoginPromptModal
				isOpen={showLoginModal}
				onClose={() => setShowLoginModal(false)}
			/>
		</div>
	);
};

export default SpareParts;
