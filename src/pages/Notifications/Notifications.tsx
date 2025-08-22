import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import {
	getNotificationsByUser,
	markNotificationsAsRead,
} from '../../features/Notification/services';
import dayjs from 'dayjs';
import { useSocket } from '../../context/customerSocket';

type MailItem = {
	uuid: string;
	sender: string;
	title: string;
	preview: string;
	message: string;
	updated_at: string;
	unread: boolean;
	recipient_type: string;
	created_at: string;
	is_read: boolean;
};

export default function GmailStyleInbox() {
	const navigate = useNavigate();
	const [selectedMail, setSelectedMail] = useState<MailItem | null>(null);
	const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
	const [mails, setMails] = useState<MailItem[]>([]);
	const socket = useSocket();
	// const [isLoading, setIsLoading] = useState(true);

	const filteredMails = mails.filter((mail) => {
		if (mail.recipient_type !== 'customer' && mail.recipient_type !== 'all')
			return false;
		if (filter === 'all') return true;
		if (filter === 'unread') return !mail.is_read;
		if (filter === 'read') return mail.is_read;

		return true; // fallback
	});

	const fetchAllNotifications = async () => {
		try {
			const userId = localStorage.getItem('userId');
			if (!userId) return;
			const response: any = await getNotificationsByUser(userId);
			const data: MailItem[] = response?.data?.data?.notifications || [];
			const sortedData = data.sort(
				(b, a) =>
					new Date(b?.created_at).getTime() - new Date(a?.created_at).getTime()
			);
			setMails(sortedData);
		} catch (error) {
			console.log('Error Fetching Notifications:', error);
		} finally {
		}
	};

	useEffect(() => {
		fetchAllNotifications();
	}, []);

	const handleMarkRead = async (mail: MailItem) => {
		setSelectedMail(mail);
		try {
			const response = await markNotificationsAsRead(mail.uuid);
			console.log('Notification marked as read:', response);
		} catch (err) {
			console.error('Failed to mark notification as read:', err);
		}
	};

	useEffect(() => {
		if (!socket) return;

		const handleNotify = (data: any) => {
			setMails((prev) => [data, ...prev]);
		};

		socket.on('newNotification', handleNotify);

		return () => {
			socket.off('newNotification', handleNotify);
		};
	}, [socket]);

	return (
		<div className=' bg-[#d8e1ef] p-2 font-[Poppins]'>
			<div className='flex h-[80vh] border rounded-2xl overflow-hidden shadow-lg bg-white'>
				{/* Sidebar */}
				<aside className='w-64 border-r bg-[#BED0EC] p-6'>
					<div className='flex items-center mb-6 mt-6'>
						<button
							onClick={() => navigate(-1)}
							className='flex items-center text-[#0050A5] hover:underline mr-4 pl-2'
						>
							<FaArrowLeft className='mr-1' />
						</button>
						<h1 className='text-3xl font-bold text-[#0050A5]'>Notification</h1>
					</div>
					<h2 className='text-lg font-semibold text-[#0050A5] mb-4'>Filters</h2>
					<div className='space-y-3'>
						{['all', 'unread', 'read'].map((f) => (
							<button
								key={f}
								onClick={() => {
									setFilter(f as 'all' | 'unread' | 'read');
									setSelectedMail(null);
								}}
								className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
									filter === f
										? 'bg-[#0050A5] text-white'
										: 'bg-transparent text-gray-700 hover:bg-gray-100'
								}`}
							>
								{f.charAt(0).toUpperCase() + f.slice(1)}
							</button>
						))}
					</div>
				</aside>

				{/* Main list*/}
				<main className='flex-1 flex'>
					<section className='w-1/2 overflow-y-auto border-r custom-scroll px-4 py-4 space-y-4'>
						{filteredMails.map((mail, index) => (
							<div
								key={index}
								onClick={() => {
									handleMarkRead(mail);
								}}
								className={`cursor-pointer flex gap-4 p-4  rounded-xl hover:bg-blue-50 transition duration-150 ${
									!mail.is_read
										? 'bg-gray-100 font-semibold'
										: 'border border-gray-200'
								}`}
							>
								<div className='p-[1px] rounded-full bg-gradient-to-r from-red-600 to-red-800 inline-block'>
									<img
										src='\src/assets/images/istockphoto-1998660059-1024x1024.jpg'
										className=' rounded-full w-10  h-10 object-cover'
									/>
									<div className=''>{mail?.sender?.toUpperCase()}</div>
								</div>
								<div className='flex-1'>
									<div className=''>
										<span className='text-sm text-gray-800 font-semibold '>
											{mail?.title}
										</span>

										<p className='text-sm font-medium text-[#0050A5] mt-2'>
											{mail.message}
										</p>
										<p className='text-xs text-gray-500 mt-2'>
											{dayjs(mail.created_at).format('MMM D h:mm A')}
										</p>
									</div>
								</div>
							</div>
						))}
						{filteredMails.length === 0 && (
							<div className='h-full flex items-center justify-center text-gray-400 text-sm '>
								No mails found for this filter.
							</div>
						)}
					</section>

					{/* Mail preview panel */}
					<section className='flex-1 overflow-y-auto px-8 py-6 custom-scroll'>
						{selectedMail ? (
							<div>
								<button
									onClick={() => setSelectedMail(null)}
									className='text-md text-[#0050A5] hover:underline mb-4 inline-flex items-center'
								>
									← Back to list
								</button>

								<h2 className='text-2xl font-bold text-gray-800 '>
									{selectedMail.title}
								</h2>

								<div className='flex items-center justify-end text-lg text-gray-600 mb-4'>
									
									<div>
										{/* <p className='font-semibold text-gray-800 capitalize'>
											{selectedMail.sender}
										</p> */}
										<div className='flex justify-center'>
											<span className='text-sm text-gray-500  text-right block '>
												{dayjs(selectedMail?.created_at).format(
													'DD-MM-YYYY h:mm A'
												)}
											</span>
										</div>
									</div>
								</div>

								<hr className='my-4 border-t-1 border-gray-400' />

								<div className='whitespace-pre-wrap text-md leading-relaxed text-gray-800'>
									{selectedMail?.message}
								</div>
							</div>
						) : (
							<div className='h-full flex items-center justify-center text-gray-400 text-sm'>
								Select an email to preview
							</div>
						)}
					</section>
				</main>
			</div>
		</div>
	);
}
