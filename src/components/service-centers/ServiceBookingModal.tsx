import { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { arrowBack, timeOutline } from 'ionicons/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getUserProfile } from '../../features/Profile/service';

interface BookingModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedService?: {
		id: string;
		title?: string;
		price?: number;
		duration?: string;
	};
	isAuthenticated?: boolean;
	onAddToCart?: (requestType: string, schedule_date: Date, preferedTime: any, selectedCar:any) => void;
	onOpenSignUp?: () => void;
}

const BookingModal = ({
	isOpen,
	onClose,
	selectedService,
	isAuthenticated,
	onAddToCart,
	onOpenSignUp,
}: BookingModalProps) => {
	const [selectedBookingType, setSelectedBookingType] = useState<
		'general' | 'schedule'
	>('general');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [selectedDate, setSelectedDate] = useState(new Date());

	if (!isOpen) return null;


	const [carData, setCarData] = useState<any[]>([])
	const [selectedCar, setSelectedCar] = useState('initial')

	console.log(selectedCar, "selected CAr")

	const fetchUserProfile = async () => {
		try {
			const response: any = await getUserProfile({});
			if (response) {
				console.log(response.data.data.vehicleInfo, "Cars Response")
				setCarData(response?.data?.data?.vehicleInfo)
			}
		} catch (error) {
			console.error('Error fetching user profile:', error);
		}
	};

	useEffect(() => {
		fetchUserProfile();
	}, []);

	return (
		<div className='fixed inset-0 z-[1000] overflow-y-auto'>
			{/* Backdrop - click to close */}
			<div
				className='fixed inset-0 bg-black bg-opacity-50 transition-opacity'
				onClick={onClose}
			></div>

			{/* Modal container */}
			<div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
				{/* Center the modal */}
				{/* <span
					className='hidden sm:inline-block sm:align-middle sm:h-screen'
					aria-hidden='true'
				>
					&#8203;
				</span> */}

				{/* Modal content */}
				<div
					className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full relative'
					onClick={(e) => e.stopPropagation()}
				>
					{/* Modal header */}
					<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
						{/* Header */}
						<div className='flex items-center mb-4'>
							<button
								onClick={onClose}
								className='mr-2 text-gray-700 hover:text-gray-900 focus:outline-none'
							>
								<IonIcon icon={arrowBack} className='text-2xl' />
							</button>
							<h3 className='text-lg font-medium text-gray-900'>
								Booking Options
							</h3>
						</div>

						{/* Booking Type Selection */}
						<div className='flex mb-6 rounded-md overflow-hidden border border-gray-300'>
							<button
								className={`flex-1 py-3 px-4 text-center font-medium transition-colors focus:outline-none ${selectedBookingType === 'general'
									? 'bg-blue-500 text-white'
									: 'bg-white text-gray-700 hover:bg-gray-100'
									}`}
								onClick={() => setSelectedBookingType('general')}
							>
								General Service
							</button>
							<button
								className={`flex-1 py-3 px-4 text-center font-medium transition-colors focus:outline-none ${selectedBookingType === 'schedule'
									? 'bg-blue-500 text-white'
									: 'bg-white text-gray-700 hover:bg-gray-100'
									}`}
								onClick={() => setSelectedBookingType('schedule')}
							>
								Pre-Booked Service
							</button>
						</div>

						{/* General Service Details */}
						{selectedBookingType === 'general' && (
							<div className='mb-6'>
								<h4 className='text-lg font-bold mb-4'>Service Details</h4>

								<div className='space-y-3 mb-4'>
									<div className='flex items-center'>
										<IonIcon
											icon={timeOutline}
											className='text-blue-500 mr-2 text-xl'
										/>
										<span>
											Duration: {selectedService?.duration || '1-2 hours'}
										</span>
									</div>
									<div className='flex items-center'>
										<IonIcon
											icon={timeOutline}
											className='text-blue-500 mr-2 text-xl'
										/>
										<span>Working Hours: 9:00 AM - 5:00 PM</span>
									</div>
									<div className="flex items-center mb-4">
										<select
											title="cars"
											name="cars"
											id="cars"
											value={selectedCar}
											onChange={(e) => setSelectedCar(e.target.value)}
											className="w-64 px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white"
										>
											<option value="initial">Select Car</option>
											{carData?.map((cars: any, index: any) => (
												<option value={index} key={cars.model}>
													{cars.registerNumber} , {cars.company}
												</option>
											))}
										</select>
									</div>

								</div>
							</div>
						)}

						{/* Pre-Booked Service Details */}
						{selectedBookingType === "schedule" && (
							<div className='mb-6'>

								<div className="flex items-center mb-4">
									<select
										title="cars"
										name="cars"
										id="cars"
										value={selectedCar}
										onChange={(e) => setSelectedCar(e.target.value)}
										className="w-64 px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white"
									>
										<option value="initial">Select Car</option>
										{carData?.map((cars: any, index: any) => (
											<option value={index} key={cars.model}>
												{cars.registerNumber} , {cars.company}
											</option>
										))}
									</select>
								</div>

								<h4 className='text-lg font-bold mb-4'>Select Date & Time</h4>
								<div className='mb-4'>
									<label className='block font-medium mb-2'>Select Date:</label>
									<DatePicker
										selected={selectedDate}
										onChange={(date: Date | null) => {
											if (date) setSelectedDate(date);
										}}
										minDate={new Date()}
										className='w-full border border-gray-300 rounded p-2'
									/>
								</div>

								<div className='mb-4'>
									<label className='block font-medium mb-2'>
										Preferred Time:
									</label>
									<div className='flex items-center'>
										<input
											type='time'
											value={startTime}
											onChange={(e) => setStartTime(e.target.value)}
											className='flex-1 border border-gray-300 rounded p-2 mr-2'
										/>
										<span className='mx-2'>to</span>
										<input
											type='time'
											value={endTime}
											onChange={(e) => setEndTime(e.target.value)}
											className='flex-1 border border-gray-300 rounded p-2'
										/>
									</div>
								</div>

								<div className='bg-blue-50 p-3 rounded text-blue-800'>
									<p>
										Note: Pre-booked services require confirmation from our
										team. We'll contact you shortly.
									</p>
								</div>
							</div>
						)}

						{/* Book Service Button */}
						<button
							onClick={() => {
								if (isAuthenticated) {
									const preferedTime = { startTime, endTime };
									onAddToCart?.(selectedBookingType, selectedDate, preferedTime, selectedCar);
								} else {
									onOpenSignUp?.();
								}
							}}
							className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors mt-4'
						>
							{selectedBookingType === 'general'
								? 'BOOK NOW'
								: 'PRE-BOOK SERVICE'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingModal;