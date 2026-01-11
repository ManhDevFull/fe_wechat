"use client";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "@/src/ui/iconMenu";
import ChatNav from "@/src/components/chatNav";
import { ChatUser, MessageChat } from "@/src/types/ITypes";
import { getLastName } from "@/src/utils/getName";
import ThreadChat from "./ThreadChat";
type ThreadChat = {
  user: ChatUser;
  thread: MessageChat[];
};
export default function MobileChatPage() {
  const [isOpenChat, setIsOpenChat] = useState(false)
  const [threadChat, setThreadChat] = useState<ThreadChat | undefined>(undefined)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const friendsScrollRef = useRef<HTMLDivElement | null>(null);
  const [friendsOnl, setFriendsOnl] = useState([
    {
      id: "u1",
      name: "Nguyễn Văn Mạnh",
      avt: "https://i.pravatar.cc/150?img=1",
      status: true,
    },
    {
      id: "u2",
      name: "Trần Thị Cứt",
      avt: "https://i.pravatar.cc/150?img=5",
      status: true,
    },
    {
      id: "u3",
      name: "Lê Văn An",
      avt: "https://i.pravatar.cc/150?img=8",
      status: true,
    },
    {
      id: "u4",
      name: "Lê Văn",
      avt: "https://i.pravatar.cc/150?img=8",
      status: true,
    },
    {
      id: "u5",
      name: "Lê Văn Gia",
      avt: "https://i.pravatar.cc/150?img=8",
      status: true,
    },
    {
      id: "u6",
      name: "Lê Văn Linh",
      avt: "https://i.pravatar.cc/150?img=8",
      status: true,
    },
    {
      id: "u7",
      name: "Lê Văn Cây",
      avt: "https://i.pravatar.cc/150?img=8",
      status: true,
    },
    {
      id: "u8",
      name: "Lê Văn Cối",
      avt: "https://i.pravatar.cc/150?img=8",
      status: true,
    },
    {
      id: "u9",
      name: "Lê Văn Um",
      avt: "https://i.pravatar.cc/150?img=8",
      status: true,
    },
    {
      id: "u10",
      name: "Lê Văn Xùm",
      avt: "https://i.pravatar.cc/150?img=8",
      status: true,
    },
  ]);
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
          content: "Ok, 7h tối nhé <3",
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
    },{
      user: {
        id: "u4",
        name: "Lê Văn C",
        avt: "https://i.pravatar.cc/150?img=8",
        statusFriend: false,
        status: true,
      },
      thread: [
        {
          id: "m7",
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
    {
      user: {
        id: "u5",
        name: "Lê Văn C",
        avt: "https://i.pravatar.cc/150?img=8",
        statusFriend: false,
        status: true,
      },
      thread: [
        {
          id: "m7",
          content: "Xin chào, mình muốn kết bạn",
          imgs: "",
          userFrom: "u3",
          userTo: "me",
          status: true,
          sendAt: "2026-01-06T20:10:00Z",
          readAt: "",
        },
      ],
    },{
      user: {
        id: "uf3",
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
    },{
      user: {
        id: "u3f",
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
    },{
      user: {
        id: "u3d",
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
    },{
      user: {
        id: "u3vss",
        name: "Lê Văn C",
        avt: "https://i.pravatar.cc/150?img=8",
        statusFriend: false,
        status: true,
      },
      thread: [
        {
          id: "m5sf",
          content: "Xin chào, mình muốn kết bạn",
          imgs: "",
          userFrom: "u3",
          userTo: "me",
          status: true,
          sendAt: "2026-01-06T20:10:00Z",
          readAt: "",
        },
      ],
    },{
      user: {
        id: "u3asdff",
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
    },{
      user: {
        id: "u3adfdgg",
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
    },{
      user: {
        id: "u3wweee",
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
    },{
      user: {
        id: "u3qqasw",
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
    },{
      user: {
        id: "u3aefff",
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

  useEffect(() => {
    const container = friendsScrollRef.current;
    if (!container) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      const delta = event.deltaY !== 0 ? event.deltaY : event.deltaX;
      if (delta === 0) {
        return;
      }
      event.preventDefault();
      container.scrollLeft += delta;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <><div className="relative">
      <div className="sticky top-0 z-2 bg-white px-5 py-2 flex justify-between items-center shadow-lg">
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
      <div className="text-black py-2 border-b border-b-[#00000010]">
        <h2 className="pl-4 text-lg text-[#342d2d] pb-3">Ban be dang hoat dong</h2>
        <div
          ref={friendsScrollRef}
          className="flex overflow-x-auto overflow-y-hidden hide-scrollbar"
        >
          {friendsOnl.map((frd) => (
            <div key={frd.id} className="px-4 shrink-0">
              <img
                src={frd.avt}
                className="w-15 rounded-full drop-shadow-lg border-2 border-[#77db78]"
                alt={frd.name}
              />
              <p className="text-center">{getLastName(frd.name)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-black">
        {chatList.map((chatThread: ThreadChat) => (
          <div
            key={chatThread.user.id}
            onClick={()=> {setIsOpenChat(true); setThreadChat(chatThread)}}
            className="flex border-b border-b-[#00000010] px-4 py-2 hover:bg-gray-100"
          >
            <div className="relative">
              <img
                src={chatThread.user.avt}
                className="w-13 h-13 rounded-[9999px]"
                alt={chatThread.user.name}
              />
              <span
                className={`absolute bottom-0 right-0 h-[13px] w-[13px] rounded-full border-2 border-white ${
                  chatThread.user.status ? "bg-[#15d018]" : "bg-[#545353]"
                }`}
              />
            </div>
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
    <ThreadChat open={isOpenChat} thread={threadChat} onBack={()=>{setIsOpenChat(false)}} />
    </div>
    </>
    
  );
}
