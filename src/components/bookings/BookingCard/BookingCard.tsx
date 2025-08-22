import React from "react";

interface Booking {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  updatedAt: string;
}

const bookings: Booking[] = [
  {
    id: 1,
    title: "Card Title One",
    description: "Some sample description text for the first card.",
    imageUrl: "https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg",
    updatedAt: "3 mins ago",
  },
  {
    id: 2,
    title: "Card Title Two",
    description: "Second card with content on the right.",
    imageUrl: "https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg",
    updatedAt: "5 mins ago",
  },
  {
    id: 3,
    title: "Card Title Three",
    description: "Third card goes back to left image layout.",
    imageUrl: "https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg",
    updatedAt: "10 mins ago",
  },
];

const AlternatingCardList: React.FC = () => {
  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className={`flex items-center gap-4 bg-white rounded-lg shadow-md overflow-hidden p-4 `}
        >  
          <img
            src={booking.imageUrl}
            alt={booking.title}
            className="w-32 h-32 object-cover rounded"
          />
          <div className="flex flex-col justify-between max-w-md">
            <h5 className="text-xl font-semibold mb-2">{booking.title}</h5>
            <p className="text-sm text-gray-600 mb-1">{booking.description}</p>
            <p className="text-xs text-gray-400">{booking.updatedAt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlternatingCardList;
