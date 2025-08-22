/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/auth/AuthContext';
import { COLORS, FONTS } from '../../constants/constant';
import Logo from '../../assets/User (5).png';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProfileMenu from '../home/ProfileMenu';
import CustomDropdown from './Customdropdown';
import TruckIcon from '../../assets/carimages/delivery-truck.png';
import { getNotificationsByUser, markNotificationsAsRead } from '../../features/Notification/services';
import { booking_cart } from '../../features/BookingCart/service';
import { IoCartOutline } from 'react-icons/io5';
import { useSocket } from '../../context/customerSocket';

type MailItem = {
  id: number;
  _id: string;
  message: string;
  created_at: string;
  is_read: boolean;
  priority: string;
  action_type: string;
  title: string;
  is_active: boolean;
  uuid: string;
  recipient_type: string;
  type: string;
};

export const Navbar: React.FC = () => {
  const [isBellActive, setIsBellActive] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { isAuthenticated } = useAuth();
  const isLoggedIn = isAuthenticated;
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState('');
  const [mails, setMails] = useState<MailItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const socket = useSocket();

  const filteredMails = mails
    .filter((m) => {
      if (m.recipient_type !== 'customer' && m.recipient_type !== 'all') return false;
      return m
    })


	const unReadMails = mails.filter(
		(mail) => mail.recipient_type === 'customer' && !mail.is_read
	);

  const fetchAllNotifications = async () => {
    try {
      const userId: any = localStorage.getItem('userId')
      const response: any = await getNotificationsByUser(userId);
      const data: MailItem[] = response?.data?.data?.notifications || [];
      const sortedData = data.sort(
        (a, b) =>
          new Date(b?.created_at).getTime() -
          new Date(a?.created_at).getTime()
      );
      setMails(sortedData);
      console.log('Fetched Notifications:', sortedData);
    } catch (error) {
      console.log('Error Fetching Notifications:', error);
    }
  };

	const fetchBookingCartCount = async () => {
		try {
			const response: any = await booking_cart({});
			if (response?.data?.data) {
				const data = response.data.data;
				const count =
					(data[0]?.services?.length || 0) +
					(data[1]?.services?.length || 0) +
					(data[0]?.products?.length || 0) +
					(data[1]?.products?.length || 0);
				setCartCount(count);
			}
		} catch (error) {
			console.log('Cart count error:', error);
		}
	};

  useEffect(() => {
    (window as any).refreshCartCount = fetchBookingCartCount;
    return () => {
      delete (window as any).refreshCartCount;
    };
  }, []);

	useEffect(() => {
		fetchAllNotifications();
		fetchBookingCartCount();
	}, []);

	// Handle outside clicks for dropdown & notifications
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				// setIsDropdownOpen(false);
			}
			if (
				notificationRef.current &&
				!notificationRef.current.contains(e.target as Node)
			) {
				setShowNotifications(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleBellClick = () => {
		setIsBellActive(true);
		setShowNotifications((prev) => !prev);
		setTimeout(() => setIsBellActive(false), 150);
	};

	const handleViewAllNotifications = () => {
		setShowNotifications(false);
		navigate('/notifications');
	};

	const unreadCount = unReadMails.length;

	const handleLogout = () => {
		setShowLogoutConfirm(true);
	};

	const navData = [
		{ title: 'Home', link: '/' },
		{ title: 'Services', link: '/services' },
		{ title: 'Spare Parts', link: '/spare-parts' },
		{ title: 'Booking Cart', link: '/booking-cart' },
		{ title: 'Bookings', link: '/bookings' },
		{ title: 'Offers', link: '/announcement' },
	];

	// const formatDate = (isoString: string) => {
	//   const date = new Date(isoString);
	//   const day = String(date.getDate()).padStart(2, "0");
	//   const month = String(date.getMonth() + 1).padStart(2, "0");
	//   const year = String(date.getFullYear()).slice(-2);
	//   let hours = date.getHours();
	//   const minutes = String(date.getMinutes()).padStart(2, "0");
	//   const ampm = hours >= 12 ? "pm" : "am";
	//   hours = hours % 12;
	//   hours = hours ? hours : 12;
	//   const formattedHours = String(hours).padStart(2, "0");
	//   const formatted = `${day}-${month}-${year} ${formattedHours}:${minutes}${ampm}`;
	//   return formatted;
	// };

  useEffect(() => {
    if (!socket) return;

    const handleNotify = (data: MailItem) => {
      console.log("Notification Recieved", data);
      setMails((prev) => [data, ...prev])
    }

    socket.on('newNotification', handleNotify)

    return () => {
      socket.off('newNotification', handleNotify)
    }
  }, [socket])

	const getDateLabel = (isoDateStr: string): string => {
		const inputDate = new Date(isoDateStr);
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		const isSameDay = (d1: Date, d2: Date): boolean =>
			d1.getDate() === d2.getDate() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getFullYear() === d2.getFullYear();

		const time = inputDate.toLocaleTimeString('en-IN', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});

		if (isSameDay(inputDate, today)) return `Today at ${time}`;
		if (isSameDay(inputDate, yesterday)) return `Yesterday at ${time}`;

		const date = inputDate.toLocaleDateString('en-IN', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		});

		return `${date} at ${time}`;
	};

  const notifyHandle = async (n: MailItem) => {
    try {
      if (!n.is_read) {
        await markNotificationsAsRead((n.uuid))
        if (n.type === 'jobCard') {
          await navigate('/bookings')
        } else {
          await navigate('/announcement')
        }
        setMails((prev) => prev.map((m) => m._id === n._id ? { ...m, is_read: true } : m))
      } else if (n.type === 'jobCard') {
        await navigate('/bookings')
      } else {
        await navigate('/announcement')
      }
      setShowNotifications(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <header className='bg-white text-white w-full fixed top-0 z-50 border-b-2 border-white-900 '>
      {/* Top Navbar */}
      <div className='bg-[#0050A5] h-[2px]'></div>
      <div className='flex items-center justify-between md:px-24 sm:px-12 py-2 space-x-4'>
        {/* Logo & Location */}
        <div className='flex items-center space-x-4'>
          <Link to='/' className='text-2xl font-bold text-white'>
            <img src={Logo} alt='yes mechanic logo' className='w-40 h-[auto]' />
          </Link>
        </div>

        <div className='text-white flex items-center gap-1'>
          <img src={TruckIcon} className='w-7' />
          <label className='text-[#0050A5] cursor-pointer text-sm font-semibold'>
            QUICK DELIVERY
          </label>
        </div>

        <div className='text-[#0050A5] flex items-center border border-[#0050A5] rounded-md'>
          <CustomDropdown />
        </div>
        {/* Search Bar */}
        <div className='flex flex-1 justify-end'>
          <input
            type='text'
            className='px-4 py-2 text-[#0050A5] placeholder-gray-600 text-sm bg-[#fff] rounded-l-md focus:outline-none focus:ring-[#0050A5] w-72 shadow-md border border-[#0050A5] focus:border-[#0050A5]'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

					<button className='bg-[#0050A5] px-3 py-2 rounded-r-md'>
						<FiSearch
							className='text-black text-xl'
							color={COLORS.white}
							size={18}
						/>
					</button>
				</div>

        {/* Right Side Options */}
        <div className="flex items-center text-sm gap-3">
          <div className="relative" ref={notificationRef}>
            <button
              aria-label="Notifications"
              onClick={handleBellClick}
              className={`relative p-2.5 rounded-full focus:outline-none transform transition-transform duration-200 ease-in-out ${isBellActive ? "scale-90" : "scale-100"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-6 h-6 text-[#0050A5]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6V11c0-3.3-2.2-6.1-5.3-6.8V4a.7.7 0 00-1.4 0v.2C8.2 4.9 6 7.7 6 11v5l-1.7 1.7a1 1 0 00.7 1.7h14a1 1 0 00.7-1.7L18 16z"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1.5 bg-[#0050A5] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-xl bg-[#BED0EC] z-50 overflow-hidden">
                <div className="bg-[]-900 p-3">
                  <h3 className="text-red-600 font-bold">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {filteredMails.length > 0 ? (
                    filteredMails.map((notification: any) => (
                      <div
                        onClick={async () => await notifyHandle(notification)}
                        key={notification._id}
                        className={`group relative p-3 border-b hover:bg-[#0050A5] cursor-pointer text-[#0050A5] hover:text-white transition-colors duration-150 bg-[#BED0EC]-50
												}`}
											>
												{/* This vertical red line will now appear on hover */}

												<div className='absolute left-0 top-0 h-full w-1 bg-[#BED0EC]-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>

												<div className='flex justify-between items-start'>
													<p className='text-sm  font-semibold'>
														{notification.title}
													</p>
												</div>
												<p className='text-xs text-[#ff7b00] mt-1 text-right'>
													{getDateLabel(notification?.created_at)}
												</p>
											</div>
										))
									) : (
										<p className='p-3 text-[#0050A5] text-center text-sm'>
											No notifications
										</p>
									)}
								</div>
								<div className='p-3 bg-[#0050A5] text-center border-t'>
									<button
										onClick={handleViewAllNotifications}
										className='text-white hover:text-white font-medium text-sm transition-colors'
									>
										View All Notifications
									</button>
								</div>
							</div>
						)}
					</div>

					{/* Logout Confirmation Modal */}
					{showLogoutConfirm && (
						<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]'>
							<div className='bg-white rounded-xl shadow-lg w-80 p-6 space-y-4 text-center'>
								<h2 className='text-lg font-semibold text-[#0050A5]'>
									Are you sure you want to logout?
								</h2>
								<div className='flex justify-center gap-4 mt-4'>
									<button
										onClick={() => setShowLogoutConfirm(false)}
										className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800'
									>
										Cancel
									</button>
									<button
										onClick={() => {
											setShowLogoutConfirm(false);
											setShowLogoutSuccess(true);
											setTimeout(() => {
												setShowLogoutSuccess(false);
												logout();
												navigate('/');
											}, 1000);
										}}
										className='px-4 py-2 rounded bg-[#0050A5] text-white'
									>
										OK
									</button>
								</div>
							</div>
						</div>
					)}
					{/* Logout Success Modal */}
					{showLogoutSuccess && (
						<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]'>
							<div className='bg-white rounded-xl shadow-xl w-80 p-6 flex flex-col items-center space-y-4 text-center animate-fade-in'>
								{/* Animated Checkmark with Tailwind */}
								<svg
									className='w-16 h-16 text-green-600 animate-draw-check'
									viewBox='0 0 52 52'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<circle
										cx='26'
										cy='26'
										r='25'
										stroke='currentColor'
										strokeWidth='2'
										className='stroke-current'
									/>
									<path
										d='M14 27L22 35L38 19'
										stroke='currentColor'
										strokeWidth='4'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='animate-draw-path'
									/>
								</svg>
								<p className='text-green-700 text-lg font-semibold'>
									Logout Successfully!
								</p>
							</div>
							<style>
								{`
            @keyframes fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }

            .animate-fade-in {
                animation: fade-in 0.3s ease-out forwards;
            }

            @keyframes draw-path {
                from { stroke-dasharray: 48; stroke-dashoffset: 48; }
                to { stroke-dashoffset: 0; }
            }

            .animate-draw-path {
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: draw-path 0.5s ease-out forwards;
            }

            @keyframes draw-check {
                from { stroke-dasharray: 166; stroke-dashoffset: 166; }
                to { stroke-dashoffset: 0; }
            }

            .animate-draw-check circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                animation: draw-check 0.6s ease-out forwards;
            }
            `}
							</style>
						</div>
					)}
					<div
						className='relative flex items-center -left-2'
						onClick={() => {
							navigate('/booking-cart');
						}}
					>
						<IoCartOutline className='text-3xl cursor-pointer text-[#0050A5]' />
						<span className='absolute -top-[3px] left-5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center cursor-pointer'>
							{cartCount}
						</span>
					</div>
					{/* Profile Dropdown */}
					{isLoggedIn ? (
						<>
							<ProfileMenu handleLogout={handleLogout} />
						</>
					) : (
						<>
							<div className='flex gap-2'>
								<button
									className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105'
									onClick={() => navigate('/login')}
								>
									Login
								</button>
							</div>
						</>
					)}
				</div>
			</div>

			{/* Bottom Navbar - Categories */}

			<div className='bg-[#0854a4] px-24 py-4 flex items-center justify-center gap-14 shadow-lg'>
				{navData?.map((item, idx) => (
					<NavLink
						key={idx}
						to={item.link}
						style={{
							...FONTS.paragraph,
							fontWeight: 500,
							fontSize: '16px',
							fontFamily: 'Montserrat',
						}}
						className={({ isActive }) =>
							`relative pb-1 text-md font-semibold transition-all duration-300 ease-in-out whitespace-nowrap
	${
		isActive
			? 'text-white-900 after:content-[""] after:absolute after:left-0 after:bottom-11 after:h-[2.9px] after:w-full after:bg-white after:transition-all after:duration-300'
			: 'text-white-800 after:content-[""] after:absolute after:left-0 after:bottom-11 after:h-[2.9px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full'
	}`
						}
					>
						{item.title}
					</NavLink>
				))}

        <div className='flex justify-end'>
          <button
            className='text-[#0854a4] py-1 px-8 rounded-full'
            style={{
              ...FONTS.paragraph,
              fontWeight: 600,
              backgroundColor: '#fff',
              fontFamily: 'Montserrat',
            }}
            onClick={() => navigate('/contact-us')}
          >
            Enquiry
          </button>
        </div>
      </div>
      <div className='shadow-lg'></div>
    </header>
  );
};
