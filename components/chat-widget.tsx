"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Send, Cpu, Loader2 } from "lucide-react";
import { chatWithGemini } from "@/app/actions";

type Message = {
  role: "user" | "model";
  text: string;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
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

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the Server Action (Secure Backend)
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

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] max-h-[70vh] flex flex-col rounded-xl overflow-hidden border border-cyan/30 bg-[#030304]/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan/20 bg-cyan/5">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan" />
                <span className="font-mono text-xs font-bold tracking-widest text-cyan uppercase">
                  AI Assistant // Online
                </span>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-cyan/20 scrollbar-track-transparent"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg border ${
                      msg.role === "user"
                        ? "bg-cyan/10 border-cyan/30 text-cyan-50 rounded-br-none"
                        : "bg-zinc-900/80 border-zinc-800 text-amder-50/90 rounded-bl-none border-l-2 border-l-amber-500/50"
                    }`}
                  >
                    {msg.role === "model" && (
                        <span className="block text-[10px] text-zinc-500 mb-1 tracking-wider uppercase">
                            AI_RESPONSE
                        </span>
                    )}
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg rounded-bl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-cyan animate-spin" />
                    <span className="text-xs text-zinc-500 animate-pulse">Processing Query...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-cyan/20 bg-background/50">
              <div className="relative flex items-center gap-2">
                <span className="text-cyan font-mono">{">"}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Execute query..."
                  className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:ring-0"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-md hover:bg-cyan/10 text-cyan disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
