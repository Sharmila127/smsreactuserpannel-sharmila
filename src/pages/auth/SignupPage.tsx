/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { signUp } from '../../features/auth';

type SignupFormData = {
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
};

const SignupPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignupFormData>();

	const onSubmit = async (data: SignupFormData) => {
		const { email, phone, password } = data;
		try {
			const response: any = await signUp({ email, phone, password });
			if (response) {
				localStorage.setItem(
					'otpData',
					JSON.stringify({
						token: response.data.data.token,
						otp: response.data.data.otp,
					})
				);
				// setIsLoading(false);
				navigate('/verify-otp');
			}
		} catch (error) {
			console.error('Signup error:', error);
		} finally {
			// setIsLoading(false);
		}
	};

	const password = watch('password');

	return (
		<AuthLayout title=''>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
				{/* Phone Number */}
				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-semibold text-white'>
						Phone Number
					</label>
					<input
						type='tel'
						placeholder='Enter your phone number'
						{...register('phone', {
							required: 'Phone number is required',
							pattern: {
								value: /^[6-9]\d{9}$/,
								message: 'Enter a valid 10-digit Indian phone number',
							},
						})}
						className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0050A5] bg-white text-sm ${errors.phone ? 'border-[#0050A5]' : 'border-[#0050A5]'
							}`}
					/>
					{errors.phone && (
						<span className='text-xs text-[#0050A5]'>{errors.phone.message}</span>
					)}
				</div>

				{/* Email */}
				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-semibold text-white'>
						Email Address
					</label>
					<input
						type='email'
						placeholder='Enter your email'
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Invalid email format',
							},
						})}
						className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0050A5] bg-white text-sm ${errors.email ? 'border-[#0050A5]' : 'border-[#0050A5]'
							}`}
					/>
					{errors.email && (
						<span className='text-xs text-[#0050A5]'>{errors.email.message}</span>
					)}
				</div>

				{/* Password */}
				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-semibold text-white'>Password</label>
					<div className='relative'>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='Enter password'
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 8,
									message: 'Minimum 8 characters',
								},
								pattern: {
									value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
									message:
										'Must include uppercase, lowercase, number, special char',
								},
							})}
							className={`w-full px-4 py-3 pr-10 border text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0050A5] bg-white text-sm ${errors.password ? 'border-[#0050A5]' : 'border-[#0050A5]'
								}`}
						/>
						<span
							className='absolute top-3 right-3 cursor-pointer'
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeIcon className='w-5 h-5 text-[#0050A5]' />
							) : (
								<EyeSlashIcon className='w-5 h-5 text-[#0050A5]' />
							)}
						</span>
					</div>
					{errors.password && (
						<span className='text-xs text-[#0050A5]'>
							{errors.password.message}
						</span>
					)}
				</div>

				{/* Confirm Password */}
				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-semibold text-white'>
						Confirm Password
					</label>
					<div className='relative'>
						<input
							type={showConfirmPassword ? 'text' : 'password'}
							placeholder='Confirm your password'
							{...register('confirmPassword', {
								required: 'Confirm your password',
								validate: (value) =>
									value === password || 'Passwords do not match',
							})}
							className={`w-full px-4 py-3 pr-10 border text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0050A5] bg-white text-sm ${errors.confirmPassword ? 'border-[#0050A5]' : 'border-[#0050A5]'
								}`}
						/>
						<span
							className='absolute top-3 right-3 cursor-pointer'
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						>
							{showConfirmPassword ? (
								<EyeIcon className='w-5 h-5 text-[#0050A5]' />
							) : (
								<EyeSlashIcon className='w-5 h-5 text-[#0050A5]' />
							)}
						</span>
					</div>
					{errors.confirmPassword && (
						<span className='text-xs text-[#0050A5]'>
							{errors.confirmPassword.message}
						</span>
					)}
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					className='w-full py-3 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 bg-[#0050A5] hover:bg-[#0050A5]'
				>
					Sign Up
				</button>
			</form>
		</AuthLayout>
	);
};

export default SignupPage;
