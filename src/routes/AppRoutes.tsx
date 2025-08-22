import { Routes, Route, Navigate } from 'react-router-dom';
import Notifications from '../pages/Notifications/Notifications';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import BookingsPage from '../pages/Bookings/BookingsPage';
import BookingCartPage from '../pages/Booking-Cart/BookingCartPage';
import LoginPage from '../pages/auth/LoginPage';
import MainLayout from '../layout/MainLayout';
import AnnouncementPage from '../pages/Announcement/AnnouncementPage';
import HomePage from '../pages/Home/HomePage';
import ServicesPage from '../pages/ServicesPage/ServicesPage';
import SparePartsPage from '../pages/Spare-Parts/Spareparts';
import SOSPage from '../pages/SOS/SOSPage';
import HelpCenter from '../pages/HelpCenter/HelpCenter';
import FaqPage from '../pages/FAQs/FaqPage';
import EnterEmailOrPhone from '../pages/auth/EnterEmailOrPhone';
import OtpVerificationPage from '../pages/auth/OtpVerificationPage';
import SignupPage from '../pages/auth/SignupPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import CategoryPage from '../components/spareparts/CategoryPage';
import ProductPage from '../components/spareparts/ProductPage';

const AppRoutes = () => {
	const AdminRoutes = () => (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='login' element={<LoginPage />} />
				<Route path='signup' element={<SignupPage />} />
				<Route path='enter-email-or-phone' element={<EnterEmailOrPhone />} />
				<Route path='verify-otp' element={<OtpVerificationPage />} />
				<Route index element={<HomePage />} />
				<Route path='notifications' element={<Notifications />} />
				<Route path='settings' element={<SettingsPage />} />
				<Route path='profile' element={<ProfilePage />} />
				<Route path='bookings' element={<BookingsPage />} />
				<Route path='booking-cart' element={<BookingCartPage />} />
				<Route path='services' element={<ServicesPage />} />
				<Route path='spare-parts' element={<SparePartsPage />} />
				<Route path='announcement' element={<AnnouncementPage />} />
				<Route path='sos' element={<SOSPage />} />
				<Route path='help-center' element={<HelpCenter />} />
				<Route path='faqs' element={<FaqPage />} />
				<Route path='contact-us' element={<ContactPage />} />
				<Route path='*' element={<Navigate to='/' />} />
				<Route
					path='spare-parts/category/:categoryId'
					element={<CategoryPage />}
				/>
				<Route
					path='spare-parts/product/:productId'
					element={<ProductPage />}
				/>
			</Route>
		</Routes>
	);

	return <AdminRoutes />;
};

export default AppRoutes;
