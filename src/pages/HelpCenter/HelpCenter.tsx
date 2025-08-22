import React, { useState } from "react";
import { FaUser, FaCogs, FaSearch, FaBoxOpen } from "react-icons/fa";
import { MdEventAvailable, MdPayment } from "react-icons/md";
import { SiGooglecloudspanner } from "react-icons/si";

const helpCards = [
  {
    title: "My account",
    description: "Create and manage your account",
    icon: <FaUser size={32} className="text-[#9b111e]" />,
  },
  {
    title: "Bookings",
    description: "Manage your bookings and appointments",
    icon: <MdEventAvailable size={32} className="text-[#9b111e]" />,
  },
  {
    title: "Services",
    description: "Explore and manage our available services",
    icon: <SiGooglecloudspanner size={32} className="text-[#9b111e]" />,
  },
  {
    title: "Spare spots",
    description: "View and reserve available time slots",
    icon: <FaBoxOpen size={32} className="text-[#9b111e]" />,
  },
  {
    title: "Payment Issues",
    description: "Get help with billing and payment problems",
    icon: <MdPayment size={32} className="text-[#9b111e]" />,
  },
  {
    title: "Settings",
    description: "Customize your experience and preferences",
    icon: <FaCogs size={32} className="text-[#9b111e]" />,
  },
];

const HelpCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(helpCards);

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = () => {
    const filtered = helpCards.filter(
      (card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !description.trim()) {
      alert("Please fill in both Subject and Description.");
      return;
    }

    setSubject("");
    setDescription("");
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="h-full  bg-[#FAF3EB] flex flex-col items-center px-4 py-12">
      <header className="w-full  text-center mb-8">
        <h1 className="text-4xl font-bold text-[#9b111e] pt-10">
          How can we help
        </h1>
        <div className="mt-4 flex items-center justify-center pt-8 pb-10 gap-2 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffd46b]"
          />
          <button
            onClick={handleSearch}
            className="bg-[#9b111e] text-white p-2 rounded-full hover:bg-orange-600 focus:outline-none"
            aria-label="Search help topics"
          >
            <FaSearch />
          </button>
        </div>
      </header>

      {results.length === 0 ? (
        <p className="text-gray-600 mt-4">No results found.</p>
      ) : (
        <section className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:bg-orange-100 p-6 flex flex-col items-center text-center transition duration-300 h-[180px]"
            >
              <div className="mb-3">{card.icon}</div>
              <h2 className="text-lg font-semibold text-gray-800">
                {card.title}
              </h2>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          ))}
        </section>
      )}

      <form
        onSubmit={handleSubmit}
        className="my-5 w-full bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold text-[#9b111e] mb-6">Enquire?</h2>

        <div className="grid grid-cols-1  gap-4">
          <div className="col-span-1 md:col-span-1">
            <label htmlFor="subject" className="block text-gray-700 mb-1">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Enter the subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="col-span-1 md:col-span-1">
            <label htmlFor="description" className="block text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Describe your issue or question"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              rows={3}
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="bg-[#9b111e] hover:bg-orange-600 text-white px-6 py-3 rounded-md w-full md:w-auto"
            >
              Submit
            </button>
          </div>
        </div>

        {submitted && (
          <p className="mt-4 text-orange-600 font-medium">
            Thank you! Your request has been submitted.
          </p>
        )}
      </form>

      <div className="mt-4 text-end self-end text-sm text-gray-600 max-w-4xl w-full px-4">
        For further assistance, email us at{" "}
        <a
          href="mailto:helpsupport@example.com"
          className="text-orange-600 underline"
        >
          helpsupport@example.com
        </a>
      </div>
    </div>
  );
};

export default HelpCenter;
