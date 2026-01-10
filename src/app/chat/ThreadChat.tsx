import { ChatUser, MessageChat } from "@/src/types/ITypes";
import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";
type ThreadChat = {
  user: ChatUser;
  thread: MessageChat[];
};
interface Props {
  thread: ThreadChat | undefined;
  onBack: () => void;
  open: boolean;
}
export default function ThreadChat(props: Props) {
  const { thread, open, onBack } = props;

  return (
    <div
      className={`absolute z-51 left-0 top-0 h-full w-full bg-white shadow-2xl transition-transform duration-400 ease-out ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex sticky z-52 py-2 px-2 shadow-lg">
        <div
          onClick={onBack}
          className="w-12 h-12 mr-2 flex items-center justify-center"
        >
          <IoChevronBackSharp color="#00000099" size={30} />
        </div>
        <div className="flex">
          <div className="relative">
            {" "}
            <img
              src={thread?.user.avt}
              className="w-12 rounded-[9999px]"
              alt={thread?.user.name}
            />
            <span
              className={`absolute bottom-0 right-0 h-[13px] w-[13px] rounded-full border-2 border-white ${
                thread?.user.status ? "bg-[#15d018]" : "bg-[#545353]"
              }`}
            />
          </div>

          <div className="pl-2">
            <h3 className="text-black text-lg">{thread?.user.name}</h3>
            <p className="text-[#4e4c4c]">
              {thread?.user.status ? "Đang hoạt động" : "Hoạt động 10p trước"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
