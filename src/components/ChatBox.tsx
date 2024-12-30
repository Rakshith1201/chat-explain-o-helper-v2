import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const ChatBox = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('https://hook.us2.make.com/az20jqbx0q9jimhqqbmpisyqv5wpkn2s', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message to webhook');
      }

      const responseText = await response.text();
      let aiResponse;
      
      try {
        // Try to parse as JSON first
        const jsonResponse = JSON.parse(responseText);
        aiResponse = jsonResponse.response || jsonResponse;
      } catch (e) {
        // If not JSON, use the raw text
        aiResponse = responseText;
      }
      
      // Add the response to the chat
      setMessages((prev) => [...prev, { 
        text: typeof aiResponse === 'string' ? aiResponse : "I understand! Let me explain that in a simple way...", 
        isUser: false 
      }]);
    } catch (error) {
      console.error('Webhook error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      
      // Add a fallback response
      setMessages((prev) => [...prev, { 
        text: "I'm having trouble right now. Please try again in a moment!", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-chatbox-background rounded-xl shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.text} isUser={message.isUser} />
        ))}
        {isLoading && (
          <div className="flex space-x-2 p-4 bg-chatbox-message rounded-xl w-fit">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-white rounded-b-xl">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading || !inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};