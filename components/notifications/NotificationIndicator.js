"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import NotificationList from "./NotificationList";

const NotificationIndicator = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["unreadNotifications"],
    queryFn: async () => {
      const response = await axios.get("/api/notifications?limit=1");
      return response.data.unreadCount;
    },
    refetchInterval: 2000,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
        title="Notificaciones"
      >
        <FaBell
          size={18}
          className={`transition-colors duration-200 ${
            isOpen ? "text-[#54BCAF]" : "text-gray-700"
          }`}
        />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-[#54BCAF] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/5 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 z-50 origin-top-right">
            <div className="relative">
              {/* Flecha del dropdown */}
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200" />
              <NotificationList onClose={() => setIsOpen(false)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationIndicator;
