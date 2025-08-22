import { ImageCarousel } from '../../components/home/ImageCarousel';
import image1 from '../../assets/home/360_F_496483060_C9OG1wJpfmjMXcNmUBibmA9wYxxZCxnW.jpg';
import image2 from '../../assets/home/360_F_507812981_dGZXqBsqkBpEosDjTlJgmaJAyMFra7sp.jpg';
import image3 from '../../assets/home/hand-mechanic-holding-car-service-600nw-2340377479.webp';
import image4 from '../../assets/home/istockphoto-1387759698-612x612.jpg';
import { RxLapTimer } from 'react-icons/rx';
import { LiaCertificateSolid } from 'react-icons/lia';
import { BsTruck } from 'react-icons/bs';
import { GrWorkshop } from 'react-icons/gr';
import { LuCarTaxiFront } from 'react-icons/lu';
import { PiSealCheckBold } from 'react-icons/pi';
import { LuHandshake } from 'react-icons/lu';
import { RiShieldStarFill } from 'react-icons/ri';
import { MdDateRange } from 'react-icons/md';
import { MdHomeFilled } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { TbCertificate } from 'react-icons/tb';
import { RiCustomerService2Fill } from 'react-icons/ri';
import MustCare from '../../components/bookings/BookingsPage';
import { COLORS, FONTS } from '../../constants/constant';
import React, { useState, useRef, useEffect } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PromoCarousel from '../../components/home/offerCard';
import CustomServicesCarousel from '../../components/home/customServiceCarousel';

// image
import Roadsideassistant from '../../assets/CAR ROADSIDE/Roadside assistant.jpg';
import Prebooking from '../../assets/CAR PREBOOKING/Prebooking.jpg';
import Annualmaintenance from '../../assets/CAR ANNUAL MAINTENANCE/Annual maintenance.jpg';
import appimage from '../../assets/User (5).png';

// icon for footer
import { MdEmail } from 'react-icons/md'; // mail
import { FaSquareWhatsapp } from 'react-icons/fa6'; //whatsapp
import { FaInstagramSquare } from 'react-icons/fa'; //telegram
import { FaXTwitter } from 'react-icons/fa6'; //twitter
import { FaFacebook } from 'react-icons/fa'; //facebook
import { FaYoutube } from 'react-icons/fa'; //youtube
import { SiIndeed } from 'react-icons/si'; //indeed
import { BiLogoPlayStore } from 'react-icons/bi'; //play store
import { getAllServiceCategories } from '../../features/ServicesPage/service';
import { useNavigate } from 'react-router-dom';

const imageUrls = [image1, image2, image3, image4];

// Type definitions
interface ServiceCategory {
	id: string;
	category_name: string;
}

interface ApiResponse {
	data: {
		data: ServiceCategory[];
	};
}

// Custom hook for Scroll Animation
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

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const servicesTitle = useScrollAnimation<HTMLHeadingElement>();
	const careTitle = useScrollAnimation<HTMLHeadingElement>();
	const discoverTitle = useScrollAnimation<HTMLHeadingElement>();
	const contactTitle = useScrollAnimation<HTMLHeadingElement>();
	const [serviceData, setServiceData] = useState<ServiceCategory[]>([]);

	const fetchServiceData = async () => {
		try {
			const response = (await getAllServiceCategories()) as ApiResponse;
			if (response && response?.data && response?.data?.data) {
				setServiceData(response?.data?.data);
			}
		} catch (error) {
			console.error('Error fetching service data:', error);
		}
	};

	useEffect(() => {
		fetchServiceData();
	}, []);

	const handleServiceClick = (categoryId: string, categoryName: string) => {
		localStorage.setItem(
			'selectedCategory',
			JSON.stringify({
				id: categoryId,
				name: categoryName,
			})
		);
		navigate('/services');
	};

	return (
		<>
			<div className='h-auto'>
				<div className='bg-[#0050A5] '></div>
				<ImageCarousel images={imageUrls} interval={2500} />
			</div>

			<div className='text-[#0050A5]'>
				<div className='px-24 h-auto bg-white py-24 bg-[#BED0EC]'>
					<h1
						ref={servicesTitle.elementRef}
						className='text-2xl pb-16 text-[#0050A5] text-center -mt-6'
						style={{ ...FONTS.heading }}
					>
						<span className='inline-block pb-1 relative'>
							Available Services
						</span>
					</h1>
					{serviceData?.length !== 0 ? (
						<div className='grid md:grid-cols-4 sm:grid-cols-2 gap-4 justify-items-center'>
							{serviceData?.slice(0, 8)?.map((service: any) => (
								<Link
									to='/services'
									key={service?.id}
									onClick={() =>
										handleServiceClick(service?._id, service?.category_name)
									}
									className={`bg-[#d8e1ef] rounded-lg md:h-56 sm:h-auto w-60 p-2 shadow-md hover:shadow-lg transition-shadow ease-in duration-300 border-1 border-b-2 cursor-pointer transform hover:scale-102 border-[#0050A5]`}
								>
									<div className='flex flex-col items-center justify-center h-full gap-2'>
										<div className='text-[#0050A5] flex justify-center items-center w-40 h-32'>
											<img
												className='w-52 h-40 object-contain rounded border border-white'
												src={service?.image}
												alt={service?.category_name}
											/>
										</div>
										<h3
											className='text-center text-[#0050A5]'
											style={{ ...FONTS.sub_heading2, fontWeight: 500 }}
										>
											{service?.category_name}
										</h3>
									</div>

								</Link>
							))}
						</div>
					) : (
						<div className='flex justify-center items-center'>
							<p className='text-lg font-semibold'>No Services available</p>
						</div>
					)}
				</div>
				<div className={`h-[90vh] flex justify-center items-center`}>
					<div className='mx-24'>
						<PromoCarousel />
					</div>
				</div>
				<div className='bg-[#BED0EC]'>
					<div className='mx-24'>
						<CustomServicesCarousel />
					</div>
				</div>
				<div className='mt-4 bg-white'>
					<div className='h-[95vh]'>
						<div className='px-24 py-10'>
							<h1
								ref={careTitle.elementRef}
								className='text-2xl mb-10 text-red-900 text-center'
								style={{ ...FONTS.heading }}
							>
								<span className='inline-block pb-1 relative text-[#0050A5]'>
									Care Advantages
								</span>
							</h1>
							<div className='flex space-x-6 items-center justify-center'>
								<div className='border-r border-gray-600 pr-6 text-center'>
									<div className='ml-20'>
										<MdHomeFilled size={28} color={COLORS.primary} />
									</div>
									<p className='font-bold text-xl mt-3'>4000+</p>
									<p>Authorized Service Centers</p>
								</div>
								<div className='border-r border-gray-600 pr-6 pl-6 text-center'>
									<div className='ml-20'>
										<FaLocationDot size={28} color={COLORS.primary} />
									</div>
									<p className='font-bold text-xl mt-3'>3800+</p>
									<p>Cities Nationwise Connected</p>
								</div>
								<div className='border-r border-gray-600 pr-6 pl-6 text-center'>
									<div className='ml-14'>
										<TbCertificate size={28} color={COLORS.primary} />
									</div>
									<p className= 'font-bold text-xl mt-3'>5000+</p>
									<p>Certified Technicians</p>
								</div>
								<div className='pl-6 text-center'>
									<div className='ml-20'>
										<RiCustomerService2Fill size={28} color={COLORS.primary} />
									</div>
									<p className='font-bold text-xl mt-3'>10+ yrs</p>
									<p>Of Customer Care Expertise</p>
								</div>
							</div>
							<div className='py-8'>
								<MustCare />
							</div>
						</div>
					</div>

					<div className='px-24 pb-8 '>
						<div className='py-12'>
							<h1
								ref={discoverTitle.elementRef}
								className='text-2xl mb-10  text-center'
								style={{ ...FONTS.heading }}
							>
								<span className='inline-block pb-1 relative text-[#0050A5]'>
									Discover Our Services
								</span>
							</h1>
							<div className='flex mt-5 justify-around gap-10'>
								<div>
									<img
										style={{ width: '500px' }}
										className='rounded-lg h-64'
										src={Roadsideassistant}
									/>
								</div>
								<div className='w-1/2 mt-6'>
									<h1
										style={{
											...FONTS.paragraph,
											fontWeight: 600,
											fontSize: '18px',
											color: COLORS.primary,
										}}
									>
										Road Side Service
									</h1>
									<h2
										className='py-2  text-gray-500 '
										style={{
											...FONTS.paragraph,
											textAlign: 'justify',
										}}
									>
										Roadside assistance, also known as breakdown coverage, is a
										service that assists motorists, motorcyclists, or bicyclists
										whose vehicles have suffered a mechanical failure that
										either cannot be resolved by the motorist, or has prevented
										them from reasonably or effectively transporting the vehicle
										to an automobile repair
									</h2>
									<button
										className='bg-[#0050A5] text-white py-2 px-3 mt-3 rounded-full '
										style={{ ...FONTS.paragraph, fontWeight: 500 }}
										onClick={() => navigate('/services')}
									>
										Book Service
									</button>
								</div>
							</div>
						</div>
						<div>
							<div className='flex mt-10 justify-around gap-10'>
								<div className='w-1/2 mt-6'>
									<h1
										style={{
											...FONTS.paragraph,
											fontWeight: 600,
											fontSize: '18px',
											color: COLORS.primary,
										}}
									>
										Prebooking For Maintenance
									</h1>
									<h2
										className='py-2 text-gray-500'
										style={{
											...FONTS.paragraph,
											fontSize: '16px',
											textAlign: 'justify',
										}}
									>
										When it comes to visiting a repair shop for vehicle
										maintenance or repairs, planning ahead and scheduling an
										appointment can offer significant advantages over showing up
										last minute. While it may be tempting to drop by
										spontaneously, the benefits of scheduling appointments
										beforehand can streamline your experience, save time, and
										ensure that you receive the attention your vehicle deserves.
										Here are a few facts that make scheduling an appointment a
										much better and safer approach to repair shop procedures:
									</h2>
									<button
										className='bg-[#0050A5] text-white py-2 px-3 mt-3 rounded-full'
										style={{ ...FONTS.paragraph, fontWeight: 500 }}
										onClick={() => navigate('/services')}
									>
										Book Service
									</button>
								</div>
								<div>
									<img
										style={{ width: '500px' }}
										className='rounded-lg h-64'
										src={Prebooking}
									/>
								</div>
							</div>
						</div>
						<div>
							<div className='flex mt-10 justify-around gap-10'>
								<div>
									<img
										style={{ width: '500px' }}
										className='rounded-lg h-64'
										src={Annualmaintenance}
									/>
								</div>
								<div className='w-1/2 mt-6'>
									<h1
										style={{
											...FONTS.paragraph,
											fontWeight: 600,
											fontSize: '18px',
											color: COLORS.primary,
										}}
									>
										Annual Maintenance Scheme
									</h1>
									<h2
										className='py-2 text-gray-500'
										style={{
											...FONTS.paragraph,
											fontSize: '16px',
											textAlign: 'justify',
										}}
									>
										Customers also get cost savings by eliminating unexpected
										maintenance and repair, and the service provider has a
										picture of what types of jobs they can expect. Create a
										deeper understanding of your scheduling and hiring needs.
									</h2>
									<button
										className='bg-[#0050A5] text-white py-2 px-3 mt-3 rounded-full'
										style={{ ...FONTS.paragraph, fontWeight: 500 }}
										onClick={() => navigate('/services')}
									>
										Book Service
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className=' h-[85vh] mt-5'>
					<div className='px-24 pt-8'>
						<h1
							ref={contactTitle.elementRef}
							className='text-2xl mb-10 text-red-900 text-center'
							style={{ ...FONTS.heading }}
						>
							<span className='inline-block pb-4 relative text-[#0050A5]'>
								Customised Care For All Your Needs
							</span>
						</h1>

						<div className='flex justify-center gap-10 mt-4 mb-10 flex-wrap'>
							<div className='flex flex-col items-center text-center bg-[#BED0EC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103 border-2 border-[#0050A5]'>
								<GrWorkshop size={32} />
								<p
									className='mt-3 '
									style={{
										...FONTS.paragraph,
										fontSize: '14px',
										// color: COLORS.primary,
									}}
								>
									Service Workshop
									<br />
									Open All 7 Days
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#BED0EC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103 border-2 border-[#0050A5]'>
								<LuCarTaxiFront size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '14px',
										color: COLORS.primary,
									}}
								>
									Service Pick Up
									<br />& Drop Facility
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#BED0EC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103 border-2 border-[#0050A5]'>
								<GrWorkshop size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '14px',
										color: COLORS.primary,
									}}
								>
									Service Workshop
									<br />
									Open All 7 Days
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#BED0EC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103 border-2 border-[#0050A5]'>
								<PiSealCheckBold size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '14px',
										color: COLORS.primary,
									}}
								>
									YM Genuine Parts
									<br />& Oil
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#BED0EC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103 border-2 border-[#0050A5]'>
								<LuHandshake size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '14px',
										color: COLORS.primary,
									}}
								>
									Annual Maintenance
									<br />
									Plan Coverage
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#BED0EC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103 border-2 border-[#0050A5]'>
								<RiShieldStarFill size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '14px',
										color: COLORS.primary,
									}}
								>
									5 Years Standard
									<br />
									Warranty
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#BED0EC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103 border-2 border-[#0050A5]'>
								<GrWorkshop size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '14px',
										color: COLORS.primary,
									}}
								>
									Service Workshop
									<br />
									Open All 7 Days
								</p>
							</div>
							<div className='flex flex-col items-center text-center bg-[#BED0EC] shadow-md p-6 rounded-lg w-1/5 h-1/2 cursor-pointer tranform hover:scale-103 border-2 border-[#0050A5]'>
								<MdDateRange size={32} color={COLORS.primary} />
								<p
									className='mt-3'
									style={{
										...FONTS.paragraph,
										fontSize: '14px',
										color: COLORS.primary,
									}}
								>
									24 x 7 Assistance
									<br />
									Through RSA
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* FOOTER START */}
				<footer className={`h-auto pt-2 pl-28`}>
					<div className='grid grid-cols-4 gap-6 px-20'>
						{/* Image Card - Full Height (No border) */}
						<div className='col-span-1 p-4 rounded h-full border-0 -ml-28'>
							<img
								src={appimage}
								alt='appimage'
								className='p-2 h-[60px] w-[260px] rounded'
							/>
						</div>

						{/* Remaining Cards - Full Width (No border) */}
						<div className='col-span-3 grid grid-cols-3 gap-6 p-3 w-full border-0'>
							<div className='p-4 w-full h-full'>
								<p
									className=' text-2xl'
									style={{
										...FONTS.sub_heading1,
									}}
								>
									Yes Advantages
								</p>
								<ol className='pt-3 text-red-900 text-xl flex flex-col gap-2'>
									{/* First Item */}
									<li className='flex items-center py-1 text-[#0050A5] hover:underline cursor-pointer'>
										<BsTruck className=' text-xl mr-2' />
										<span style={{ ...FONTS.paragraph }}>
											Free Shipping & Delivery
										</span>
									</li>

									{/* Second Item */}
									<Link
										to='/contact'
										className='flex items-center py-1 text-[#0050A5] hover:underline cursor-pointer'
									>
										<LiaCertificateSolid className=' text-xl mr-2' />
										<span style={{ ...FONTS.paragraph }}>
											Certified Employees
										</span>
									</Link>

									{/* Third Item */}
									<Link
										to='/contact'
										className='flex items-center py-1 text-[#0050A5] hover:underline cursor-pointer'
									>
										<RxLapTimer className=' text-xl mr-2' />
										<span style={{ ...FONTS.paragraph }}>On Time Delivery</span>
									</Link>
								</ol>
							</div>

							<div className='p-4 w-full h-full'>
								<p
									className=' font-bold text-3xl'
									style={{
										...FONTS.sub_heading1,
									}}
								>
									About YM
								</p>
								<ol className='pt-3 text-[#0050A5] text-xl flex flex-col'>
									<li
										className='py-1 hover:underline cursor-pointer'
										style={{ ...FONTS.paragraph }}
									>
										About Us
									</li>
									<Link
										to='/contact-us'
										className='py-1 text-[#0050A5] hover:underline cursor-pointer'
										style={{ ...FONTS.paragraph }}
									>
										Contact Us
									</Link>
									<Link
										to='/services'
										className='py-1 text-[#0050A5] hover:underline cursor-pointer'
										style={{ ...FONTS.paragraph }}
									>
										Services
									</Link>
								</ol>
							</div>

							<div className='p-4 w-full h-full'>
								<p
									className=' font-bold text-3xl'
									style={{
										...FONTS.sub_heading1,
									}}
								>
									Customer Support
								</p>
								<ol className='pt-3 text-[#0050A5] text-xl flex flex-col'>
									<Link
										to='/contact-us'
										className='py-1 text-[#0050A5] hover:underline'
										style={{ ...FONTS.paragraph }}
									>
										Enquiry Form
									</Link>
									<Link
										to='/help-center'
										className='py-1 text-[#0050A5] hover:underline'
										style={{ ...FONTS.paragraph }}
									>
										Cancellation and Returns
									</Link>
									<Link
										to='/faqs'
										className='py-1 text-[#0050A5] hover:underline'
										style={{ ...FONTS.paragraph }}
									>
										Delivery Information
									</Link>
								</ol>
							</div>
							<div className='w-[900px] mr-10'>
								<div className='grid grid-cols-1 gap-2 px-6'>
									<div className=''>
										<hr className='w-full border-0.5 border-[#0050A5]' />

										{/* Text on left, icons on right */}
										<div className='flex justify-between items-center text-[#0050A5] text-xl py-2'>
											<p className='font-lg text-base'>Download our App</p>

											<div className='flex items-center gap-4'>
												<div className=' text-[#0050A5]  text-3xl'>
													<BiLogoPlayStore size={16} />
												</div>
											</div>
										</div>
									</div>
									<div className=''>
										<hr className='w-full border-.5 border-[#0050A5]' />

										<div className=''>
											{/* Text on left, icons on right */}
											<div className='flex justify-between items-center text-[#0050A5] text-xl py-2'>
												<p className='font-lg text-base'>Social Media</p>

												<div className='flex items-center gap-4'>
													<div className='text-[#0050A5]  text-3xl'>
														<FaInstagramSquare size={16} />
													</div>
													<div className='text-[#0050A5]  text-3xl'>
														<FaXTwitter size={16} />
													</div>
													<div className='text-[#0050A5]  text-3xl'>
														<FaFacebook size={16} />
													</div>
													<div className='text-[#0050A5]  text-3xl'>
														<FaYoutube size={16} />
													</div>
													<div className=' text-[#0050A5]  text-3xl'>
														<SiIndeed size={16} />
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className=''>
										<hr className='w-full border-0.5 border-[#0050A5]' />

										{/* Text on left, icons on right */}
										<div className=''>
											{/* Text on left, icons on right */}
											<div className='flex justify-between items-center  text-[#0050A5] text-xl py-2'>
												<p className='font-lg text-base'>Contact Us</p>
												<div className='flex items-center  gap-4'>
													<div className='text-[#0050A5] text-3xl'>
														<FaPhoneAlt size={16} />
													</div>
													<div className='text-[#0050A5] text-3xl'>
														<MdEmail size={16} />
													</div>
													<div className='text-[#0050A5] text-3xl'>
														<FaSquareWhatsapp size={16} />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer>
				{/* Footer Bottom */}
				<div className='px-24 py-4 border-t border-[#0050A5] bg-[#BED0EC]'>
					<div className='flex justify-between items-center text-[#0050A5]'>
						<p style={{ ...FONTS.paragraph, fontSize: '14px' }}>
							© 2024 YM Services. All rights reserved.
						</p>
						<div className='flex gap-4'>
							<Link
								to='/privacy-policy'
								className='hover:underline'
								style={{ ...FONTS.paragraph, fontSize: '14px' }}
							>
								Privacy Policy
							</Link>
							<Link
								to='/terms-conditions'
								className='hover:underline'
								style={{ ...FONTS.paragraph, fontSize: '14px' }}
							>
								Terms & Conditions
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
