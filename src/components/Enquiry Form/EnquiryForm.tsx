import { useEffect, useRef, useState } from 'react';
import {
	getEnquiryData,
	postEnquiryData,
} from '../../features/Enquiry/service';
import { getUserProfile } from '../../features/Profile/service';
import { FONTS } from '../../constants/constant';
// import { isAbsolute } from 'path';
import { useAuth } from '../../pages/auth/AuthContext';
import { toast } from 'react-toastify';

/* Reusable scroll animation hook */
const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
	options = {}
) => {
	const [isVisible, setIsVisible] = useState(false);
	const elementRef = useRef<T>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
		);

		if (elementRef.current) observer.observe(elementRef.current);
		return () => {
			if (elementRef.current) observer.unobserve(elementRef.current);
		};
	}, []);

	return { elementRef, isVisible };
};

const EnquiryForm = () => {
  const enquiryTitle = useScrollAnimation<HTMLHeadingElement>();
  const [submitted, setSubmitted] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    carModel: '',
    ServiceType: 'general',
    yourEnquiry: '',
    Date: '',
  });
  const { isAuthenticated } = useAuth();	

	// Populate form once profileData is fetched
	useEffect(() => {
		if (profileData) {
			const fullName = `${profileData.firstName || ''} ${
				profileData.lastName || ''
			}`.trim();
			const email = profileData?.email || '';
			const phone = profileData?.contact_info?.phoneNumber || '';
			setFormData((prev) => ({
				...prev,
				fullName,
				email,
				phoneNumber: phone,
			}));
		}
	}, [profileData]);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			await postEnquiryData(formData);
			setSubmitted(true);
			setFormData({
				fullName: '',
				email: '',
				phoneNumber: '',
				carModel: '',
				ServiceType: 'general',
				yourEnquiry: '',
				Date: '',
			});
			toast.success('Enquiry submitted successfully!', { autoClose: 2000 });
		} catch (error) {
			console.log('Data not sent:', error);
		} finally {
			setTimeout(() => setSubmitted(false), 5000);
		}
	};

  useEffect(() => {
	if(isAuthenticated) {
    const fetchProfile = async () => {
      try {
        const response: any = await getUserProfile({});
        setProfileData(response?.data?.data || {});
		console.log('Profile data fetched:', response?.data?.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

		const fetchEnquiries = async () => {
			try {
				await getEnquiryData({});
			} catch (err) {
				console.error('Error fetching enquiries:', err);
			}
		};

    fetchProfile();
    fetchEnquiries();
  }
}, [isAuthenticated]);

	return (
		<div className='w-4/4 mx-auto p-6 bg-white rounded-lg shadow-md'>
			<h1
				ref={enquiryTitle.elementRef}
				className='text-start'
				style={{ ...FONTS.heading }}
			>
				<span className='inline-block pb-1 relative text-start text-[#0050A5] mb-10'>
					Enquiry Form
				</span>
			</h1>

			{submitted && (
				<div className='mb-4 p-4 bg-green-100 text-green-700 rounded'>
					Thank you! Your enquiry has been submitted. We'll contact you shortly.
				</div>
			)}

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-[#0050A5]'
					>
						Full Name *
					</label>
					<input
						type='text'
						id='name'
						name='fullName'
						value={formData.fullName}
						onChange={handleChange}
						required
						disabled
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0050A5] focus:border-[#0050A5]'
					/>
				</div>

				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-[#0050A5]'
					>
						Email *
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
						disabled
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0050A5] focus:border-[#0050A5]'
					/>
				</div>

				<div>
					<label
						htmlFor='phone'
						className='block text-sm font-medium text-[#0050A5]'
					>
						Phone Number *
					</label>
					<input
						type='number'
						id='phone'
						name='phoneNumber'
						value={formData.phoneNumber}
						onChange={handleChange}
						maxLength={10}
						required
						disabled
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0050A5] focus:border-[#0050A5]'
					/>
				</div>

				<div>
					<label
						htmlFor='carModel'
						className='block text-sm font-medium text-[#0050A5]'
					>
						Car Model *
					</label>
					<input
						type='text'
						id='carModel'
						name='carModel'
						value={formData.carModel}
						onChange={handleChange}
						required
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0050A5] focus:border-[#0050A5]'
					/>
				</div>

				<div>
					<label
						htmlFor='serviceType'
						className='block text-sm font-medium text-[#0050A5]'
					>
						Service Type *
					</label>
					<select
						id='serviceType'
						name='ServiceType'
						value={formData.ServiceType}
						onChange={handleChange}
						className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#0050A5] focus:border-[#0050A5] rounded-md'
					>
						<option value='general'>General Service</option>
						<option value='oil'>Oil Change</option>
						<option value='brakes'>Brake Service</option>
						<option value='battery'>Battery Replacement</option>
						<option value='ac'>AC Repair</option>
						<option value='other'>Other</option>
					</select>
				</div>

				<div>
					<label
						htmlFor='preferredDate'
						className='block text-sm font-medium text-[#0050A5]'
					>
						Preferred Service Date
					</label>
					<input
						type='date'
						id='preferredDate'
						name='Date'
						value={formData.Date}
						onChange={handleChange}
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0050A5] focus:border-[#0050A5]'
					/>
				</div>

				<div>
					<label
						htmlFor='enquiry'
						className='block text-sm font-medium text-[#0050A5]'
					>
						Your Enquiry *
					</label>
					<textarea
						id='enquiry'
						name='yourEnquiry'
						rows={4}
						value={formData.yourEnquiry}
						onChange={handleChange}
						required
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0050A5] focus:border-[#0050A5]'
					/>
				</div>

				<div className='flex justify-start space-x-4 mt-6'>
					<button
						type='submit'
						className='w-1/5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0050A5] hover:bg-[#004494] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004494]'
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default EnquiryForm;
