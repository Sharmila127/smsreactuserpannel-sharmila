import React from "react";

interface OrderDetails {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  date?: string;
  price: number;
  compatibility: string;
}

interface OrderDetailsProps {
  part: OrderDetails;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ part }) => {
  return (
    <div className="flex flex-col ">
    <div className="w-60 h-80 bg--800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-between gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow--400 transition-shadow bg-[linear-gradient(to_right,#9b111e,#c31432)]">
      {/* Image Section */}
      <div className="w-52 h-40 bg-sky-300 rounded-2xl overflow-hidden flex items-center justify-center">
        <img
          src={part.imageUrl}
          alt={part.name}
          className="w-full h-full object-cover"
        />
      </div>


      {/* Text Info */}
      <div className="flex flex-col gap-1">
        <p className="font-extrabold text-lg">{part.name}</p>
        <p className="text-sm text-neutral-400">{part.description}</p>
        <p className="text-sm text-neutral-400">🛠️ {part.compatibility}</p>
        {part.date && (
          <p className="text-xs text-neutral-500">Ordered on: {part.date}</p>
        )}
        <p className="text-green-400 font-bold text-lg mt-1">&#8377;{part.price}</p>
      </div>

      {/* CTA Button */}
      <button className="bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors text-sm">
        Track
      </button>
    </div>
    </div>
  );
};

export default OrderDetails;
