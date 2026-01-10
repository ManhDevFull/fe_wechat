"use client";
import React from "react";

type ChatNavProps = {
  open: boolean;
  onClose: () => void;
};

const menuItems = [
  "Tất cả đoạn chat",
  "Chưa đọc",
  "Đã ghim",
  "Lưu trữ",
  "Cài đặt",
];

export default function ChatNav({ open, onClose }: ChatNavProps) {
  return (
    <div
      className={`fixed inset-0 z-0 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute left-0 top-0 h-full w-60 max-w-[80%] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="px-5 py-4 border-b">
          <p className="text-2xl font-semibold text-black">Menu chat</p>
        </div>
        <nav className="px-4 py-3" aria-label="Menu chat">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full text-left px-3 py-2 rounded-lg text-[#00000098] hover:bg-[#0000000f] transition"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
