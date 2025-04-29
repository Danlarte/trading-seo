"use client";

import { useState } from "react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors duration-200"
          >
            <h2 className="text-lg font-semibold text-[#17498A] text-left">
              {item.question}
            </h2>
            <span
              className={`transform transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            <div className="p-4 bg-white rounded-b-lg shadow">
              <div className="prose max-w-none">{item.answer}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
