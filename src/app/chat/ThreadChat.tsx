import React, { useState } from "react";
import { ChatUser, MessageChat } from "@/src/types/ITypes";
import MessageInput from "@/src/ui/messageInput";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoChevronBackSharp } from "react-icons/io5";
import { getLastName } from "@/src/utils/getName";

type ThreadChatType = {
  user: ChatUser;
  thread: MessageChat[];
};

interface Props {
  thread: ThreadChatType | undefined;
  onBack: () => void;
  open: boolean;
}

export default function ThreadChat(props: Props) {
  const { thread, open, onBack } = props;
  const onClose = () => {
    if (isOption) {
      setIsOption(false);
    } else {
      onBack();
    }
  };
  const [isOption, setIsOption] = useState(false);
  return (
    <div
      className={`
        fixed inset-0 z-[51] bg-white
        shadow-2xl transform transition-transform duration-300 ease-out
        flex flex-col overflow-hidden min-h-0
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      onClick={(event) => event.stopPropagation()}
    >
      {/* Header */}
      <div className="sticky top-0 z-[52] bg-white border-b shrink-0">
        <div className="flex items-center justify-between px-2 pr-4 py-2">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="w-12 h-12 mr-1 flex items-center justify-center active:scale-95 transition"
              aria-label="Back"
              type="button"
            >
              <IoChevronBackSharp color="#00000099" size={30} />
            </button>

            <div className="flex items-center">
              <div className="relative">
                <img
                  src={thread?.user.avt}
                  className="w-12 h-12 rounded-full object-cover"
                  alt={thread?.user.name}
                />
                <span
                  className={`
                    absolute bottom-0 right-0 h-[13px] w-[13px] rounded-full
                    border-2 border-white
                    ${thread?.user.status ? "bg-[#15d018]" : "bg-[#545353]"}
                  `}
                />
              </div>

              <div className="pl-2">
                <h3 className="text-black text-[16px] font-semibold leading-tight">
                  {thread?.user.name}
                </h3>
                <p className="text-[#4e4c4c] text-[12px] leading-tight">
                  {thread?.user.status
                    ? "Đang hoạt động"
                    : "Hoạt động 10p trước"}
                </p>
              </div>
            </div>
          </div>

          <button
            className="w-12 h-12 flex items-center justify-center active:scale-95 transition"
            aria-label="Menu"
            type="button"
            onClick={() => setIsOption(!isOption)}
          >
            <FaEllipsisVertical size={22} color="#00000099" />
          </button>
        </div>
      </div>
      {/* Menu */}
      {isOption ? (
        <div className="text-black flex-1 min-h-0 overflow-y-auto px-4 pt-3 pb-2 flex flex-col gap-2">
          <p>Tùy chỉnh biệt danh</p>
          <p>Thông tin về đoạn chat</p>
          <p>Đổi chủ đề</p>
          <p>File</p>
          <p>Hình ảnh</p>
          <p>Liên kết</p>
          <p>Gửi hồng bao</p>
          <p>Tạo nhóm với {thread?.user && getLastName(thread?.user.name)}</p>
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-3 pb-2 flex flex-col gap-2">
          {thread?.thread.map((chat) => {
            // ✅ Sửa lại điều kiện: tin nhắn của mình thường là userFrom === "me"
            const isMe = chat.userFrom === "me";

            return (
              <div
                key={chat.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                  max-w-[80%] px-3 py-2 text-sm leading-relaxed break-words
                  rounded-2xl
                  ${
                    isMe
                      ? "bg-[#e7f2ff] text-black rounded-br-md"
                      : "bg-gray-100 text-black rounded-bl-md"
                  }
                `}
                >
                  {chat.content}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Input */}
      {!isOption && (
        <div className="bg-white">
          <MessageInput />
        </div>
      )}
    </div>
  );
}
