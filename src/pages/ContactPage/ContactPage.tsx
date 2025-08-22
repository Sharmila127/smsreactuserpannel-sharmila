import EnquiryForm from '../../components/Enquiry Form/EnquiryForm';
import ReplyMessageList from '../../components/Enquiry Form/ReplyMessageList';
import { FONTS } from '../../constants/constant';

const ContactPage = () => {
	return (
		<div className='py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen'>
			<div className='text-center mb-8'>
				<h1 className='text-[#0050A5] sm:text-4xl' style={{ ...FONTS.heading }}>
					Have Questions About Our Services?
				</h1>
				<p className='mt-3 max-w-2xl mx-auto text-lg text-[#0050A5] sm:mt-4'>
					Fill out the form below and our team will get back to you within 24
					hours.
				</p>
			</div>

			<div className='grid grid-cols-2 lg:grid-cols gap-8'>
				<EnquiryForm />
				<div className='bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[132vh]'>
					<ReplyMessageList />
				</div>{' '}
			</div>
			<div className='mt-12 max-w-7xl mx-auto grid gap-8 lg:grid-cols-2'>
				<div className='bg-white p-6 rounded-lg shadow'>
					<h3 className='text-lg font-medium text-[#0050A5]'>
						Our Contact Info
					</h3>
					<div className='mt-4 space-y-4'>
						<p className='flex items-start'>
							<svg
								className='h-6 w-6 text-[#0050A5]'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
								/>
							</svg>
							<span className='ml-3'>+1 (555) 123-4567</span>
						</p>
						<p className='flex items-start'>
							<svg
								className='h-6 w-6 text-[#0050A5]'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
								/>
							</svg>
							<span className='ml-3'>contact@carservice.com</span>
						</p>
					</div>
				</div>

				<div className='bg-white p-6 rounded-lg shadow'>
					<h3 className='text-lg font-medium text-[#0050A5]'>Service Hours</h3>
					<div className='mt-4 space-y-2'>
						<p className='text-gray-600'>Monday - Friday: 8:00 AM - 6:00 PM</p>
						<p className='text-gray-600'>Saturday: 9:00 AM - 4:00 PM</p>
						<p className='text-gray-600'>Sunday: Closed</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
