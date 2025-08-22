import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  FONTS } from '../../constants/constant';

const SignUp: React.FC = () => {
	const [phone, setPhone] = useState('');
	const [otp, setOtp] = useState('');
	const [isOtpSent, setIsOtpSent] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSendOtp = async () => {
		if (phone.length !== 10) {
			alert('Please enter a valid 10-digit phone number');
			return;
		}
		
		setIsLoading(true);
		// Simulate API call
		setTimeout(() => {
			setIsOtpSent(true);
			setIsLoading(false);
			alert('OTP sent to your phone number');
		}, 1500);
	};

	const handleVerifyOtp = async () => {
		if (otp.length !== 6) {
			alert('Please enter a valid 6-digit OTP');
			return;
		}
		
		setIsLoading(true);
		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			alert('Account created successfully!');
			navigate('/');
		}, 1500);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4'>
			<div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105'>
				<div className='text-center mb-8'>
					<h1 
						className='text-3xl font-bold text-green-600 mb-2'
						style={{ ...FONTS.heading }}
					>
						Create Account
					</h1>
					<p 
						className='text-gray-600'
						style={{ ...FONTS.paragraph }}
					>
						Sign up with your phone number
					</p>
				</div>

				{!isOtpSent ? (
					<div className='space-y-6'>
						<div>
							<label 
								className='block text-sm font-medium text-gray-700 mb-2'
								style={{ ...FONTS.paragraph }}
							>
								Phone Number
							</label>
							<input
								type='tel'
								value={phone}
								onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
								placeholder='Enter 10-digit phone number'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300'
								maxLength={10}
							/>
						</div>
						
						<button
							onClick={handleSendOtp}
							disabled={isLoading || phone.length !== 10}
							className='w-full bg-green-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-green-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{isLoading ? 'Sending OTP...' : 'Send OTP'}
						</button>
					</div>
				) : (
					<div className='space-y-6'>
						<div>
							<label 
								className='block text-sm font-medium text-gray-700 mb-2'
								style={{ ...FONTS.paragraph }}
							>
								Enter OTP
							</label>
							<input
								type='text'
								value={otp}
								onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
								placeholder='Enter 6-digit OTP'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-center text-lg tracking-widest'
								maxLength={6}
							/>
							<p className='text-sm text-gray-500 mt-2 text-center'>
								OTP sent to +91 {phone}
							</p>
						</div>
						
						<button
							onClick={handleVerifyOtp}
							disabled={isLoading || otp.length !== 6}
							className='w-full bg-green-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-green-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{isLoading ? 'Creating Account...' : 'Verify & Sign Up'}
						</button>
						
						<button
							onClick={() => {
								setIsOtpSent(false);
								setOtp('');
							}}
							className='w-full text-green-600 py-2 font-medium hover:underline transition-all duration-300'
						>
							Change Phone Number
						</button>
					</div>
				)}

				<div className='mt-8 text-center'>
					<p className='text-gray-600'>
						Already have an account?{' '}
						<button
							onClick={() => navigate('/login')}
							className='text-green-600 font-semibold hover:underline transition-all duration-300'
						>
							Login
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;