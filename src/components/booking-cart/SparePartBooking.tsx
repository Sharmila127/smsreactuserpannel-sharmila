import React, { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import bgImage from "../../assets/checkout-bg_1_.png";


interface SparePart {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  inStock: boolean;
  price: number;
  discount: number;
  originalPrice: number;
  compatibility: string;
}

interface Props {
  parts: SparePart;
  onDelete: (id: string) => void;
  onConfirm: (id: string, quantity: number) => void;
}

const SparePartCard: React.FC<Props> = ({ parts, onDelete, onConfirm }) => {
  const [count, setCount] = useState<number>(1);
  const totalPrice = parts.price * count;

  const increase = () => {
    setCount((prev) => prev + 1); // Double the quantity
  };

  const decrease = () => {
    if (count <= 1) {
      onDelete(parts.id); // Delete if 0
    } else {
      setCount((prev) => Math.floor(prev / 2)); // Halve the quantity
    }
  };

  return (
    <div className="flex  gap-4 p-2  shadow-md rounded-xl overflow-auto  mb-4  hover:shadow-lg hover:scale-[1.001] md:hover:shadow-lg md:hover:scale-[1.002] scrollbar-hide  bg-cover bg-center bg-no-repeat hover:border-1 hover:border-red-500"
    style={{ backgroundImage: `url("${bgImage}")` }}>
      <div className="overflow-auto">
        <img
          src={parts.imageUrl}
          alt={parts.name}
          className="w-20 h-20  rounded-xl "
        />
      </div>
      <div className="flex   text-sm  w-full overflow-auto  ">
        <div className="flex-wrap flex  w-full justify-between item-between align-between relative  ">
          <div className="pl-2  w-1/3 ">
            <h2 className="text-xl font-semibold text-[#9b111e]">
              {parts.name}
            </h2>
            <p className="text-sm text-[#E6A895]  ">
              {parts.description}
            </p>
            <p className="text-xs text-[#E6A895] ">
              Compatible with: {parts.compatibility}
            </p>
          </div>
          <div className="items-center    w-1/3  justify-center flex  ">
            <div className="flex flex-cols gap-4 w-72 justify-between   ">
              <div className="flex gap-3">
                <span className="text-lg font-bold text-green-600 ">
                &#8377;{totalPrice}
              </span>
              <span className="line-through text-sm text-gray-400">
                &#8377;{parts.originalPrice}
              </span></div>
              <span className="text-red-500 text-sm">
                {parts.discount}% off
              </span>
              <div>
                <p
                className={`text-sm ${
                  parts.inStock ? "text-green-600" : "text-red-600 "
                } `}
              >
                {parts.inStock ? "In Stock" : "Out of Stock"}
              </p>
              </div>
            </div>
          </div>

          <div className=" mr-3  text-center justify-center items-center flex flex-col-1 gap-4 ">
            <div className="flex items-center gap-4    ">
              <button
                className="text-base  px-1 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={decrease}
              >
                <FaMinus />
              </button>
              <span className="text-base">{count}</span>
              <button
                className="text-base px-1 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={increase}
              >
                <FaPlus />
              </button>
            </div>
            <div className="item-center flex justify-center  ">
              <button className="text-sm px-2 py-2 rounded-xl bg-red-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000" onClick={() => onConfirm(parts.id, count)}
                >
                  <span className="absolute bg-red-400 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-red-500 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-5 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                   Delete
                </button>
            </div>
            <div className=" item-center flex justify-center ">
              <button className="text-sm px-2 py-2 rounded-xl bg-emerald-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000" onClick={() => onConfirm(parts.id, count)}
                >
                  <span className="absolute bg-emerald-400 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-emerald-500 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                   Confirm Order
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SparePartCard;
