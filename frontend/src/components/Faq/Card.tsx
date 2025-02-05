import React, { useState } from "react";
import { MdArrowRight, MdQuestionAnswer } from "react-icons/md";

const Card = ({ card, viewMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-white shadow-md p-6 rounded-lg border border-gray-200 transition-all duration-300 ease-in-out transform hover:border-blue-500 ${
        viewMode === "list" ? "flex items-center space-x-4" : "text-center"
      }`}
    >
      <div className="text-[#7091E6] mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-12 h-12 ${viewMode === "list" ? "mr-4" : "mx-auto"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h7m4 0h7M5 14h14M7 18h10m-5-8V6m0 4v2m0-2H7m10 0h4"
          />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{card.title}</h3>
        <p className="text-sm text-[#7091E6]">{card.articles}</p>
        <p className="text-xs text-gray-500">{card.updated}</p>
        
        {card.questions && card.questions.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 text-sm"
            >
              {isExpanded ? "Hide Questions" : "Show Questions"}
            </button>
            {isExpanded && (
              <div className="mt-2 space-y-2">
                {card.questions.map((faq) => (
                  <div
                  key={faq._id}
                  className="border p-4 rounded-md bg-white shadow-md my-2 transition duration-150 hover:shadow-lg"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <MdQuestionAnswer className="text-blue-500" size={16} />
                    <h4 className="font-semibold text-lg text-gray-800">{faq.question}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 flex items-start">
                    <MdArrowRight className="text-gray-400 mr-2" size={20} />
                    {faq.answer}
                  </p>
                </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;