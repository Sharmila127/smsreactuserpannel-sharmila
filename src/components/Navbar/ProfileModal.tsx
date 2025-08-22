import React, { useRef, useEffect } from 'react';

interface User {
	name: string;
	phone: string;
	email: string;
	avatar: string;
	role: string;
	location: string;
	joinDate: string;
	status: string;
}

interface ProfileModalProps {
	user: User;
	isOpen: boolean;
	onClose: () => void;
	onUserUpdate: (updatedUser: User) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
	user,
	isOpen,
	onClose,
}) => {
	const modalRef = useRef<HTMLDivElement | null>(null);

	// Handle outside clicks for modal
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				onClose();
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4'>
			<div
				ref={modalRef}
				className='bg-[#BED0EC] rounded-2xl shadow-2xl w-full max-w-2xl md:max-w-xl sm:max-w-md overflow-hidden'
			>
				<div className='bg-gradient-to-r from-red-600 to-red-800 p-6 flex items-center justify-between text-white'>
					<div className='flex items-center space-x-4'>
						<img
							src={user.avatar}
							alt='User'
							className='w-20 h-20 rounded-full border-4 border-white shadow-md'
						/>
						<div>
							<h2 className='text-2xl font-bold'>{user.name}</h2>
							<p className='text-sm opacity-90'>Admin, Production Department</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className='bg-[#BED0EC] text-[#0050A5]-600 font-semibold p-2 rounded-lg shadow hover:bg-[#BED0EC] transition'
						aria-label='Close profile details'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-gray-700'>
					<div className='space-y-3'>
						<div>
							<h4 className='text-sm text-gray-500'>Phone</h4>
							<p className='text-lg'>{user.phone}</p>
						</div>
						<div>
							<h4 className='text-sm text-gray-500'>Email</h4>
							<p className='text-lg'>{user.email}</p>
						</div>
						<div>
							<h4 className='text-sm text-gray-500'>Location</h4>
							<p className='text-lg'>{user.location}</p>
						</div>
					</div>
					<div className='space-y-3'>
						<div>
							<h4 className='text-sm text-gray-500'>Role</h4>
							<p className='text-lg'>{user.role}</p>
						</div>
						<div>
							<h4 className='text-sm text-gray-500'>Join Date</h4>
							<p className='text-lg'>{user.joinDate}</p>
						</div>
						<div>
							<h4 className='text-sm text-gray-500'>Status</h4>
							<span className='inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700'>
								{user.status}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
