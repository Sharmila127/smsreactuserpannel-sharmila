/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { forgotPassword, verifyotp, resetPassword } from '../../features/auth';
import { StoreLocalStorage } from '../../utils/localStorage';

type ResetFormData = {
	email: string;
	newPassword: string;
	confirmPassword: string;
	otp?: string;
};

const ResetPassword = () => {
	const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
	const [AuthToken, setAuthToken] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
	const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<ResetFormData>();

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

	const handleEmailSubmit = async () => {
		const email = getValues('email');
		if (!email) {
			setError('email', { message: 'Please enter your email' });
			return;
		}
		clearErrors('email');

		try {
			// setIsLoading(true);
			const response: any = await forgotPassword({ email });
			if (response) {
				setAuthToken(response.data.data.token);

				setStep('otp');
			} else {
				setError('email', { message: response || 'Failed to send OTP' });
			}
			// setIsLoading(false);
		} catch (err) {
			console.error('Send OTP error:', err);
			setError('email', { message: 'Error sending OTP. Please try again.' });
		} finally {
			// setIsLoading(false);
		}
	};

	const handleOtpVerify = async () => {
		const enteredOtp = otpDigits.join('');

		try {
			// setIsLoading(true);
			const data = { AuthToken, otp: enteredOtp };
			const response: any = await verifyotp(JSON.stringify(data));
			if (response) {
				// localStorage.setItem('authToken', response.data.data);
				StoreLocalStorage('authToken', response.data.data)
				setStep('reset');
				clearErrors('otp');
			} else {
				setError('otp', { message: response || 'Invalid OTP' });
			}
			// setIsLoading(false);
		} catch (err) {
			console.error('OTP verify error:', err);
			setError('otp', { message: 'Error verifying OTP. Please try again.' });
		} finally {
			// setIsLoading(false);
		}
	};

	const onSubmit = async (data: ResetFormData) => {
		if (data.newPassword !== data.confirmPassword) {
			setError('confirmPassword', { message: 'Passwords do not match' });
			return;
		}
		try {
			// setIsLoading(true);
			const response: any = await resetPassword({
				newPassword: data.newPassword,
				oldPassword: data.confirmPassword,
			});

			if (response) {
				alert('Password reset successful! Please login.');
				navigate('/login');
			} else {
				setError('newPassword', {
					message: response.message || 'Failed to reset password',
				});
			}
			// setIsLoading(false);
		} catch (err) {
			console.error('Reset password error:', err);
			setError('newPassword', {
				message: 'Error resetting password. Please try again.',
			});
		} finally {
			// setIsLoading(false);
		}
	};

	return (
		<AuthLayout
			title={
				step === 'email'
					? 'Verify Email'
					: step === 'otp'
						? 'Enter OTP'
						: 'Reset Password'
			}
		>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
				{/* Email Step */}
				{step === 'email' && (
					<div className='flex flex-col space-y-2'>
						<label className='text-sm font-semibold text-white'>
							Email Address
						</label>
						<input
							type='email'
							placeholder='Enter your email address'
							{...register('email', { required: 'Email is required' })}
							className={`w-full mb-5 px-4 py-3 border text-[#0050A5] rounded-lg bg-white/70 placeholder:text-[#0050A5] focus:ring-2 focus:ring-[#0050A5] text-sm ${errors.email ? 'border-[#0050A5]' : 'border-[#0050A5]'
								}`}
						/>
						{errors.email && (
							<span className='text-xs text-[#0050A5]'>
								{errors.email.message}
							</span>
						)}
						<button
							type='button'
							onClick={handleEmailSubmit}
							className='w-full py-2 mt-2 text-white font-semibold rounded-full bg-[#0050A5] text-sm'
						>
							Send OTP
						</button>
					</div>
				)}

				{/* OTP Step */}
				{step === 'otp' && (
					<div className='flex flex-col space-y-3'>
						<label className='text-sm font-semibold text-white'>
							Enter the 6-digit OTP
						</label>
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
							<span className='text-xs text-[#0050A5]'>{errors.otp.message}</span>
						)}
						<button
							type='button'
							onClick={handleOtpVerify}
							className='w-full py-2 mt-2 text-white font-semibold rounded-full bg-[#0050A5] text-sm'
						>
							Verify OTP
						</button>
					</div>
				)}

				{/* Reset Password Step */}
				{step === 'reset' && (
					<>
						{/* New Password */}
						<div className='flex flex-col space-y-2'>
							<label className='text-sm font-semibold text-white'>
								New Password
							</label>
							<div className='relative'>
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder='Enter new password'
									{...register('newPassword', {
										required: 'New password is required',
										minLength: { value: 8, message: 'Minimum 8 characters' },
										pattern: {
											value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
											message:
												'Include uppercase, lowercase, number & special char',
										},
									})}
									className={`w-full px-4 py-3 border text-white placeholder:text-[#0050A5] rounded-lg bg-white/70 pr-10 text-sm ${errors.newPassword ? 'border-[#0050A5]' : 'border-[#0050A5]'
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
							{errors.newPassword && (
								<span className='text-xs text-[#0050A5]'>
									{errors.newPassword.message}
								</span>
							)}
						</div>

						{/* Confirm Password */}
						<div className='flex flex-col space-y-2'>
							<label className='text-sm font-semibold text-white'>
								Confirm New Password
							</label>
							<div className='relative'>
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder='Confirm new password'
									{...register('confirmPassword', {
										required: 'Please confirm your password',
									})}
									className={`w-full px-4 py-3 border text-white placeholder:text-[#0050A5] rounded-lg bg-white/70 pr-10 text-sm ${errors.confirmPassword
										? 'border-[#0050A5]'
										: 'border-[#d77c7c]'
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
							className='w-full py-3 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:brightness-110 text-sm bg-[#0050A5]'
						>
							Reset Password
						</button>
					</>
				)}

				<div className='text-center pt-1'>
					<Link
						to='/login'
						className='text-white hover:underline text-md text-white font-bold'
					>
						Back to Login
					</Link>
				</div>
			</form>
		</AuthLayout>
	);
};

export default ResetPassword;
