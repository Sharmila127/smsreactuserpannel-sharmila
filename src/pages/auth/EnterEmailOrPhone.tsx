import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { FONTS } from '../../constants/constant';

type FormData = {
	emailOrPhone: string;
};

const EnterEmailOrPhone = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<FormData>();

	const handleEmailSubmit = () => {
		try {
			// setIsLoading(true);
			const emailOrPhone = getValues('emailOrPhone');
			if (!emailOrPhone) {
				setError('emailOrPhone', {
					message: 'Please enter your email or phone',
				});
				return;
			}
			clearErrors('emailOrPhone');
			navigate('/verify-otp');
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	const onSubmit = () => {
		handleEmailSubmit();
	};

	return (
		<AuthLayout title='Enter Email or Phone'>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-semibold text-white'>
						Email or Phone
					</label>
					<input
						type='text'
						placeholder='Enter email or phone number'
						{...register('emailOrPhone', {
							required: 'This field is required',
							pattern: {
								value: /^(\+?\d{10,15}|[^\s@]+@[^\s@]+\.[^\s@]+)$/,
								message: 'Enter a valid email or phone number',
							},
						})}
						className={`w-full px-4 py-3 border text-gray-800 placeholder:text-[#9f3f3f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b111e] bg-white text-sm ${errors.emailOrPhone ? 'border-red-500' : 'border-[#d77c7c]'
							}`}
					/>
					{errors.emailOrPhone && (
						<span
							className='text-xs text-red-600'
							style={{ ...FONTS.paragraph, fontSize: '12px' }}
						>
							{errors.emailOrPhone.message}
						</span>
					)}
				</div>

				<button
					type='submit'
					className='w-full py-3 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:brightness-110 text-sm bg-gradient-to-r from-[#9b111e] to-[#d23c3c]'
				>
					Set OTP
				</button>

				<div className='text-center pt-1'>
					<Link
						to='/login'
						className='text-white hover:underline text-lg text-[#d23c3c] font-bold'
					>
						Back to Login
					</Link>
				</div>
			</form>
		</AuthLayout>
	);
};

export default EnterEmailOrPhone;
