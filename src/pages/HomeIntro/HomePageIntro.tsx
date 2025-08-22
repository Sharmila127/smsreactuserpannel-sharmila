import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import slide1 from '../../../src/assets/HomeIntro/slider(1).jpg';
import slide2 from '../../../src/assets/HomeIntro/slider(2).jpg';
import slide3 from '../../../src/assets/HomeIntro/slider(3).jpg';
import { Link } from 'react-router-dom';
import { FONTS } from '../../constants/constant';
import Logo from '../../assets/LOGO.jpg';
import { toast } from 'react-toastify';

const slides = [slide1, slide2, slide3];

export const HomePageIntro = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isInteracting, setIsInteracting] = useState(false);

	const showLoginToast = () => {
		toast.error('Please login to view this content', {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});
	};

	useEffect(() => {
		if (!isInteracting) {
			const interval = setInterval(() => {
				setCurrentSlide((prev) => (prev + 1) % slides.length);
			}, 6000);
			return () => clearInterval(interval);
		}
	}, [isInteracting]);

	const renderSlideContent = () => {
		switch (currentSlide) {
			case 0:
				return (
					<motion.div
						className='relative z-10 max-w-xl text-center space-y-8 px-6 py-8 mx-left bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-xl'
						initial={{ opacity: 0, x: -40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
					>
						<motion.h1
							className='text-4xl md:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-lg'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
						>
							PROFESSIONAL
						</motion.h1>
						<motion.h2
							className='text-3xl md:text-4xl font-bold text-red-600 uppercase tracking-widest drop-shadow-md'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
						>
							MECHANICS
						</motion.h2>
						<motion.p
							className='text-xl md:text-2xl font-semibold text-gray-300 tracking-wider pt-2 drop-shadow'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							For Your Vehicle
						</motion.p>

						<motion.div
							className='space-y-4 max-w-xs pt-6 mx-auto'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.6 }}
						>
							<motion.button
								className='w-full bg-white shadow-white-600 text-black font-bold py-3 px-6 rounded-lg text-lg uppercase tracking-wider shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:bg-gray-100 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300'
								whileHover={{
									scale: 1.03,
									boxShadow: '0 12px 30px rgba(220, 38, 38, 0.9)',
								}}
								whileTap={{ scale: 0.98 }}
								aria-label='Read reviews'
							>
								REVIEWS
							</motion.button>

							<motion.button
								className='w-full bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] text-white font-bold py-3 px-6 rounded-lg text-lg tracking-wider shadow-[0_8px_24px_rgba(185,28,28,0.8)] transition-all'
								whileHover={{
									scale: 1.03,
								}}
								onClick={showLoginToast}
								whileTap={{ scale: 0.98 }}
								aria-label='Buy now'
							>
								BOOK NOW
							</motion.button>
						</motion.div>
					</motion.div>
				);

			case 1:
				return (
					<motion.div
						className='relative z-10 text-center text-white pt-24 px-4 md:px-0 mx-auto'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div className='flex flex-col items-center justify-center gap-8 max-w-xl mx-auto'>
							<motion.h1
								className='leading-tight drop-shadow-lg'
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2, duration: 0.6 }}
								style={{ ...FONTS.header, fontWeight: 600, fontSize: '42px' }}
							>
								The best mechanic services
							</motion.h1>

							<motion.div
								className='flex gap-6'
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4, duration: 0.6 }}
							>
								<motion.button
									className='bg-black bg-opacity-80 hover:bg-opacity-100 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg shadow-black/50 transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-500'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									aria-label='View our services'
								>
									Our services
								</motion.button>

								<motion.button
									className='bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg shadow-red-700/50 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-500'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									aria-label='View our prices'
									onClick={showLoginToast}
								>
									Our prices
								</motion.button>
							</motion.div>
						</div>
					</motion.div>
				);
			case 2:
				return (
					<motion.div
						className='text-black px-6 py-8 rounded-2xl w-full max-w-md relative z-10 flex left-[800px] overflow-y-hidden'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<motion.div
							className='w-full backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8'
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.6 }}
						>
							<motion.div
								className='flex flex-col items-center text-center space-y-5'
								initial='hidden'
								animate='visible'
								variants={{
									hidden: {},
									visible: {
										transition: {
											staggerChildren: 0.1,
										},
									},
								}}
							>
								<motion.h2
									className='text-white tracking-wide drop-shadow-sm'
									style={{ ...FONTS.header, fontWeight: 600 }}
									variants={{
										hidden: { opacity: 0, y: -20 },
										visible: { opacity: 1, y: 0 },
									}}
								>
									Get Instant Quote
								</motion.h2>

								<motion.select
									className='w-full px-4 py-3 bg-white/80 text-red-600 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300'
									variants={{
										hidden: { opacity: 0, y: 10 },
										visible: { opacity: 1, y: 0 },
									}}
									onFocus={() => setIsInteracting(true)}
									onBlur={() => setIsInteracting(false)}
								>
									<option className='text-gray-500'>Select District</option>
									<option className='text-black'>Chennai</option>
									<option className='text-black'>Tiruvallur</option>
									<option className='text-black'>Kanchipuram</option>
									<option className='text-black'>Coimbatore</option>
									<option className='text-black'>Madurai</option>
									<option className='text-black'>Salem</option>
									<option className='text-black'>Trichy</option>
									<option className='text-black'>Vellore</option>
								</motion.select>

								<motion.select
									className='w-full px-4 py-3 bg-white/80 text-red-600 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300'
									variants={{
										hidden: { opacity: 0, y: 10 },
										visible: { opacity: 1, y: 0 },
									}}
									onFocus={() => setIsInteracting(true)}
									onBlur={() => setIsInteracting(false)}
								>
									<option className='text-gray-500'>Select Car Model</option>
									<option className='text-black'>Maruti Swift</option>
									<option className='text-black'>Hyundai i20</option>
									<option className='text-black'>Mahindra XUV500</option>
									<option className='text-black'>Tata Nexon</option>
									<option className='text-black'>Honda City</option>
									<option className='text-black'>Renault Kwid</option>
									<option className='text-black'>Kia Seltos</option>
									<option className='text-black'>Skoda Slavia</option>
								</motion.select>

								<motion.input
									type='number'
									placeholder='Mobile Number'
									className='w-full px-4 py-3 bg-white/80 text-red-600 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300'
									onFocus={() => setIsInteracting(true)}
									onBlur={() => setIsInteracting(false)}
									variants={{
										hidden: { opacity: 0, y: 10 },
										visible: { opacity: 1, y: 0 },
									}}
								/>

								<motion.button
									className='w-full bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] text-white font-bold py-3 px-6 rounded-lg text-md tracking-wider shadow-[0_8px_24px_rgba(185,28,28,0.8)] transition-all'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									variants={{
										hidden: { opacity: 0, y: 10 },
										visible: { opacity: 1, y: 0 },
									}}
								>
									CHECK PRICE
								</motion.button>

								<motion.p
									className='text-sm text-white mt-1 tracking-wide drop-shadow'
									variants={{
										hidden: { opacity: 0, y: 5 },
										visible: { opacity: 1, y: 0 },
									}}
									style={{
										...FONTS.paragraph,
										fontWeight: 400,
										fontSize: '12px',
									}}
								>
									⭐ Rated 4.0/5 | 2 Million+ happy customers
								</motion.p>
							</motion.div>
						</motion.div>
					</motion.div>
				);

			default:
				return null;
		}
	};

	return (
		<div className='relative min-h-screen flex items-center justify-center px-8 py-10 overflow-y-hidden z-0'>
			<div className='absolute z-50 top-3 left-2'>
				<img src={Logo} alt='logo' style={{ width: '145px' }} />
			</div>
			<div className='absolute z-50 top-3 right-2'>
				<Link
					to='/login'
					className='bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] py-2 px-4 rounded-lg text-white'
					style={{ ...FONTS.paragraph, fontWeight: 550 }}
				>
					Login
				</Link>
			</div>
			{/* Background Image + Overlay */}
			<div className='absolute inset-0 z-0 transition-opacity duration-700 ease-in-out'>
				<img
					src={slides[currentSlide]}
					alt={`Slide ${currentSlide + 1}`}
					className='w-full h-full object-cover'
				/>
				<div className='absolute inset-0 bg-black/50' />
			</div>

			{/* Slide Content */}
			<div className='flex items-center w-full'>{renderSlideContent()}</div>

			{/* Carousel Dots */}
			<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3'>
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
							index === currentSlide ? 'bg-[#9b111e] scale-125' : 'bg-gray-400'
						}`}
					/>
				))}
			</div>
		</div>
	);
};