import { useEffect, useState, useRef } from 'react';
import { Wrench, Car } from 'lucide-react';
import {
	booking_cart,
	deleteBookingCartProduct,
	deleteBookingCartService,
	postBookingProduct,
} from '../../features/BookingCart/service';
import { toast } from 'react-toastify';
import { postBookingService } from '../../features/Bookings/service';
import { FONTS } from '../../constants/constant';
import { useAuth } from '../auth/AuthContext';
import { useSocket } from '../../context/customerSocket';

interface spare {
	discount: number;
	_id: number;
	productName: string;
	price: number;
	brand: string;
	image: string;
	quantity: number;
	category: string;
	description: string;
	stock: number;
}

interface service {
	discount: number;
	_id: number;
	service_name: string;
	price: number;
	description: string;
	image: string;
	is_active: boolean;
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

export default function SparePartsCart() {
	const [books, setBooks] = useState<spare[]>([]);
	const [activeTab, setActiveTab] = useState<'service' | 'ServiceBookingPage'>(
		'service'
	);
	const cartTitle = useScrollAnimation<HTMLHeadingElement>();
	const [services, setServices] = useState<service[]>([]);
	const { isAuthenticated } = useAuth();
	const [cartId, setCartId] = useState<string>('');
	const [serviceId, setServiceCartId] = useState<string>('');
	const totalPartPrice = books.reduce(
		(acc, part) => acc + part.price * part.quantity,
		0
	);
	const socket = useSocket();

	const totalServicePrice = services.reduce((acc, serv) => acc + serv.price, 0);

	const books_valid = async () => {
		try {
			const response: any = await booking_cart({});
			console.log(response, '');
			if (response) {
				// setIsLoading(false);
			}
			const cartData = response?.data?.data;
			if (!Array.isArray(cartData)) return;
			const spareEntry = cartData.find((item) => item.type === 'spare');
			const cartId = spareEntry?._id;
			setCartId(cartId);

			if (spareEntry?.products) {
				const spares = spareEntry.products.map(
					(product: any): spare => ({
						_id: product?._id,
						productName: product?.productId?.productName,
						price: Number(product?.price),
						brand: product.productId?.brand,
						image: product.productId?.image,
						quantity: Number(product?.quantity),
						category: product?.productId?.category,
						description: product?.productId?.description,
						stock: Number(product?.productId?.stock),
						discount: 0,
					})
				);
				setBooks(spares);
			}

			const serviceEntry = cartData?.find((item) => item.type === 'service');
			const serviceId = serviceEntry?._id;
			setServiceCartId(serviceId);

			if (serviceEntry?.services) {
				const mappedServices = serviceEntry.services.map(
					(service: any): service => ({
						_id: service?._id || '0',
						service_name: service?.service_name || 'Unknown',
						price: Number(service?.price) || 0,
						description: service.description || '',
						image: service?.productId?.image,
						is_active: service?.productId?.stock || true,
						discount: 0,
					})
				);
				setServices(mappedServices);
			}
		} catch (error) {
			console.error('Error fetching books/services', error);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			books_valid();
			setActiveTab('ServiceBookingPage');
		}
	}, [isAuthenticated]);

	const placeOrder = async () => {
		try {
			const payload = {
				cartId: cartId,
			};

			const response = await postBookingProduct(payload);
			if (response) {
				toast.success('Order placed successfully!', { autoClose: 2000 });
			}

			const adminNotification = {
				title: 'New Spare Part Booking Received',
				message: `A customer has booked a spare part. Please ensure it's processed accordingly.`,
				type: "orderReq",
				priority: "medium",
				recipient_type: "admin",
				recipient_id: "",
				is_read: false,
				is_active: true,
				is_sent: false,
				created_at: new Date().toISOString(),
			};

			if (!socket) return null;
			socket.emit('newNotification', adminNotification);
		} catch (error: any) {
			console.error('Order placement error:', {
				error: error.message,
				response: error.response?.data,
			});
			toast.error(error.response?.data?.message || 'Failed to place order');
		}
	};

	// Service Order post
	const placeServiceOrder = async () => {
		try {
			const payload = {
				cartId: serviceId,
			};
			const response = await postBookingService(payload);
			if (response) {
				toast.success('Order placed successfully!', { autoClose: 2000 });
			}

			const adminNotification = {
				title: 'New Service Request Booked',
				message: `A customer has booked a service. Review the request and assign it as needed.`,
				type: "serviceReq",
				priority: "medium",
				recipient_type: "admin",
				recipient_id: "",
				is_read: false,
				is_active: true,
				is_sent: false,
				created_at: new Date().toISOString(),
			};

			if (!socket) return null;
			socket.emit('newNotification', adminNotification);
		} catch (error: any) {
			console.error('Order placement error:', error);
			toast.error(error.response?.data?.message || 'Failed to place order');
		}
	};

	const handleDelete = async (id: number) => {
		if (activeTab === 'service') {
			const response = await deleteBookingCartProduct({
				cartId,
				productId: id,
			});
			if (response) {
				toast.success('Product removed successfully', { autoClose: 2000 });
				books_valid();
			}
		} else if (activeTab === 'ServiceBookingPage') {
			const response = await deleteBookingCartService({
				cartId: serviceId,
				serviceId: id,
			});
			if (response) {
				toast.success('Service removed successfully', { autoClose: 2000 });
				books_valid();
			}
		}
	};

	const filteredParts = books;
	const filteredServices = services;

	const SparePartCard = ({ part }: { part: spare }) => {
		const quantity: number = part.quantity || 1;

		return (
			<div className='border rounded-lg h-[190px] shadow max-w-xl mx-left p-2 mb-6 bg-[white] hover:shadow-md transition duration-300'>
				<div className='flex justify-star gap-4'>
					<div className='w-32 h-32 relative group overflow-hidden rounded border'>
						<img
							src={part.image}
							alt={part.productName}
							className='object-contain w-full h-full p-2 transition-transform duration-300 group-hover:scale-105'
						/>
						{part.discount > 0 && (
							<span className='absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-semibold'>
								{part.discount}% OFF
							</span>
						)}
					</div>

					<div className='flex-1 flex flex-col justify-between'>
						<div
							className={`relative left-[305px] text-xs text-center px-2 w-[90px] py-0.5 rounded font-medium ${part.stock
								? 'bg-[#BED0EC] text-[#0050A5]'
								: 'bg-[#0050A5] text-white'
								}`}
						>
							{part?.stock ? 'In Stock' : 'Out of Stock'}
						</div>
						<div>
							<div className='flex justify-between items-start'>
								<h3 className='text-base font-semibold text-[#0050A5]'>
									{part?.productName}
								</h3>
							</div>
							<p className='text-sm text-gray-600 mb-2'>
								{part?.description ||
									'High quality ceramic brake pads for safe and smooth braking'}
							</p>
						</div>

						<div className='flex gap-2 items-center'>
							<span className='text-lg font-bold text-[#0050A5]'>
								&#8377;{part?.price}
							</span>
							{/* <span className='line-through text-sm text-gray-400 '>
								₹{Math.round(part?.price * 1.3)}
							</span> */}
						</div>

						<div className='flex gap-2'>
							<span className='px-2 font-medium'>Quantity : {quantity}</span>

							<button
								className='bg-[#0050A5] ml-[180px]  text-white px-4 py-1.5 rounded font-semibold transition ml-48'
								onClick={() => handleDelete(part._id)}
							>
								REMOVE
							</button>
						</div>
						{/* <div className='text-sm text-[#0050A5] font-medium flex items-center gap-1'>
							<span className='text-base'>🚚</span>
							Delivery by{' '}
							<span className='font-semibold ml-1'>Sat, Jun 14</span>
						</div> */}
					</div>
				</div>
			</div>
		);
	};
	const ServiceCard = ({ serv }: { serv: service }) => {
		return (
			<div className='border rounded-lg h-[190px] shadow  mx-left p-4 mb-6 bg-white hover:shadow-md transition duration-300'>
				<div className='flex justify-star gap-4'>
					<div className='w-32 h-32 relative group overflow-hidden rounded border'>
						<img
							src={serv.image}
							alt={serv.service_name}
							className='object-contain w-full h-full p-2 transition-transform duration-300 group-hover:scale-105'
						/>
						{serv.discount > 0 && (
							<span className='absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-semibold'>
								{serv.discount}% OFF
							</span>
						)}
					</div>

					<div className='flex-1 flex flex-col justify-between'>
						<span
							className={`relative left-[325px] text-xs px-2 w-[65px] py-0.5 rounded font-medium ${serv.is_active
								? 'bg-[#BED0EC] text-[#0050A5]'
								: 'bg-red-700 text-white'
								}`}
						>
							{serv.is_active ? 'Available' : 'Not Available'}
						</span>
						<div>
							<div className='flex justify-between items-start'>
								<h3 className='text-base font-semibold text-[#0050A5]'>
									{serv.service_name}
								</h3>
							</div>
							<p className='text-sm text-gray-600 mb-6'>
								{serv.description ||
									'High quality ceramic brake pads for safe and smooth braking'}
							</p>
						</div>

						<div className='flex gap-2 items-center'>
							<span className='text-lg font-bold text-[#0050A5]'>
								&#8377;{serv.price}
							</span>
							{/* <span className='line-through text-sm text-gray-400 '>
								₹{Math.round(serv.price * 1.3)}
							</span> */}
						</div>

						<div className='flex gap-2 '>
							<button
								className='bg-[#0050A5] mt-[-16px] ml-[289px] text-white px-4 py-1.5 rounded font-semibold transition ml-48'
								onClick={() => handleDelete(serv._id)}
							>
								REMOVE
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className='min-h-screen p-6 '>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<h1
					ref={cartTitle.elementRef}
					className='text-center'
					style={{ ...FONTS.heading }}
				>
					<span className='inline-block pb-1 relative text-[#0050A5] mb-6'>
						My Cart
					</span>
				</h1>

				{/* Tabs */}
				<div className='mb-6 ml-[65px] text-center  '>
					<div className='relative inline-flex p-1 bg-[#BED0EC] rounded-full border  border-gray-300'>
						<button
							onClick={() => setActiveTab('service')}
							className={`px-20 py-3 rounded-full flex items-center gap-2 z-10 transition-colors duration-300 ${activeTab === 'service' ? 'text-white' : 'text-black '
								}`}
						>
							<Wrench className='text-lg' />
							SparePart Orders
						</button>

						<button
							onClick={() => setActiveTab('ServiceBookingPage')}
							className={`px-20 py-3 rounded-full flex items-center gap-2 z-10 transition-colors duration-300 ${activeTab === 'ServiceBookingPage'
								? 'text-white'
								: 'text-black '
								}`}
						>
							<Car className='text-xl' />
							Service Order
						</button>
						{/* Animated indicator with smooth sliding */}
						<div
							className={`absolute inset-y-1 h-[calc(100%-0.5rem)] bg-[#0050A5] rounded-full shadow-md transition-all duration-300 ease-in-out ${activeTab === 'service'
								? 'left-1 w-[calc(50%-0.25rem)]'
								: 'left-[calc(50%+0.25rem)] w-[calc(50%-0.25rem)]'
								}`}
						/>
					</div>
				</div>

				<div className='grid grid-cols-2 max-w-6xl mx-auto gap-6'>
					{/* Main Content */}
					<div className=''>
						{/* Service Page */}
						{activeTab === 'service' && (
							<div>
								{filteredParts.length > 0 ? (
									<div className='space-y-4'>
										{filteredParts.map((part) => (
											<SparePartCard key={part._id} part={part} />
										))}
									</div>
								) : (
									<div className='flex items-center  text-center justify-end h-[300px] w-full'>
										<p className='text-gray-500 text-lg'>
											No spare parts found matching your criteria.
										</p>
									</div>
								)}
							</div>
						)}

						{/* Service Booking Page */}
						{activeTab === 'ServiceBookingPage' && (
							<div>
								{filteredServices.length > 0 ? (
									<div className='space-y-4'>
										{filteredServices.map((serv) => (
											<ServiceCard key={serv._id} serv={serv} />
										))}
									</div>
								) : (
									<div className='flex items-center  text-center justify-end h-[300px] w-full'>
										<p className='text-gray-500  text-center text-lg'>
											No services found matching your criteria.
										</p>
									</div>
								)}
							</div>
						)}
					</div>

					{/* Summary Sidebar */}
					<div className=' fixed w-[520px] ml-[50px] top-[370px] left-1/2'>
						{/* Parts Summary */}
						{books?.length > 0 && activeTab === 'service' && (
							<div className='bg-white rounded-lg shadow-md p-4 mb-6  '>
								<div className='flex justify-between items-center mb-1'>
									<div>
										<h2 className='text-lg font-semibold text-[#0050A5]'>
											PRICE DETAILS
										</h2>
									</div>
								</div>
								<div className='border-t border-[#0050A5] pt-2 w-full'></div>
								<h3 className='text-base font-semibold text-black-600 mb-4'>
									Confirmed Service Orders
								</h3>

								<div className='space-y-2 mb-4'>
									<div className='flex justify-between text-sm'>
										<span>price ({books.length} items)</span>
										<span>&#8377;{totalPartPrice}</span>
									</div>
									{/* <div className='flex justify-between text-sm'>
										<span>Discount</span>
										<span> - ₹ 0</span>
									</div> */}
									{/* <div className='flex justify-between text-sm'>
										<span>Delivery Charges</span>
										<span>
											{' '}
											<del>₹100</del>{' '}
											<span className='text-green-600 font-bold'>Free</span>{' '}
										</span>
									</div> */}
								</div>
								<div className='border-t border-[#0050A5] pt-2 mb-2'>
									<div className='flex justify-between font-bold text-[#0050A5]'>
										<span>Total</span>
										<span>&#8377;{totalPartPrice}</span>
									</div>
								</div>
								<div className='flex justify-center'>
									<button
										type='submit'
										className='flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-white bg-[#0050A5] backdrop-blur-md lg:font-semibold isolation-auto relative z-10 px-6 py-2 overflow-hidden border-2 rounded-full group '
										onClick={async () => {
											try {
												if (books.length > 0) {
													await placeOrder();
												}
											} catch (error: any) {
												toast.error(error.message || 'Failed to place order');
											}
										}}
									>
										{' '}
										Place Order
									</button>
								</div>
							</div>
						)}

						{/* Services Summary */}
						{services.length > 0 && activeTab === 'ServiceBookingPage' && (
							<div className='bg-white rounded-lg shadow-md p-4 '>
								<div className='flex justify-between items-center mb-1'>
									<div>
										<h2 className='text-lg font-semibold text-[#0050A5]'>
											PRICE DETAILS
										</h2>
									</div>
								</div>
								<div className='border-t border-[#0050A5] pt-2 w-full'></div>
								<h3 className='text-base font-semibold text-black-600 mb-4'>
									Confirmed Service Orders
								</h3>
								<div className='space-y-2 mb-4'>
									<div className='flex justify-between text-sm'>
										<span>price ({services.length} items)</span>
										<span>&#8377;{totalServicePrice}</span>
									</div>
									{/* <div className='flex justify-between text-sm'>
										<span>Discount</span>
										<span> - ₹ 0</span>
									</div> */}
									{/* <div className='flex justify-between text-sm'>
										<span>Delivery Charges</span>
										<span>
											{' '}
											<del>₹100</del>{' '}
											<span className='text-green-600 font-bold'>Free</span>{' '}
										</span>
									</div> */}
								</div>
								<div className='border-t border-[#0050A5] pt-2 mb-4'>
									<div className='flex justify-between font-bold text-[#0050A5]'>
										<span>Total</span>
										<span>&#8377;{totalServicePrice}</span>
									</div>
								</div>
								<div className='flex justify-center'>
									<button
										type='submit'
										className='flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-white bg-[#0050A5] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 relative z-10 px-6 py-2 overflow-hidden border-2 rounded-full group -mt-2'
										onClick={async () => {
											try {
												await placeServiceOrder();
											} catch (error: any) {
												toast.error(error.message || 'Failed to place order');
											}
										}}
									>
										{' '}
										Place Order
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
