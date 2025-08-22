import { Link, useParams } from 'react-router-dom';
import { useSparePartsDataset } from '../spareparts/data/Product';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {
	const { parts } = useSparePartsDataset();
	const { categoryId } = useParams();
	const category = parts?.filter(
		(cat) => cat?.category?.toLowerCase() === categoryId?.toLowerCase()
	);
	if (!category) return <div>Category not found</div>;

	const navigate = useNavigate();

	const fallBack = () => {
		navigate(-1);
	};

	console.log(parts, 'category');

	return (
		<div className='bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 mt-5 mx-24'>
			<div className='container mx-auto'>
				<div className='flex gap-3'>
					<IoMdArrowRoundBack
						onClick={fallBack}
						className='w-8 h-8 text-[#0050A5] cursor-pointer hover:text-blue-500 transition-colors relative top-[7px]'
					/>

					<div className='mb-5'>
						<h1 className='text-3xl font-bold text-[#0050A5] mb-2'>
							{category[0]?.category}
						</h1>
						<p className='text-gray-600'>Discover our premium collection</p>
					</div>
				</div>

				<div className='grid lg:grid-cols-4 sm:grid-cols-2 '>
					{category?.map((product: any) => (
						<div
							key={product?.id}
							className='relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-[330px] w-[230px] sm:w-full group'
						>
							{/* Full Background Image Only */}
							<div
								className='absolute inset-0 bg-cover bg-center z-0'
								style={{
									backgroundImage: `url(${product?.image})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center center',
									backgroundRepeat: 'no-repeat',
								}}
							/>

							{/* Content Section */}
							<div className='absolute bottom-0 left-0 right-0 z-10 p-3 bg-white/90 backdrop-blur-sm'>
								<div className='flex items-center justify-between mb-6'>
									<div>
										<h2 className='text-xl font-bold text-[#0050A5] mb-1 group-hover:text-[#0050A5] transition-colors'>
											{product?.spareparts_name}
										</h2>
										{product?.stock > 0 ? (
											<div className='bg-green-500 inline-block px-2 py-0.5 rounded-md'>
												<p className='text-sm text-white'>
													Stock: {product?.stock}
												</p>
											</div>
										) : (
											<div className='bg-red-500 inline-block px-2 py-0.5 rounded-md'>
												<p className='text-sm text-white'>
													Out of Stock
												</p>
											</div>
										)}
									</div>
								</div>
								<Link
									to={`/spare-parts/product/${product?.id}`}
									className=' flex justify-center items-center'
								>
									<button className='px-3 py-2 bg-[#0050A5] hover:from-[#0050A5] hover:to-[#0050A5] text-white font-semibold py-1 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm hover:shadow-xl'>
										View Details
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{category?.length === 0 && (
					<div className='text-center py-16'>
						<div className='bg-white rounded-3xl p-12 shadow-lg max-w-md mx-auto'>
							<div className='w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center'>
								<svg
									className='w-12 h-12 text-gray-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
									/>
								</svg>
							</div>
							<h3 className='text-xl font-bold text-gray-800 mb-2'>
								No Products Found
							</h3>
							<p className='text-gray-600'>
								This category is currently empty. Check back soon!
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CategoryPage;
