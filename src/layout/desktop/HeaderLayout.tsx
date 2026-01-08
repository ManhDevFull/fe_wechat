import UserHeader from "@/src/components/userHeader";
import MenuHeader from "../../components/menuHeader";

export default function HeaderComponent() {
  return (
    <>
      <header className="sticky top-0 z-50 lg:h-18  flex items-center px-20 justify-between bg-black">
        <div id="logo">VieC</div>
        <div id="header-search"></div>
        <MenuHeader />
        <UserHeader />
      </header>
    </>
  );
}
