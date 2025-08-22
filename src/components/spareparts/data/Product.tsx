import { getSparePartsData } from '../../../features/spareparts';
import { useState, useEffect } from 'react';

interface SparePart {
	id: string;
	spareparts_name: string;
	price: number;
	stock: string;
	images: string[];
	type: string;
	image: string;
	category?: string;
	description: 'High-quality wheel bearings and hubs for smooth and safe driving.';
}

export const useSparePartsDataset = () => {
	const [parts, setParts] = useState<SparePart[]>([]);
	const [error, setError] = useState<string | null>(null);

	const fetchSpareParts = async () => {
		try {
			setError(null);
			const response: any = await getSparePartsData({});
			if (response?.data?.data) {
				if (Array.isArray(response.data.data)) {
					const validatedParts = response.data.data.map((part: any) => ({
						id: part._id || '',
						spareparts_name: part.productName || '',
						price: Number(part.price) || 0,
						stock: part.stock || '',
						images: Array.isArray(part.images)
							? part.images
							: [part.image || ''],
						type: part.type || '',
						image:
							part.image || (Array.isArray(part.images) ? part.images[0] : ''),
						category: part.category || 'Uncategorized',
						warrantyPeriod: part.warrantyPeriod
					}));

					setParts(validatedParts);
				} else {
					throw new Error('API response data is not an array');
				}
			} else {
				throw new Error('Invalid API response structure');
			}
		} catch (error) {
			console.error('Error fetching spare parts:', error);
			setError(
				error instanceof Error ? error.message : 'Failed to fetch spare parts'
			);
			setParts([]);
		}
	};

	useEffect(() => {
		fetchSpareParts();
	}, []);

	return { parts, error };
};
