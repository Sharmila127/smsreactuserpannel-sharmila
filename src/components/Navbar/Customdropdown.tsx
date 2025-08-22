import React, { useState, useRef, useEffect } from 'react';

const cities = ['Chennai', 'Coimbatore', 'Madurai'];

const CustomDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectCity = (city: string) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

	return (
		<div ref={dropdownRef} className='relative inline-block w-40 '>
			<button
				onClick={toggleDropdown}
				className='w-full flex justify-between items-center px-4 py-2 text-[#0050A5]-900 font-semibold bg-white rounded shadow cursor-pointer'
			>
				<span>{selectedCity}</span>
				<svg
					className='w-4 h-4 ml-2 text-[#0050A5]'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 9l-7 7-7-7'
					/>
				</svg>
			</button>

			{isOpen && (
				<div className='absolute z-10 mt-1 w-full rounded shadow-lg border-1 border-[#0050A5]-200'>
					{cities.map((city) => (
						<div
							key={city}
							onClick={() => selectCity(city)}
							className='px-4 py-2 text-[#0050A5]-900 font-semibold bg-[#BED0EC] hover:bg-[#0050A5] hover:text-[#BED0EC] cursor-pointer'
						>
							{city}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomDropdown;
