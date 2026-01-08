'use client'
import { useRouter } from "next/navigation";
import React from "react";

export default function UserHeader() {
  const route = useRouter()
  return (
    <div>
      <button onClick={()=>route.push('/login')} className="relative px-5 py-1 border-r border-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">
        Đăng nhập
      </button>
      <button onClick={()=>route.push('/register')} className="relative px-5 py-1 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">
        Đăng ký
      </button>
    </div>
  );
}
