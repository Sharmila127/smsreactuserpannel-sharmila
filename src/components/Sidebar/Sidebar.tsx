import { useState, type JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	FiHome,
	FiBell,
	FiUsers,
	FiClipboard,
	FiMapPin,
	FiTruck,
	FiSettings,
	FiAlertTriangle,
} from 'react-icons/fi';
import { Megaphone } from 'lucide-react';

const COLOR = {
	primary: '#9b111e',
	bgColor: '#faf3eb',
	secondary: '#E6A895',
};

export const Sidebar = ({
	isOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

	const handleLinkClick = () => {
		// setIsOpen(false);
	};

	return (
		<div className='w-full h-full flex flex-col'>
			<div className='items-center justify-between bg-white shadow-md h-full transition-all duration-300'>

				<nav className='flex flex-row'>
					<SidebarLink
						to='/'
						icon={<FiHome />}
						label='Home'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/notifications'
						icon={<FiBell />}
						label='Notifications'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/profile'
						icon={<FiUsers />}
						label='Profile'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/bookings'
						icon={<FiClipboard />}
						label='Bookings'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/spare-parts'
						icon={<FiClipboard />}
						label='Spare-Parts'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/booking-cart'
						icon={<FiMapPin />}
						label='Booking Cart'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/service-center'
						icon={<FiTruck />}
						label='Service Center'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/announcement'
						icon={<Megaphone />}
						label='Announcement'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/settings'
						icon={<FiSettings />}
						label='Settings'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/sos'
						icon={<FiAlertTriangle />}
						label='SOS'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/help-center'
						icon={<FiAlertTriangle />}
						label='Help Center'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
					<SidebarLink
						to='/faqs'
						icon={<FiAlertTriangle />}
						label='FAQs'
						isOpen={isOpen}
						onClick={handleLinkClick}
					/>
				</nav>
			</div>
			<div
				className={`transition-all duration-300 ${isOpen ? 'ml-48' : 'ml-16'
					} flex-1`}
			></div>
		</div>
	);
};

const SidebarLink = ({
	to,
	label,
	onClick,
}: {
	to: string;
	icon: JSX.Element;
	label: string;
	isOpen: boolean;
	onClick: () => void;
}) => {
	const location = useLocation();
	const [isHovered, setIsHovered] = useState(false);
	const isActive = location.pathname === to;

	const backgroundColor = isActive
		? COLOR.primary
		: isHovered
			? COLOR.bgColor
			: 'transparent';

	const textColor = isActive ? COLOR.bgColor : COLOR.primary;

	return (
		<Link
			to={to}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ backgroundColor }}
			className={`rounded-sm px-7 py-3 w-1/4`}
		>
			<span style={{ color: textColor }}>{label}</span>
		</Link>
	);
};
