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
        "p-4 rounded-2xl max-w-[80%] animate-message-fade-in",
        isUser
          ? "bg-chatbox-accent ml-auto rounded-br-sm"
          : "bg-chatbox-message mr-auto rounded-bl-sm"
      )}
    >
      <p className="text-gray-800 leading-relaxed">{message}</p>
    </div>
  );
};