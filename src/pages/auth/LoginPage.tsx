import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FONTS } from '../../constants/constant';
import AuthLayout from './AuthLayout';
import { signUp } from '../../features/auth';
import { StoreLocalStorage } from '../../utils/localStorage';

type FormData = {
	phone: string;
};

const LoginPage = () => {
	const isLoading = false;
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FormData>({});

	const onSubmit = async () => {
		try {
			const phone_number = getValues('phone');
			if (
				!phone_number ||
				phone_number.trim() === '' ||
				phone_number.length < 10
			) {
				toast.error('Phone number is required', { autoClose: 3000 });
				return;
			}
			const response: any = await signUp({ phoneNumber: phone_number });
			if (response) {
				// await localStorage.setItem('AuthToken', response?.data?.data?.token);
				StoreLocalStorage('AuthToken', response?.data?.data?.token)
				await localStorage.setItem('OTP', response?.data?.data?.otp);
				navigate('/verify-otp');
			}
		} catch (error) {
			console.error('Login error:', error);
			const errorMessage = 'An error occurred during login. Please try again.';
			toast.error(errorMessage, { autoClose: 3000 });
		}
	};

	return (
		<AuthLayout title='User Login'>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-6 '>
				{/* Phone Number Field */}
				<div className='flex flex-col space-y-2'>
					<label htmlFor='phone' className='text-sm font-bold text-white '>
						Phone Number
					</label>
					<input
						type='tel'
						id='phone'
						maxLength={10}
						placeholder='Enter your phone number'
						{...register('phone', {
							required: 'Phone Number is required',
						})}
						className={`w-full px-4 py-3 border text-gray-800 placeholder:text-[#0050A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0050B5] bg-white text-sm transition ${errors.phone ? 'border-[#0050A5]' : 'border-[#0050A5]'
							}`}
					/>
					{errors.phone && (
						<span
							className='text-xs text-red-600'
							style={{ ...FONTS.paragraph, fontSize: '14px' }}
						>
							{errors.phone.message}
						</span>
					)}
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					disabled={isLoading}
					className={`w-full py-3 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:brightness-110 text-sm bg-[#0050A5] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
						}`}
				>
					{isLoading ? (
						<div className='flex items-center justify-center gap-2'>
							<div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white'></div>
							<span>Logging in...</span>
						</div>
					) : (
						'Login'
					)}
				</button>
			</form>
		</AuthLayout>
	);
};

export default LoginPage;
