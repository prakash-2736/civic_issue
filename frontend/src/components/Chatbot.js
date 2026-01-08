import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini API Key rotation
const GEMINI_KEYS = (process.env.REACT_APP_GEMINI_API_KEY || "")
  .split(",")
  .map((key) => key.trim())
  .filter((key) => key.length > 0);
let keyIndex = 0;
const getNextKey = () => {
  if (GEMINI_KEYS.length === 0) {
    console.error("No Gemini API keys found!");
    return null;
  }
  const key = GEMINI_KEYS[keyIndex];
  keyIndex = (keyIndex + 1) % GEMINI_KEYS.length;
  return key;
};
const createAIInstance = () => {
  const key = getNextKey();
  if (!key) {
    throw new Error("No valid Gemini API key available");
  }
  console.log("Using Gemini API Key:", key.slice(0, 6) + "...");
  return new GoogleGenerativeAI(key);
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const WEBSITE_CONTEXT = `
You are a helpful assistant for the CivicTracker Citizen Dashboard.
Only answer questions related to the website.
Users can:
- Register and log in to their citizen account.
- Click the "Report" button to submit a new civic issue.
- Provide a title, description, and optionally upload an image.
- Select categories when reporting: Potholes, Trash, Streetlight, Water Leakage, Other.
- Submit the report and check its status in the dashboard.
- Contact info: phone number: 999-999-9999, email: citizen.support@example.com.

Rules:
- If the question is unrelated to this website, respond:
  "I'm sorry, I can only answer questions related to CivicTracker."
- Keep responses short and clear.
`;

    try {
      const ai = createAIInstance();
      const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

      const conversationText = newMessages
        .map((m) => (m.role === "user" ? "User: " : "Assistant: ") + m.content)
        .join("\n");

      const prompt = `${WEBSITE_CONTEXT}\n\nConversation so far:\n${conversationText}\nAssistant:`;

      const result = await model.generateContent([{ text: prompt }]);
      const reply =
        result.response.text?.() || "Sorry, I couldn't generate a response.";

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Gemini API error:", error);
      let errorMessage = "Something went wrong. Please try again.";

      if (error.message?.includes("API key")) {
        errorMessage = "API key error. Please check configuration.";
      } else if (error.message?.includes("quota")) {
        errorMessage = "API quota exceeded. Please try again later.";
      }

      setMessages([
        ...newMessages,
        { role: "assistant", content: errorMessage },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {isOpen ? (
        <div className="w-80 h-[480px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-orange-600 text-white px-4 py-3 flex justify-between items-center font-semibold">
            Citizen Bot
            <FaTimes
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2 bg-gray-100">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-xl max-w-[80%] break-words ${
                  msg.role === "user"
                    ? "bg-yellow-100 text-yellow-800 self-end"
                    : "bg-gray-200 text-gray-900 self-start"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="italic text-gray-500 text-sm">
                Bot is typing...
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <div className="flex p-2 border-t border-gray-300 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask a question..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg animate-bounce hover:bg-orange-700 transition-colors"
        >
          <FaRobot />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
