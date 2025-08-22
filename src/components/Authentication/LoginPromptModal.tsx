// components/LoginPromptModal.tsx
import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const LoginPromptModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const navigate = useNavigate();

	const handleLogin = () => {
		onClose();
		navigate('/login');
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel='Login Required'
			ariaHideApp={false}
			className='w-[90%] max-w-md mx-auto mt-40 bg-white p-6 rounded shadow'
			overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]'
		>
			<h2 className='text-xl font-semibold mb-2'>Please Login</h2>
			<p className='text-gray-700 mb-4'>You need to login to book a service.</p>
			<div className='flex justify-end space-x-4'>
				<button
					onClick={onClose}
					className='px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400'
				>
					Cancel
				</button>
				<button
					onClick={handleLogin}
					className='px-4 py-2 rounded bg-[#0050A5] text-white hover:bg-[#004494]'
				>
					Login
				</button>
			</div>
		</Modal>
	);
};

export default LoginPromptModal;
