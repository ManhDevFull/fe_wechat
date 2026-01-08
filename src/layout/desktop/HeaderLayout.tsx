import UserHeader from "@/src/components/userHeader";
import MenuHeader from "../../components/menuHeader";
import SearchInput from "@/src/components/searchInput";

export default function HeaderComponent() {
  return (
    <>
      <header className="text-white sticky top-0 z-50 h-18 flex items-center px-20 justify-between bg-black">
        <div className="flex gap-5 items-center">
          <div>VieC</div>
          <SearchInput />
        </div>
        <MenuHeader />
        <UserHeader />
      </header>
    </>
  );
}
