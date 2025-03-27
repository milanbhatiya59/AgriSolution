import { useEffect, useRef, useState } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessages";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong!!");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition"
      >
        {showChatbot ? (
          <ChevronDown className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chatbot Popup */}
      {showChatbot && (
        <div className="fixed bottom-20 right-5 w-96 bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="flex items-center gap-3">
              <ChatbotIcon />
              <h2 className="text-lg font-semibold">ChatBot</h2>
            </div>
            <button
              className="p-1 text-white"
              onClick={() => setShowChatbot(false)}
            >
              <ChevronDown className="h-6 w-6" />
            </button>
          </div>

          {/* Chat Body */}
          <div
            ref={chatBodyRef}
            className="max-h-[400px] overflow-y-auto p-4 space-y-3"
          >
            {/* Welcome Message */}
            <div className="flex items-start gap-2">
              <ChatbotIcon />
              <p className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-lg">
                Hey there! 👋 How can I help you?
              </p>
            </div>

            {/* Chat History */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* Chat Footer */}
          <div className="p-4 border-t dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
