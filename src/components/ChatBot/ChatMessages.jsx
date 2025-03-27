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
        className={`px-4 py-2 rounded-lg max-w-[75%] break-words text-sm ${
          chat.role === "model"
            ? "bg-primary text-white dark:bg-primary-dark"
            : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
        } ${chat.isError ? "bg-red-500 text-white" : ""}`}
      >
        {chat.text}
      </p>
    </div>
  );
};

export default ChatMessage;
