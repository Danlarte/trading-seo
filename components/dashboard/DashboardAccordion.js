"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";

const DashboardAccordion = ({ sections, plan }) => {
  const [openSection, setOpenSection] = useState(0);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? -1 : index);
  };

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <button
            className="w-full p-4 text-left font-semibold text-sm sm:text-base md:text-lg flex justify-between items-center bg-[#17498A] text-white transition-colors duration-300 hover:bg-[#54BCAF]"
            onClick={() => toggleSection(index)}
          >
            <span>{section.title}</span>
            <FaChevronDown
              className={`transform transition-transform duration-300 ${
                openSection === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`transition-all duration-300 ease-in-out ${
              openSection === index
                ? "max-h-[1200px] opacity-100"
                : "max-h-0 opacity-0"
            } overflow-scroll`}
          >
            <div className="p-4">
              {section.state === "expert" && plan !== "EXPERT" ? (
                <div className="bg-gradient-to-r from-[#17498A] to-[#54BCAF] text-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4">
                    Contenido exclusivo para miembros EXPERT
                  </h3>
                  <p className="mb-4">
                    Suscríbete ahora para acceder a este contenido premium y
                    mucho más.
                  </p>
                  <Link href="/landing">
                    <span className="bg-white text-[#17498A] font-bold py-2 px-4 rounded-full hover:bg-[#54BCAF] hover:text-white transition-colors duration-300">
                      Suscríbete ya
                    </span>
                  </Link>
                </div>
              ) : (
                section.content
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardAccordion;
