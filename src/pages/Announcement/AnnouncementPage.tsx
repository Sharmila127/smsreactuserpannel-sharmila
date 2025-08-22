import { useEffect, useState } from 'react';
import Offer from '../../components/Announcement/Offer';
import { getOfferData } from '../../features/Offers';

const Announcement = () => {
	const [announcements, setAnnouncements] = useState([]);

	const fetchAllOffers = async () => {
		try {
			const response = (await getOfferData()) as any;
			if (response) {
				setAnnouncements(response.data.data);
			}
		} catch (error) {
			console.error('Error fetching service data:', error);
		}
	};

	useEffect(() => {
		fetchAllOffers();
	}, []);

	return (
		<div style={{ textAlign: 'center', padding: '30px' }}>
			<Offer announcements={announcements} />
		</div>
	);
};

export default Announcement;
