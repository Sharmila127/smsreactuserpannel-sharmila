import { useState } from "react";
import {
  FaMinus,
  FaPlus,
  FaQuestionCircle,
  FaListUl,
  FaTools,
  FaCogs,
  FaCalendarAlt,
  FaWallet,
  FaGavel,
} from "react-icons/fa";

type Category = "General" | "Service" | "Spare Parts" | "Booking" | "Accounts" | "Legal";

const faqs = [
  {
    question: "What is Frank AI?",
    answer:
      "Frank AI is an autonomous artificial intelligence assistant tool that focuses on helping Human Recruitment, qualify candidates or applicants, and manage the company.",
  },
  {
    question: "How does Frank AI work?",
    answer:
      "Frank AI uses advanced algorithms to streamline HR processes, including recruitment, evaluation, and management tasks.",
  },
  {
    question: "Is Frank right for my company’s HR?",
    answer:
      "Frank AI is ideal for companies looking to optimize their HR workflows with intelligent automation.",
  },
  {
    question: "What are the costs and fees to use Frank AI?",
    answer:
      "Pricing plans vary depending on the size of your business and specific needs. Contact our sales team for a custom quote.",
  },
  {
    question: "How can I set up my account for Frank AI?",
    answer:
      "You can set up your account by visiting our registration page and following the onboarding steps provided.",
  },
];

const categories: Category[] = [
  "General",
  "Service",
  "Spare Parts",
  "Booking",
  "Accounts",
  "Legal",
];

const categoryIcons: Record<Category, React.ReactNode> = {
  General: <FaListUl />,
  Service: <FaTools />,
  "Spare Parts": <FaCogs />,
  Booking: <FaCalendarAlt />,
  Accounts: <FaWallet />,
  Legal: <FaGavel />,
};

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<Category>("General");

  const toggleAnswer = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-white min-h-screen ml-4 p-6">
      <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-red-600 to-red-800 text-transparent bg-clip-text">
        FaQ
      </h1>
      <p className="text-center text-gray-600 mb-8 mt-4">
        Your questions answered here.
      </p>

      <div className="flex pl-20">
        {/* Sidebar */}
        <div className="w-1/4 pr-6">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition duration-200 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg pr-2">{categoryIcons[category]}</span>
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ Section */}
        <div
          className="w-3/4 pr-10 max-h-[70vh] overflow-auto pl-4"
          style={{ scrollbarWidth: "none" }}
        >
          <h2 className="text-xl font-semibold bg-white mb-4 sticky top-0 text-red-800 flex items-center gap-2">
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full p-2">
              {categoryIcons[activeCategory] || <FaQuestionCircle />}
            </div>
            {activeCategory} Questions
          </h2>

          <div className="space-y-4 pr-10">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-700 pb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  <h3 className="font-medium">{faq.question}</h3>
                  <div className="rounded-full p-2">
                    {activeIndex === index ? (
                      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full p-2">
                        <FaMinus />
                      </div>
                    ) : (
                      <div className="p-[1px] rounded-full bg-gradient-to-r from-red-600 to-red-800 inline-block">
                        <div className="bg-white text-red-600 rounded-full p-2">
                          <FaPlus />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {activeIndex === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
