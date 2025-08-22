import { useEffect, useState } from 'react';
import {
	getUserProfile,
	updateUserProfile,
} from '../../features/Profile/service';
import { toast } from 'react-toastify';

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	image?: string;
	contact_info: {
		city: string;
		state: string;
		phoneNumber: string;
		address1: string;
		address2: string;
		[key: string]: string;
	};
	vehicleInfo: Array<{
		registerNumber: string;
		model: string;
		year: string;
		company: string;
		fuleType: string;
		[key: string]: string;
	}>;
	[key: string]: any;
}

interface Car {
	model: string;
	registerNumber: string;
	company?: string;
	year?: string;
	fuleType?: string;
}

const ProfilePage: React.FC = () => {
	const [isCarTab, setIsCarTab] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [profileData, setProfileData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		image: '',
		contact_info: {
			city: '',
			state: '',
			phoneNumber: '',
			address1: '',
			address2: '',
		},
		vehicleInfo: [{
			registerNumber: '',
			model: '',
			company: '',
			fuleType: '',
			year: '',
		}],
	});
	const [errors, setErrors] = useState<any>({});
	const [editCarMode, setEditCarMode] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [currentCarIndex, setCurrentCarIndex] = useState<number | null>(null);

	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		image: '',
		contact_info: {
			city: '',
			state: '',
			phoneNumber: '',
			address1: '',
			address2: '',
		},
		vehicleInfo: [{
			registerNumber: '',
			model: '',
			company: '',
			fuleType: '',
			year: '',
		}],
	});

	const fetchUserProfile = async () => {
		try {
			const response: any = await getUserProfile({});
			if (response) {
				const vehicleInfo = response?.data?.data?.vehicleInfo 
					? Array.isArray(response.data.data.vehicleInfo) 
						? response.data.data.vehicleInfo 
						: [response.data.data.vehicleInfo]
					: [{
						registerNumber: '',
						model: '',
						company: '',
						fuleType: '',
						year: '',
					}];

				setFormData({
					firstName: response?.data?.data?.firstName || '',
					lastName: response?.data?.data?.lastName || '',
					email: response?.data?.data?.email || '',
					image: response?.data?.data?.image || '',
					contact_info: {
						city: response?.data?.data?.contact_info?.city || '',
						state: response?.data?.data?.contact_info?.state || '',
						phoneNumber: response?.data?.data?.contact_info?.phoneNumber || '',
						address1: response?.data?.data?.contact_info?.address1 || '',
						address2: response?.data?.data?.contact_info?.address2 || '',
					},
					vehicleInfo: vehicleInfo,
				});
				setProfileData(response?.data?.data);
			}
		} catch (error) {
			console.error('Error fetching user profile:', error);
		}
	};

	useEffect(() => {
		fetchUserProfile();
	}, []);

	console.log(profileData, 'profile')

	const validateField = (name: string, value: string) => {
		switch (name) {
			case 'firstName':
				return !value.trim()
					? 'First Name is required'
					: value.trim().length < 3
					? 'First Name must be at least 3 characters'
					: '';
			case 'lastName':
				return !value.trim()
					? 'Last Name is required'
					: value.trim().length < 1
					? 'Last Name must be at least 1 character'
					: '';
			case 'email':
				if (!value.trim()) return 'Email is required';
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
					return 'Invalid email format';
				return '';
			case 'contact_info.phoneNumber':
				if (!value.trim()) return 'Phone number is required';
				if (!/^[6-9]\d{9}$/.test(value.replace(/\D/g, '')))
					return 'Invalid Indian phone number (10 digits starting with 6-9)';
				return '';
			case 'contact_info.address1':
				return !value.trim()
					? 'Address 1 is required'
					: value.trim().length < 5
					? 'Address must be at least 5 characters'
					: '';
			case 'contact_info.address2':
				return !value.trim()
					? 'Address 2 is required'
					: value.trim().length < 5
					? 'Address must be at least 5 characters'
					: '';
			case 'contact_info.city':
				return !value.trim()
					? 'City is required'
					: value.trim().length < 3
					? 'City must be at least 3 characters'
					: '';
			case 'contact_info.state':
				return !value.trim()
					? 'State is required'
					: value.trim().length < 3
					? 'State must be at least 3 characters'
					: '';
			case 'vehicleInfo.registerNumber':
				return !value.trim()
					? 'Registration number is required'
					: !/^[A-Za-z]{2}\s?\d{2}\s?[A-Za-z]{1,2}\s?\d{4}$/.test(value.trim())
					? 'Invalid registration format (e.g., MH 01 AB 1234)'
					: '';
			case 'vehicleInfo.model':
				return !value.trim() ? 'Model is required' : '';
			case 'vehicleInfo.company':
				return !value.trim() ? 'Company is required' : '';
			case 'vehicleInfo.year':
				if (!value.trim()) return 'Year is required';
				if (!/^\d{4}$/.test(value.trim())) return 'Year must be 4 digits';
				if (
					parseInt(value) < 1900 ||
					parseInt(value) > new Date().getFullYear() + 1
				)
					return `Year must be between 1900 and ${
						new Date().getFullYear() + 1
					}`;
				return '';
			case 'vehicleInfo.fuleType':
				return !value.trim() ? 'Fuel type is required' : '';
			default:
				return '';
		}
	};

	const validateForm = () => {
		const newErrors: any = {};
		let isValid = true;

		// Validate user fields
		const userFields = ['firstName', 'lastName', 'email'];
		userFields.forEach((field) => {
			const error = validateField(field, formData[field]);
			if (error) {
				newErrors[field] = error;
				isValid = false;
			}
		});

		// Validate contact info
		const contactFields = [
			'phoneNumber',
			'address1',
			'address2',
			'city',
			'state',
		];
		contactFields.forEach((field) => {
			const error = validateField(
				`contact_info.${field}`,
				formData.contact_info[field]
			);
			if (error) {
				newErrors[`contact_info.${field}`] = error;
				isValid = false;
			}
		});

		// Validate vehicle info if in car tab
		if (isCarTab || editCarMode) {
			formData.vehicleInfo.forEach((car, index) => {
				const vehicleFields = [
					'registerNumber',
					'model',
					'company',
					'year',
					'fuleType',
				];
				vehicleFields.forEach((field) => {
					const error = validateField(
						`vehicleInfo.${field}`,
						car[field]
					);
					if (error) {
						newErrors[`vehicleInfo.${index}.${field}`] = error;
						isValid = false;
					}
				});
			});
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => {
			if (name.includes('.')) {
				const [parent, child] = name.split('.');
				if (parent === 'vehicleInfo' && currentCarIndex !== null) {
					const updatedVehicleInfo = [...prev.vehicleInfo];
					updatedVehicleInfo[currentCarIndex] = {
						...updatedVehicleInfo[currentCarIndex],
						[child]: value
					};
					return {
						...prev,
						vehicleInfo: updatedVehicleInfo
					};
				}
				return {
					...prev,
					[parent]: {
						...prev[parent],
						[child]: value,
					},
				};
			}
			return {
				...prev,
				[name]: value,
			};
		});

		// Validate only if form has been submitted or field has error
		if (formSubmitted || errors[name]) {
			const error = validateField(name, value);
			setErrors((prev: any) => ({ ...prev, [name]: error }));
		}
	};

	const addCar = () => {
		setEditCarMode(true);
		setCurrentCarIndex(formData.vehicleInfo.length);
		setFormData(prev => ({
			...prev,
			vehicleInfo: [
				...prev.vehicleInfo,
				{
					registerNumber: '',
					model: '',
					company: '',
					fuleType: '',
					year: '',
				}
			]
		}));
	};

	const handleEditCar = (_car: Car, index: number) => {
		setEditCarMode(true);
		setCurrentCarIndex(index);
	};


	const deleteCar = (index: number) => {
		const newVehicleInfo = [...formData.vehicleInfo];
		newVehicleInfo.splice(index, 1);
		setFormData(prev => ({
			...prev,
			vehicleInfo: newVehicleInfo
		}));
		setEditCarMode(false);
		setCurrentCarIndex(null);
	};

	const handleEditProfile = async () => {
		setFormSubmitted(true);
		const isValid = validateForm();

		if (!isValid) {
			toast.error('Please fix all the fields before submitting');
			return;
		}

		try {
			const transformedData = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				contact_info: {
					phoneNumber: formData.contact_info.phoneNumber,
					address1: formData.contact_info.address1,
					address2: formData.contact_info.address2,
					city: formData.contact_info.city,
					state: formData.contact_info.state,
				},
				image: formData.image,
				vehicleInfo: formData.vehicleInfo,
			};

			const response = await updateUserProfile(transformedData);
			if (response) {
				toast.success('Profile updated successfully!');
				setEditMode(false);
				setEditCarMode(false);
				setFormSubmitted(false);
				setCurrentCarIndex(null);
				fetchUserProfile();
			}else{
				toast.error("Car Register Number already exits")
			}
		} catch (error) {
			console.error('Error updating profile:', error);
			toast.error('Failed to update profile');
		}
	};

	return (
		<div className='h-screen w-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden'>
			<div className='relative w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden'>
				{/* Car Details Panel */}
				<div
					className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
						isCarTab ? 'opacity-100 z-20' : 'opacity-0 z-10'
					}`}
				>
					<div className='flex h-full w-full'>
						{/* Blue Section - Left */}
						<div
							className='w-1/2  relative overflow-hidden'
							style={{ backgroundColor: '#0050A5' }}
						>
							<div className='absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent' />
							<div className='relative z-10 flex flex-col items-center justify-center h-full text-white p-8'>
								<h2 className='text-xl font-bold mb-4'>User Profile</h2>
								<p className='text-blue-100 text-center mb-8 leading-relaxed'>
									Switch to manage your personal information and account details
								</p>
								<button
									onClick={() => setIsCarTab(false)}
									className='px-3 py-1 border-2 border-white bg-white rounded-full text-[#0050A5] font-medium  transition-all duration-300 hover:scale-105'
								>
									USER PROFILE
								</button>
							</div>
							<div className='absolute -right-14 top-0 w-24 h-full bg-gray-50 rounded-l-[3rem]' />
						</div>

						{/* Car Details Section - Right */}
						<div className='w-1/2 flex flex-col  p-8 bg-gray-50 relative'>
							<h2 className='text-3xl font-bold text-[#0050A5] mb-6 text-center'>
								Car Details
							</h2>
							<div className='flex-1 overflow-y-auto overflow-x-hidden pr-2 scrollbar-hide'>
								{editCarMode && currentCarIndex !== null ? (
									<div className='w-full max-w-sm mx-auto space-y-4'>
										<div className='space-y-3'>
											<div className='border p-4 rounded-xl bg-white shadow relative'>
												<button
													onClick={() => {
														if (formData.vehicleInfo[currentCarIndex].registerNumber === '' && 
															formData.vehicleInfo[currentCarIndex].model === '') {
															deleteCar(currentCarIndex);
														}
														setEditCarMode(false);
														setCurrentCarIndex(null);
													}}
													className='absolute top-3 right-5 bg-red-600 text-white rounded-md text-sm w-6 h-6 flex items-center justify-center'
													title='Delete this car'
												>
													X
												</button>

												<div className='grid gap-3 mt-8'>
													<div>
														<input
															type='text'
															name='vehicleInfo.registerNumber'
															value={formData.vehicleInfo[currentCarIndex].registerNumber}
															onChange={handleUserChange}
															placeholder='Car Registration No'
															className={`w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
																errors[`vehicleInfo.${currentCarIndex}.registerNumber`]
																	? 'ring-2 ring-red-500'
																	: ''
															}`}
														/>
														{errors[`vehicleInfo.${currentCarIndex}.registerNumber`] && (
															<p className='text-red-500 text-sm mt-1'>
																{errors[`vehicleInfo.${currentCarIndex}.registerNumber`]}
															</p>
														)}
													</div>
													<div>
														<input
															name='vehicleInfo.model'
															type='text'
															placeholder='Car Model'
															value={formData.vehicleInfo[currentCarIndex].model}
															onChange={handleUserChange}
															className={`w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
																errors[`vehicleInfo.${currentCarIndex}.model`]
																	? 'ring-2 ring-red-500'
																	: ''
															}`}
														/>
														{errors[`vehicleInfo.${currentCarIndex}.model`] && (
															<p className='text-red-500 text-sm mt-1'>
																{errors[`vehicleInfo.${currentCarIndex}.model`]}
															</p>
														)}
													</div>
													<div>
														<input
															name='vehicleInfo.company'
															type='text'
															placeholder='Car Company'
															value={formData.vehicleInfo[currentCarIndex].company}
															onChange={handleUserChange}
															className={`w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
																errors[`vehicleInfo.${currentCarIndex}.company`]
																	? 'ring-2 ring-red-500'
																	: ''
															}`}
														/>
														{errors[`vehicleInfo.${currentCarIndex}.company`] && (
															<p className='text-red-500 text-sm mt-1'>
																{errors[`vehicleInfo.${currentCarIndex}.company`]}
															</p>
														)}
													</div>
													<div>
														<input
															name='vehicleInfo.year'
															type='text'
															placeholder='Car Year'
															value={formData.vehicleInfo[currentCarIndex].year}
															onChange={handleUserChange}
															className={`w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
																errors[`vehicleInfo.${currentCarIndex}.year`]
																	? 'ring-2 ring-red-500'
																	: ''
															}`}
														/>
														{errors[`vehicleInfo.${currentCarIndex}.year`] && (
															<p className='text-red-500 text-sm mt-1'>
																{errors[`vehicleInfo.${currentCarIndex}.year`]}
															</p>
														)}
													</div>
													<div>
														<input
															name='vehicleInfo.fuleType'
															type='text'
															placeholder='Car Fuel Type'
															value={formData.vehicleInfo[currentCarIndex].fuleType}
															onChange={handleUserChange}
															className={`w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
																errors[`vehicleInfo.${currentCarIndex}.fuleType`]
																	? 'ring-2 ring-red-500'
																	: ''
															}`}
														/>
														{errors[`vehicleInfo.${currentCarIndex}.fuleType`] && (
															<p className='text-red-500 text-sm mt-1'>
																{errors[`vehicleInfo.${currentCarIndex}.fuleType`]}
															</p>
														)}
													</div>
													<div className='flex gap-3 '>
														<button
															onClick={() => {
																setEditCarMode(false);
																setCurrentCarIndex(null);
															}}
															className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 bg-gray-400  shadow-lg'
														>
															Cancel
														</button>
														<button
															onClick={handleEditProfile}
															className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 bg-[#0050A5] shadow-lg'
														>
															SAVE
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								) : (
									<>
										{profileData?.vehicleInfo?.map((car, index) => (
											<div key={index} className='space-y-4 bg-white p-6 rounded-xl shadow-lg mb-4'>
												<div className='space-y-3'>
													<p className='text-lg flex'>
														<strong className='text-gray-700 w-1/2'>
															Register No:
														</strong>{' '}
														<span className='text-gray-600 w-2/3'>
															{car?.registerNumber || 'N/A'}
														</span>
													</p>
													<p className='text-lg flex'>
														<strong className='text-gray-700 w-1/2'>
															Car Model:
														</strong>{' '}
														<span className='text-gray-600 w-2/3'>
															{car?.model}
														</span>
													</p>
													<p className='text-lg flex'>
														<strong className='text-gray-700 w-1/2'>
															Car Company:
														</strong>{' '}
														<span className='text-gray-600 w-2/3'>
															{car?.company}
														</span>
													</p>
													<p className='text-lg flex'>
														<strong className='text-gray-700 w-1/2'>
															Car Year:
														</strong>{' '}
														<span className='text-gray-600 w-2/3'>
															{car?.year}
														</span>
													</p>
													<p className='text-lg flex'>
														<strong className='text-gray-700 w-1/2'>
															Fuel Type:
														</strong>{' '}
														<span className='text-gray-600 w-2/3'>
															{car?.fuleType}
														</span>
													</p>
												</div>
												<div className='flex flex-col items-center justify-center'>
													<button
														onClick={() => handleEditCar(car, index)}
														className='w-[180px] py-1.5 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg mt-4'
														style={{ backgroundColor: '#0050A5' }}
													>
														EDIT
													</button>
												</div>
											</div>
										))}

										<div className='flex flex-col mt-8 items-center justify-center'>
											<button
												onClick={addCar}
												className='w-[180px] py-1.5 text-white font-medium rounded-lg transition-all duration-300 hover:scale-95 shadow-lg sticky bottom-0'
												style={{ backgroundColor: '#0050A5' }}
											>
												ADD ANOTHER CAR
											</button>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* User Profile Panel */}
				<div
					className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
						isCarTab ? 'opacity-0 z-10' : 'opacity-100 z-20'
					}`}
				>
					<div className='flex h-full w-full'>
						{/* User Profile Section - Left */}
						<div className='w-1/2 flex flex-col items-center justify-top pt-10 p-4 bg-gray-50 relative'>
							<h2 className='text-3xl font-bold text-[#0050A5] mb-6'>
								User Information
							</h2>

							<div className='w-full overflow-scroll scrollbar-hide px-2 space-y-4'>
								{editMode ? (
									<>
										<div>
											<input
												name='firstName'
												value={formData?.firstName}
												onChange={handleUserChange}
												placeholder='First Name'
												maxLength={15}
												minLength={3}
												required={true}
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors.firstName ? 'ring-2 ring-red-500' : ''
												}`}
											/>
											{errors.firstName && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.firstName}
												</p>
											)}
										</div>
										<div>
											<input
												name='lastName'
												value={formData?.lastName}
												onChange={handleUserChange}
												maxLength={15}
												placeholder='Last Name'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors.lastName ? 'ring-2 ring-red-500' : ''
												}`}
											/>
											{errors.lastName && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.lastName}
												</p>
											)}
										</div>
										<div>
											<input
												name='email'
												value={formData?.email}
												onChange={handleUserChange}
												maxLength={40}
												placeholder='Email'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors.email ? 'ring-2 ring-red-500' : ''
												}`}
											/>
											{errors.email && (
												<p className='text-red-500 text-sm mt-1'>
													{errors.email}
												</p>
											)}
										</div>
										<div>
											<input
												name='contact_info.phoneNumber'
												value={formData?.contact_info?.phoneNumber}
												onChange={handleUserChange}
												placeholder='Phone Number'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors['contact_info.phoneNumber']
														? 'ring-2 ring-red-500'
														: ''
												}`}
											/>
											{errors['contact_info.phoneNumber'] && (
												<p className='text-red-500 text-sm mt-1'>
													{errors['contact_info.phoneNumber']}
												</p>
											)}
										</div>
										<div>
											<input
												name='contact_info.address1'
												value={formData?.contact_info?.address1}
												maxLength={25}
												onChange={handleUserChange}
												placeholder='Address 1'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors['contact_info.address1']
														? 'ring-2 ring-red-500'
														: ''
												}`}
											/>
											{errors['contact_info.address1'] && (
												<p className='text-red-500 text-sm mt-1'>
													{errors['contact_info.address1']}
												</p>
											)}
										</div>

										<div>
											<input
												name='contact_info.address2'
												value={formData?.contact_info?.address2}
												onChange={handleUserChange}
												maxLength={25}
												placeholder='Address 2'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors['contact_info.address2']
														? 'ring-2 ring-red-500'
														: ''
												}`}
											/>
											{errors['contact_info.address2'] && (
												<p className='text-red-500 text-sm mt-1'>
													{errors['contact_info.address2']}
												</p>
											)}
										</div>

										<div>
											<input
												name='contact_info.city'
												value={formData?.contact_info?.city}
												maxLength={15}
												onChange={handleUserChange}
												placeholder='City'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors['contact_info.city']
														? 'ring-2 ring-red-500'
														: ''
												}`}
											/>
											{errors['contact_info.city'] && (
												<p className='text-red-500 text-sm mt-1'>
													{errors['contact_info.city']}
												</p>
											)}
										</div>

										<div>
											<input
												name='contact_info.state'
												value={formData?.contact_info?.state}
												maxLength={15}
												onChange={handleUserChange}
												placeholder='state'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
													errors['contact_info.state']
														? 'ring-2 ring-red-500'
														: ''
												}`}
											/>
											{errors['contact_info.state'] && (
												<p className='text-red-500 text-sm mt-1'>
													{errors['contact_info.state']}
												</p>
											)}
										</div>

										<div>
											<div className='px-4 py-3 bg-gray-200 border-0 rounded-lg '>
												<input
													type='file'
													name='image'
													accept='image/*'
													onChange={(e) => {
														const file = e.target.files?.[0];
														if (file) {
															setFormData((prev: any) => ({
																...prev,
																image: URL.createObjectURL(file),
															}));
														}
													}}
												/>
											</div>
										</div>
										<div className='flex gap-4 '>
											<button
												className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 bg-gray-400  shadow-lg'
												onClick={() => setEditMode(false)}
											>
												CANCEL
											</button>
											<button
												onClick={() => handleEditProfile()}
												className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300  shadow-lg'
												style={{ backgroundColor: '#0050A5' }}
											>
												SAVE
											</button>
										</div>
									</>
								) : (
									<div className='space-y-4 bg-white p-6 rounded-xl shadow-lg'>
										<div className='space-y-3'>
											<div className='flex justify-center'>
												<img
													src={formData?.image}
													alt='profile Pic'
													className='w-24 h-24 rounded-full object-cover'
												/>
											</div>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>
													First Name:
												</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.firstName}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>
													Last Name:
												</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.lastName}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>Email:</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.email}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>Phone:</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.contact_info?.phoneNumber}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>
													Address:
												</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.contact_info?.address1},{' '}
													{formData?.contact_info?.address2}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>City:</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.contact_info?.city}
												</span>
											</p>

											<p className='text-lg flex'>
												<strong className='text-gray-700 w-1/2'>State:</strong>
												<span className='text-gray-600 break-words w-2/3'>
													{formData?.contact_info?.state}
												</span>
											</p>
										</div>

										<div className='flex flex-col items-center justify-center'>
											<button
												onClick={() => setEditMode(true)}
												className='w-[180px] py-1.5 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg mt-4'
												style={{ backgroundColor: '#0050A5' }}
											>
												EDIT
											</button>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Blue Section - Right */}
						<div
							className='w-1/2  relative overflow-hidden'
							style={{ backgroundColor: '#0050A5' }}
						>
							<div className='absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent' />
							<div className='relative z-10 flex flex-col items-center justify-center h-full text-white p-8'>
								<h2 className='text-2xl font-bold mb-4'>Car Details</h2>
								<p className='text-blue-100 text-center mb-8 leading-relaxed'>
									Switch to manage your vehicle information and service requests
								</p>
								<button
									onClick={() => setIsCarTab(true)}
									className='px-3 py-1 border-2 border-white bg-white text-[#0050A5] rounded-full  font-medium  transition-all duration-300 hover:scale-105'
								>
									CAR DETAILS
								</button>
							</div>
							<div className='absolute -left-14 top-0 w-24 h-full bg-gray-50 rounded-r-[3rem]' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;