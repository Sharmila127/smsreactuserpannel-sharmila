/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';

import AuthLayout from './AuthLayout';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { verifyotp } from '../../features/auth';
import { useAuth } from './AuthContext';
import { GetLocalStorage, RemoveLocalStorage } from '../../utils/localStorage';

type OtpFormData = {
	otp: string;
};

const OtpVerificationPage = () => {
	const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
	const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
	const { login } = useAuth();
	const {
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<OtpFormData>();
	const navigate = useNavigate();

	const handleOtpChange = (index: number, value: string) => {
		if (!/^\d?$/.test(value)) return;
		const updated = [...otpDigits];
		updated[index] = value;
		setOtpDigits(updated);
		if (value && index < 5) {
			otpRefs.current[index + 1]?.focus();
		}
	};

	const handleOtpKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace') {
			e.preventDefault();
			const updated = [...otpDigits];
			if (otpDigits[index]) {
				updated[index] = '';
			} else if (index > 0) {
				updated[index - 1] = '';
				otpRefs.current[index - 1]?.focus();
			}
			setOtpDigits(updated);
		}
	};

	// const AuthToken: any = localStorage.getItem('AuthToken');
	const AuthToken: any = GetLocalStorage('AuthToken')
	const otp = localStorage.getItem('OTP');
	const handleOtpVerify = async () => {
		const enteredOtp = otpDigits?.join('');
		if (enteredOtp?.length !== 6) {
			setError('otp', { message: 'Please enter a valid 6-digit OTP' });
			return;
		}

		try {
			clearErrors('otp');
			const data: any = { AuthToken, otp: enteredOtp };
			const response: any = await verifyotp(data);
			if (response) {
				// localStorage.removeItem('AuthToken');
				RemoveLocalStorage('AuthToken')
				localStorage.removeItem('OTP');
				login(response?.data?.data);
				navigate('/');
			} else {
				setError('otp', {
					message:
						response?.message || 'OTP verification failed. Please try again.',
				});
			}
		} catch (error: any) {
			setError('otp', {
				message:
					error?.response?.data?.message ||
					'An error occurred during verification.',
			});
		}
	};

	return (
		<AuthLayout title='Verify OTP'>
			<form className='space-y-6'>
				<div className='flex flex-col space-y-3'>
					<label className='text-sm font-semibold text-white'>
						Enter the 6-digit OTP
					</label>
					<div>
						<p className='text-white text-right'>OTP: {otp}</p>
					</div>
					<div className='flex justify-between space-x-2'>
						{otpDigits.map((digit, idx) => (
							<input
								key={idx}
								type='text'
								maxLength={1}
								value={digit}
								onChange={(e) => handleOtpChange(idx, e.target.value)}
								onKeyDown={(e) => handleOtpKeyDown(e, idx)}
								ref={(el) => {
									if (el) otpRefs.current[idx] = el;
								}}
								className='w-10 h-12 text-center text-lg rounded-lg border border-[#0050A5] bg-white/80 text-[#0050A5] focus:ring-2 focus:ring-[#0050A5]'
							/>
						))}
					</div>
					{errors.otp && (
						<span className='text-xs text-red-500'>{errors.otp.message}</span>
					)}
					<button
						type='button'
						onClick={handleOtpVerify}
						className='w-full py-2 mt-2 text-white font-semibold rounded-full bg-[#0050A5] text-sm'
					>
						Verify OTP
					</button>
				</div>
			</form>
		</AuthLayout>
	);
};

export default OtpVerificationPage;
