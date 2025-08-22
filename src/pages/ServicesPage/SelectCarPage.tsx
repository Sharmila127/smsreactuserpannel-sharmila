import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CarSelect {
	brand: string;
	model: string;
	year: number;
	fuel: string;
}

interface SelectCarPageProps {
	onClose?: () => void;
	setSelectedPackage?: (packageDetails: CarSelect) => void;
	packageId?: string;
}

const SelectCarPage: React.FC<SelectCarPageProps> = ({
	onClose,
	setSelectedPackage,
}) => {
	const [carBrands, setCarBrands] = useState<string[]>([]);
	const [carModels, setCarModels] = useState<string[]>([]);
	const [availableYears, setAvailableYears] = useState<number[]>([]);
	const [allCars, setAllCars] = useState<any[]>([]);
	const [selectedCar, setSelectedCar] = useState<CarSelect>({
		brand: '',
		model: '',
		year: 0,
		fuel: '',
	});

	const fetchCars = async () => {
		try {
			const res = await fetch('https://myfakeapi.com/api/cars/');
			const data = await res.json();
			const cars = data.cars;
			setAllCars(cars);
			const brands = [...new Set(cars.map((car: any) => car.car))];
			setCarBrands(brands as string[]);
		} catch (error) {
			console.error('Error fetching car data:', error);
		}
	};

	useEffect(() => {
		fetchCars();
	}, []);

	const handleBrandChange = (brand: string) => {
		const models = allCars
			.filter((car) => car.car === brand)
			.map((car) => car.car_model);
		const uniqueModels = [...new Set(models)];

		setCarModels(uniqueModels);
		setSelectedCar({ brand, model: '', year: 0, fuel: '' });
		setAvailableYears([]);
	};

	const handleModelChange = (model: string) => {
		const filteredCars = allCars.filter(
			(car) => car.car === selectedCar.brand && car.car_model === model
		);

		const years = [...new Set(filteredCars.map((car) => Number(car.car_model_year)))];

		setAvailableYears(years);

		setSelectedCar((prev) => ({
			...prev,
			model,
			year: 0,
			fuel: '',
		}));
	};

	const handleYearChange = (year: number) => {
		setSelectedCar((prev) => ({
			...prev,
			year,
			fuel: '',
		}));
	};

	const handleFuelChange = (fuel: string) => {
		setSelectedCar((prev) => ({
			...prev,
			fuel,
		}));
	};

	const handleSubmit = () => {
		if (
			selectedCar.brand &&
			selectedCar.model &&
			selectedCar.year &&
			selectedCar.fuel
		) {
			if (setSelectedPackage) {
				setSelectedPackage(selectedCar);
			}
			if (onClose) onClose();
		} else {
			alert('Please fill in all fields');
		}
	};

return (
	<div className='relative bg-white rounded-xl shadow-2xl w-full max-w-sm scrollbar-hide max-h-[90vh] overflow-y-auto p-6'>
		<div className='flex justify-end'>
			<button
				onClick={onClose}
				className='text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200'
			>
				X
			</button>
		</div>
		<h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>Select Your Car</h2>

		<div className='space-y-5'>
			{/* Brand */}
			<div className='relative'>
				<label htmlFor='brand' className='block text-sm font-semibold text-gray-700 mb-1'>Brand *</label>
				<select
					id='brand'
					value={selectedCar.brand}
					onChange={(e) => handleBrandChange(e.target.value)}
					className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0050A5] appearance-none bg-white'
				>
					<option value=''>Select Brand</option>
					{carBrands.map((brand) => (
						<option key={brand} value={brand}>{brand}</option>
					))}
				</select>
				<ChevronDown className='absolute right-4 top-11 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
			</div>

			{/* Model */}
			{selectedCar.brand && (
				<div className='relative'>
					<label htmlFor='model' className='block text-sm font-semibold text-gray-700 mb-1'>Model *</label>
					<select
						id='model'
						value={selectedCar.model}
						onChange={(e) => handleModelChange(e.target.value)}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0050A5] appearance-none bg-white'
					>
						<option value=''>Select Model</option>
						{carModels.map((model) => (
							<option key={model} value={model}>{model}</option>
						))}
					</select>
					<ChevronDown className='absolute right-4 top-11 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
				</div>
			)}

			{/* Year */}
			<div className='relative'>
				<label htmlFor='year' className='block text-sm font-semibold text-gray-700 mb-1'>Year *</label>
				<select
					id='year'
					value={selectedCar.year}
					onChange={(e) => handleYearChange(Number(e.target.value))}
					disabled={!selectedCar.model}
					className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0050A5] appearance-none ${!selectedCar.model ? 'bg-gray-100 cursor-not-allowed border-gray-200' : 'bg-white border-gray-300'
						}`}
				>
					<option value={0}>Select Year</option>
					{availableYears.map((year) => (
						<option key={year} value={year}>{year}</option>
					))}
				</select>
				<ChevronDown className='absolute right-4 top-11 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
			</div>

			{/* Fuel */}
			<div className='relative'>
				<label htmlFor='fuel' className='block text-sm font-semibold text-gray-700 mb-1'>Fuel Type *</label>
				<select
					id='fuel'
					value={selectedCar.fuel}
					onChange={(e) => handleFuelChange(e.target.value)}
					disabled={!selectedCar.year}
					className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0050A5] appearance-none ${!selectedCar.year ? 'bg-gray-100 cursor-not-allowed border-gray-200' : 'bg-white border-gray-300'
						}`}
				>
					<option value=''>Select Fuel Type</option>
					
					<option >Petrol</option>
					<option >Deisel</option>
					<option >Hybrid</option>
					<option >EV</option>
				
				</select>
				<ChevronDown className='absolute right-4 top-11 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
			</div>

			{/* Preview */}
			{selectedCar.brand && (
				<div className='bg-gray-50 p-4 rounded-md border border-gray-200'>
					<h3 className='text-sm font-semibold text-gray-700 mb-2'>Selected Car:</h3>
					<p className='text-base font-semibold text-gray-900'>
						{selectedCar.year > 0 ? selectedCar.year : '----'} {selectedCar.brand} {selectedCar.model || '----'} {selectedCar.fuel && `(${selectedCar.fuel})`}
					</p>
				</div>
			)}

			{/* Submit Button */}
			<div className='flex justify-center pt-2'>
				<button
					onClick={handleSubmit}
					className='bg-[#0050A5] hover:bg-white hover:text-[#0050A5] text-white border-2 border-[#0050A5] px-6 py-2 rounded-md font-medium transition-all duration-200'
				>
					Confirm
				</button>
			</div>
		</div>
	</div>
);
};

export default SelectCarPage;
