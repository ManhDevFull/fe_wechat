"use client";
import UserHeader from "@/src/components/userHeader";
import MenuHeader from "../../components/menuHeader";
import SearchInput from "@/src/components/searchInput";
import NavMenu from "@/src/ui/navMobile1";

export default function HeaderComponent() {
  return (
    <>
      <header className="w-full text-white hidden sticky top-0 z-50 h-[72px] sm:flex items-center px-20 justify-between bg-black">
        <div className="flex gap-5 items-center">
          <div>VieC</div>
          <SearchInput />
        </div>
        <MenuHeader />
        <UserHeader />
      </header>
      <header className="w-full flex fixed bottom-0 left-0 right-0 z-50 sm:hidden items-center justify-center bg-transparent">
        <NavMenu />
      </header>
    </>
  );
}
