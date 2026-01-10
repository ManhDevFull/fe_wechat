"use client";
import { useState } from "react";
import MenuIcon from "@/src/ui/iconMenu";
import ChatNav from "@/src/components/chatNav";
import { ChatUser, MessageChat } from "@/src/types/ITypes";
type ThreadChat = {
  user: ChatUser;
  thread: MessageChat[];
};
export default function MobileChatPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [friendsOnl, setFriendsOnl] = useState()
  const [chatList, setChatList] = useState<ThreadChat[]>([
    {
      user: {
        id: "u1",
        name: "Nguyễn Văn A",
        avt: "https://i.pravatar.cc/150?img=1",
        statusFriend: true,
        status: true, // online
      },
      thread: [
        {
          id: "m1",
          content: "Chào bạn 👋",
          imgs: "",
          userFrom: "u1",
          userTo: "me",
          status: true,
          sendAt: "2026-01-08T09:00:00Z",
          readAt: "2026-01-08T09:00:10Z",
        },
        {
          id: "m2",
          content: "Chào A, có việc gì không?",
          imgs: "",
          userFrom: "me",
          userTo: "u1",
          status: true,
          sendAt: "2026-01-08T09:01:00Z",
          readAt: "2026-01-08T09:01:20Z",
        },
      ],
    },
    {
      user: {
        id: "u2",
        name: "Trần Thị B",
        avt: "https://i.pravatar.cc/150?img=5",
        statusFriend: true,
        status: false, // offline
      },
      thread: [
        {
          id: "m3",
          content: "Hôm nay học nhóm không?",
          imgs: "",
          userFrom: "u2",
          userTo: "me",
          status: true,
          sendAt: "2026-01-07T15:30:00Z",
          readAt: "",
        },
        {
          id: "m4",
          content: "Ok, 7h tối nhé 👍",
          imgs: "",
          userFrom: "me",
          userTo: "u2",
          status: true,
          sendAt: "2026-01-07T15:35:00Z",
          readAt: "",
        },
      ],
    },
    {
      user: {
        id: "u3",
        name: "Lê Văn C",
        avt: "https://i.pravatar.cc/150?img=8",
        statusFriend: false,
        status: true,
      },
      thread: [
        {
          id: "m5",
          content: "Xin chào, mình muốn kết bạn",
          imgs: "",
          userFrom: "u3",
          userTo: "me",
          status: true,
          sendAt: "2026-01-06T20:10:00Z",
          readAt: "",
        },
      ],
    },
  ]);
  return (
    <div className="relative">
      <div className="px-5 py-2 flex justify-between items-center shadow-lg">
        <h3 className="text-2xl text-[#00000098] font-semibold">
          Đoạn hội thoại
        </h3>
        <div className="rounded-lg scale-70">
          <MenuIcon
            checked={isMenuOpen}
            onChange={(event) => setIsMenuOpen(event.target.checked)}
            ariaLabel="Mở menu chat"
          />
        </div>
      </div>
      <div className="text-black">Friends Online</div>
      <div className="text-black">
        {chatList.map((chatThread: ThreadChat) => (
          <div key={chatThread.user.id} className="flex border-b border-b-[#00000010] px-4 py-2 hover:bg-gray-100">
            <img src={chatThread.user.avt} className="w-13 rounded-[9999px]" />
            <div className="pl-2">
              <h5>{chatThread.user.name}</h5>
              <span className="text-[#00000099]">
                {chatThread.thread[chatThread.thread.length - 1].content}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ChatNav open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
