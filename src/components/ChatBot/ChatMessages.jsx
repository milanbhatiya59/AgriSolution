import React from "react";
import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  return (
    <div
      className={`flex items-start gap-2 ${
        chat.role === "model" ? "self-start" : "self-end flex-row-reverse"
      }`}
    >
      {chat.role === "model" && <ChatbotIcon />}
      <p
        className={`px-4 py-2 max-w-[75%] break-words text-sm bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-lg ${
          chat.isError ? "bg-red-500 text-black dark:text-white" : ""
        }`}
      >
        {chat.text}
      </p>
    </div>
  );
};

export default ChatMessage;
