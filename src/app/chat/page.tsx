import DesktopChatPage from "./desktop";
import MobileChatPage from "./mobile";

export default function ChatPage() {
  return (
    <>
      <div className="bg-white hidden sm:block min-h-screen text-black">
        <DesktopChatPage />
      </div>
      <div className="bg-white min-h-screen sm:hidden">
        <MobileChatPage />
      </div>
    </>
  );
}