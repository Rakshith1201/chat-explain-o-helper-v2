import { ChatBox } from "@/components/ChatBox";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 animate-fade-in">
            Kid-Friendly Explanations
          </h1>
          <p className="text-base md:text-lg text-gray-600 animate-fade-in [animation-delay:200ms]">
            Ask me anything, and I'll explain it like you're 10 years old!
          </p>
        </div>
        <ChatBox />
      </div>
    </div>
  );
};

export default Index;