"use client";
import MenuIcon from "@/src/ui/iconMenu";

export default function MobileChatPage() {
  return (
    <div>
      <div className="px-5 py-2 flex justify-between items-center shadow-lg">
        <h3 className="text-2xl text-[#00000098] font-semibold">
          Đoạn hội thoại
        </h3>
        <div className="rounded-lg scale-70">
          <MenuIcon />
        </div>
      </div>
    </div>
  );
}
