import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ServicesPage from './ServicesPage';
import HomePage from '../Home/HomePage';

const ServiceNavigation = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/services' element={<ServicesPage />} />
			</Routes>
		</Router>
	);
};

export default ServiceNavigation;
