"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Send, Cpu, Loader2 } from "lucide-react";
import { chatWithGemini } from "../app/actions";

type Message = {
  role: "user" | "model";
  text: string;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hello! I'm Devendra's AI assistant. Ask me anything about his projects, skills, or experience." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Suggestions configuration
  const suggestions = [
    { icon: "💡", label: "What's your most impressive project?" },
    { icon: "🚀", label: "Why are you a good fit for a startup?" },
    { icon: "🛠️", label: "What are your core skills?" },
  ];

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the Server Action
      const result = await chatWithGemini(userMsg);

      if (result.error) {
        throw new Error(result.error);
      }

      setMessages((prev) => [...prev, { role: "model", text: result.reply || "Error: Empty response." }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev, 
        { role: "model", text: `Error: ${error instanceof Error ? error.message : "Connection failed"}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  // Helper to parse **bold** text
  const renderMessage = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="text-purple-300 font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl border transition-all duration-300 group
          ${isOpen 
            ? "bg-destructive text-destructive-foreground border-destructive/50" 
            : "bg-background/80 backdrop-blur-md text-cyan border-cyan/50 hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          }
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Terminal className="w-6 h-6" />}
        {!isOpen && (
           <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        )}
      </motion.button>

      {/* Notification Bubble */}
      <AnimatePresence>
        {!isOpen && showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { delay: 2, duration: 0.5 }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              transition: { duration: 0.2 }
            }}
            className="fixed bottom-24 right-6 z-40 max-w-[200px]"
          >
            <div className="relative bg-background/80 backdrop-blur-md border border-purple-500/80 p-3 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <p className="text-xs font-mono text-purple-400 leading-relaxed pr-2">
                Free to ask any questions. I am Devendra's AI assistant.
              </p>
              {/* Triangle Tail */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-background/80 border-b border-r border-purple-500/80 transform rotate-45"></div>
              
              {/* Close Button */}
              <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNotification(false);
                  }} 
                  className="absolute -top-3 -left-3 z-50 bg-zinc-950 border border-purple-500/50 rounded-full p-1.5 hover:bg-purple-900/20 text-purple-400 transition-colors shadow-md cursor-pointer flex items-center justify-center group"
                  aria-label="Close notification"
              >
                  <X className="w-3 h-3 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[550px] max-h-[75vh] flex flex-col rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm font-semibold tracking-wide text-zinc-100">
                  Ask DevendraAI
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700/50 scrollbar-track-transparent"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-zinc-800/80 text-zinc-200 rounded-bl-none border border-zinc-700/50"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{renderMessage(msg.text)}</p>
                  </div>
                </div>
              ))}
              
              {/* Suggested Prompts (Only show if only 1 message exists) */}
              {messages.length === 1 && (
                 <div className="flex flex-col gap-2 mt-4 px-1">
                   {suggestions.map((s, i) => (
                     <button
                       key={i}
                       onClick={() => handleSend(s.label)}
                       className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-800 transition-all text-left group"
                     >
                       <span className="text-lg">{s.icon}</span>
                       <span className="text-sm text-zinc-400 group-hover:text-purple-300 transition-colors">
                         {s.label}
                       </span>
                     </button>
                   ))}
                 </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800/80 border border-zinc-700/50 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    <span className="text-xs text-zinc-400">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-zinc-900/30">
              <div className="relative flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-full px-2 py-1.5 focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/20 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-200 placeholder:text-zinc-500 px-3 py-2 focus:ring-0"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-50 disabled:bg-zinc-700 transition-all"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
