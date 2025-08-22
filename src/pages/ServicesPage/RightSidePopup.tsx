import React, { useState, useEffect } from 'react';
import { X, Sparkles, Car, Wrench } from 'lucide-react';

interface AutoPopupProps {
	onClose: () => void;
	message?: string;
	title?: string;
}

const AutoPopup: React.FC<AutoPopupProps> = ({
	onClose,
	message = "Welcome to our services! Browse and select car maintenance packages tailored to your vehicle's needs.",
	title = 'Service Information',
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
    const [showMessage,setShowMessage]=useState(false);

	

	useEffect(() => {
		// Trigger entrance animation
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);                               
	}, []);


const handleBookClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); 
  };

  

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => onClose(), 300);
	};

	return (
		<>
		{/* not selected car pop up msg */}

			<div className='fixed top-36 right-3 pointer-events-auto'>
							 {showMessage && (
                           <div className="mt-4 px-4 py-2 bg-[#0050A5] text-white rounded-lg shadow-md text-sm">
                            Select the car first then booking services!
                           </div> 
						)}

				{/* Popup Container */}

				<div
					className={`w-[320px] h-[420px] transition-all duration-500 ease-out transform ${
						isVisible && !isClosing
							? 'translate-x-0 translate-y-0 opacity-100 scale-100'
							: 'translate-x-full translate-y-4 opacity-0 scale-95'
					}`}
				>

					{/* Main Popup Card */}
					<div className='relative bg-gradient-to-br from-red-50 via-white to-red-100 rounded-2xl shadow-2xl border border-white/50 overflow-hidden h-full'>
						{/* Animated Background Elements */}
						<div className='absolute inset-0 overflow-hidden'>
							<div className='absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-full animate-pulse' />
							<div
								className='absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-red-400/20 to-red-600/20 rounded-full animate-bounce'
								style={{ animationDuration: '3s' }}
							/>
						</div>



						{/* Floating Icons */}
						<div className='absolute top-4 left-4'>
							<div
								className='animate-bounce'
								style={{ animationDelay: '0.5s' }}
							>
								<Car className='w-6 h-6 text-[#0050A5]' />
							</div>
						</div>
						<div className='absolute top-8 right-16'>
							<div className='animate-pulse' style={{ animationDelay: '1s' }}>
								<Wrench className='w-4 h-4' style={{ color: '#0050A5' }} />
							</div>
						</div>


						{/* Content */}
						<div className='relative z-10 p-6 h-full flex flex-col'>
							<div className='flex justify-between items-start mb-6'>
								<div className='flex items-center space-x-2'>
									<div
										className='animate-spin'
										style={{ animationDuration: '3s' }}
									>
										<Sparkles className='w-6 h-6 text-yellow-500' />
									</div>
									<h3 className='font-bold text-xl text-gray-800 bg-[#0050A5] bg-clip-text text-transparent'>
										{title}
									</h3>
								</div>
								<button
									onClick={handleClose}
									className='group relative p-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#BED0EC]-200/50 hover:bg-[#0050A5] hover:border-[#0050A5] transition-all duration-300 transform hover:scale-110 active:scale-95'
									aria-label='Close popup'
								>
									<X className='w-4 h-4 text-[#0050A5] group-hover:text-[white] transition-colors' />
									<div className='absolute inset-0 rounded-full bg-[#0050A5]-500/20 scale-0 group-hover:scale-100 transition-transform duration-300' />
								</button>
							</div>

							<div className='flex-1 flex flex-col space-y-3'>
								<p className='text-gray-700 leading-relaxed text-sm'>
									{message}
								</p>

								{/* Additional content for height */}
								<div className='bg-gradient-to-r from-red-600/10 to-red-800/10 rounded-xl p-4 border border-red-200/50'>
									<h4 className='font-semibold text-[#0050A5] mb-2'>
										Premium Services Include:
									</h4>
									<ul className='text-sm text-gray-600 space-y-1'>
										<li>• Complete vehicle inspection</li>
										<li>• Engine diagnostics & tuning</li>
										<li>• Brake system maintenance</li>
										<li>• Oil change & fluid checks</li>
									</ul>
								</div>


								{/* Call-to-action with hover effects */}
								<div className='flex space-x-3 mt-auto'>
									<button
									onClick={handleBookClick} 
										className='group flex-1 bg-[#0050A5] text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:from-red-700 hover:to-red-900'
										style={{
											backgroundImage:'##0050A5',
										}}
									>
										<span className='flex items-center justify-center space-x-2'>
											<span>Book Service</span>
											<div className='transform group-hover:translate-x-1 transition-transform'>
												→
											</div>
										</span>
									</button>
									<button className='px-4 py-3 rounded-xl border-2 border-[#0050A5] text-[#0050A5] font-semibold hover:border-[#BED0EC]-300 hover:text-[white] hover:bg-[#0050A5] transition-all duration-300 transform hover:-translate-y-0.5'>
										Later
									</button>
						
								</div>
								{/* <BookServiceButton/> */}
							</div>

							{/* Progress indicator */}
							<div className='mt-6 w-full bg-gray-200 rounded-full h-1 overflow-hidden'>
								<div
									className='h-full bg-[#0050A5] rounded-full animate-pulse'
									style={{
										width: '100%',
										animation: 'slideProgress 4s ease-in-out infinite',
										backgroundImage: `linear-gradient(to right, #dc2626, #9b111e)`,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<style>{`
        @keyframes slideProgress {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
        }
      `}</style>
		</>
	);
};

export default AutoPopup;
