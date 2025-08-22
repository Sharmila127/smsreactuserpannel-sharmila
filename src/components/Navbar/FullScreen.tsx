import React, { useState, useEffect } from 'react';

const FullscreenButton: React.FC = () => {
	const [isFullscreen, setIsFullscreen] = useState(false);

	const handleFullscreen = () => {
		const el = document.documentElement;
		if (!document.fullscreenElement) {
			el.requestFullscreen()
				.then(() => setIsFullscreen(true))
				.catch((err) => console.error('Error attempting fullscreen:', err));
		} else {
			document.exitFullscreen().then(() => setIsFullscreen(false));
		}
	};

	// Keep in sync with actual fullscreen state (in case user presses Esc)
	useEffect(() => {
		const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
		document.addEventListener('fullscreenchange', handleChange);
		return () => document.removeEventListener('fullscreenchange', handleChange);
	}, []);

	return (
		<ul className='flex'>
			<li className='relative'>
				<button
					onClick={handleFullscreen}
					className='bg-transparent transition-all duration-200 text-[#0050A5] ease-in-out p-1 border-0 inline-block relative leading-none rounded'
					aria-label='Toggle fullscreen'
				>
					<i className='material-symbols-outlined text-[24px] hover:text-[28px] transition-all duration-200 ease-in-out'>
						{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
					</i>
				</button>
			</li>
		</ul>
	);
};

export default FullscreenButton;
