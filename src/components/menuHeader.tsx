"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function MenuHeader() {
  const pathname = usePathname();
  const items = [
    { href: "/", label: "Trang chủ" },
    { href: "/reels", label: "Reels" },
    { href: "/friends", label: "Bạn bè" },
    { href: "/chat", label: "Nhắn tin" },
    { href: "/red-envelope", label: "Hồng bao" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav>
      <ul className="flex gap-4 items-center">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`rounded-lg px-4 py-2 ${isActive(item.href) ? "bg-[#ffffff34]" : ""}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MenuHeader;
