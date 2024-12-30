import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div
      className={cn(
        "p-4 rounded-2xl max-w-[85%] md:max-w-[80%] animate-message-fade-in break-words",
        isUser
          ? "bg-chatbox-accent ml-auto rounded-br-sm shadow-sm"
          : "bg-chatbox-message mr-auto rounded-bl-sm shadow-sm"
      )}
    >
      <p className="text-gray-800 leading-relaxed text-base md:text-sm">{message}</p>
    </div>
  );
};