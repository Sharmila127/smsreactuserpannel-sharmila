import { useNavigate, useParams } from 'react-router-dom';
import { useSparePartsDataset } from '../spareparts/data/Product';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useState } from 'react';
import { postSparePartsData } from '../../features/spareparts';
import { toast } from 'react-toastify';

const ProductPage = () => {
	const { productId } = useParams();
	const [quantity, setQuantity] = useState(1);
	const { parts } = useSparePartsDataset();
	const navigate = useNavigate();
	const fallBack = () => {
		navigate(-1);
	};

	const product = parts?.filter((item: any) => item.id === productId);
	const [isAdded, setIsAdded] = useState(false);

	const handleAddToCart = async () => {
		try {
			const payload = {
				products: {
					productId: productId,
					price: product[0]?.price,
					quantity: quantity,
				},
				type: 'spare',
			};
			const response: any = await postSparePartsData(payload);
			if (response) {
				setIsAdded(true);
				setIsAdded(false);
				toast.success('Item added to cart!', { autoClose: 3000 });
			} else {
				toast.error(
					response?.message || 'Booking failed, please update your profile',
					{ autoClose: 2000 }
				);
			}
		} catch (error) {
			console.error('Error adding to cart:', error);
		}
	};

	console.log(product, 'product');

	return (
		<>
			{product?.map((item: any, index: number) => (
				<div className='container mx-auto p-7' key={item.id || index}>
					<IoMdArrowRoundBack
						onClick={fallBack}
						className=' relative right-[10px] text-3xl text-[#0050A5]  cursor-pointer mb-4'
					/>
					<div className='flex xs:flex-col sm:flex-col md:flex-row gap-8'>
						<div className='md:w-3/5 sm:w-4/5 md:h-[380px] sm:h-[300px]'>
							<img
								src={item?.image}
								alt={item?.spareparts_name}
								className='w-full h-full rounded-lg object-cover shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
							/>
						</div>
						<div className='md:w-2/5 bg-[#d8e1ef] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform '>
							<h1 className='text-2xl font-bold mb-4'>
								{item?.spareparts_name}
							</h1>
							<div className='flex justify-between'>
								<p className='text-xl text-[#0050A5] font-semibold mb-4'>
									&#8377;{item?.price}{' '}
									{/* <span className='text-gray-500'>
										<del>&#8377;{item?.price * 1.2}</del>
									</span> */}
								</p>
								<p className='text-md text-gray-800 font-semibold mb-4'>
									Warranty: {item?.warrantyPeriod}
								</p>
							</div>
							<h2 className='text-lg font-semibold mb-2'>Specifications:</h2>
							<ul className=''>
								<li key={index} className='mb-1 text-sm'>
									• {item?.spareparts_name}
								</li>
							</ul>
							{item?.stock >= 1 ? (
								<div className='bg-green-600 inline-block my-3 px-2 py-0.5 rounded-md'>
									<p className='text-white'>Stock: {item?.stock}</p>
								</div>
							) : (
								<div className='bg-red-600 inline-block my-3 px-2 py-0.5 rounded-md'>
									<p className='text-white'>Stock: {item?.stock}</p>
								</div>
							)}
							<div className='flex items-center gap-2 mb-4'>
								<span className='text-sm font-medium'>Quantity:</span>
								<button
									onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
									className='px-2 py-1 bg-[#BED0EC] rounded hover:bg-[#BED0EC] hover:scale-105 transition-transform duration-200'
								>
									-
								</button>
								<span className='px-2'>{quantity}</span>
								<button
									onClick={() =>
										setQuantity((prev) =>
											item?.stock > prev ? prev + 1 : prev
										)
									}
									className={`px-2 py-1 bg-[#BED0EC] rounded hover:bg-[#BED0EC] hover:scale-105 transition-transform duration-200 ${
										item?.stock <= quantity
											? 'opacity-50 cursor-not-allowed'
											: ''
									}`}
								>
									+
								</button>
							</div>

							<div className='text-sm mt-3 mb-2'>
								Total Price:{' '}
								<span className='font-semibold text-[#0050A5]'>
									&#8377;{(Number(item?.price) * quantity).toLocaleString()}
								</span>
							</div>

							<div className='flex justify-center items-center mt-12'>
								{item?.stock >= 1 ? (
									<button
										onClick={handleAddToCart}
										className={`px-3 py-2 bg-[#0050A5] text-white font-semibold py-1 rounded-full transition-all duration-300 transform shadow-lg hover:scale-105 hover:shadow-xl`}
									>
										{isAdded ? 'Added!' : 'Add To Cart'}
									</button>
								) : (
									<button
										onClick={handleAddToCart}
										disabled
										className={`px-3 py-2 bg-red-700 text-white font-semibold py-1 rounded-full`}
									>
										Out of Stock
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default ProductPage;
