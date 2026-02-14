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
           <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
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
            className="fixed bottom-24 right-6 z-40 max-w-[220px]"
          >
            <div className="relative bg-background/90 backdrop-blur-md border border-cyan/30 p-4 rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.15)]">
               <div className="flex items-center gap-2 mb-2 border-b border-cyan/10 pb-2">
                  <div className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest text-cyan uppercase">Incoming Transmission</span>
               </div>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed pr-2">
                "Greetings. I am the system AI. Query me regarding projects or skills."
              </p>
              {/* Triangle Tail */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-background/90 border-b border-r border-cyan/30 transform rotate-45"></div>
              
              {/* Close Button */}
              <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNotification(false);
                  }} 
                  className="absolute -top-2 -left-2 z-50 bg-background border border-cyan/50 rounded-full p-1 hover:bg-cyan/10 text-cyan transition-colors shadow-md cursor-pointer flex items-center justify-center group"
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
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[550px] max-h-[75vh] flex flex-col rounded-sm overflow-hidden border border-cyan/30 bg-background/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan/20 bg-cyan/5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan" />
                <span className="font-mono text-[11px] tracking-widest text-cyan uppercase">
                  SYS.NET // LINK ESTABLISHED
                </span>
              </div>
              <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-cyan/20" />
                      <div className="w-2 h-2 rounded-full bg-cyan/20" />
                      <div className="w-2 h-2 rounded-full bg-cyan" />
                  </div>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-cyan/20 scrollbar-track-transparent"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                    <span className={`text-[10px] font-mono tracking-wider mb-1 ${msg.role === "user" ? "text-cyan/60" : "text-green/60"}`}>
                        {msg.role === "user" ? "USER.CMD" : "SYS.RESPONSE"}
                    </span>
                  <div
                    className={`max-w-[85%] p-3 rounded-sm text-sm leading-relaxed border ${
                      msg.role === "user"
                        ? "bg-cyan/10 border-cyan/30 text-cyan-100 rounded-tr-none"
                        : "bg-background border-border text-muted-foreground rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap font-sans">{renderMessage(msg.text)}</p>
                  </div>
                </div>
              ))}
              
              {/* Suggested Prompts */}
              {messages.length === 1 && (
                 <div className="flex flex-col gap-2 mt-8 px-1">
                   <div className="flex items-center gap-2 mb-2 opacity-50">
                       <div className="h-px flex-1 bg-cyan/30" />
                       <span className="font-mono text-[10px] text-cyan uppercase">Quick Commands</span>
                       <div className="h-px flex-1 bg-cyan/30" />
                   </div>
                   {suggestions.map((s, i) => (
                     <button
                       key={i}
                       onClick={() => handleSend(s.label)}
                       className="flex items-center gap-3 p-3 rounded-sm border border-dashed border-cyan/20 hover:border-cyan/50 hover:bg-cyan/5 transition-all text-left group"
                     >
                       <span className="text-base filter grayscale group-hover:grayscale-0 transition-all">{s.icon}</span>
                       <span className="text-xs font-mono text-muted-foreground group-hover:text-cyan transition-colors">
                         {s.label}
                       </span>
                     </button>
                   ))}
                 </div>
              )}

              {isLoading && (
                <div className="flex flex-col items-start">
                    <span className="text-[10px] font-mono tracking-wider mb-1 text-green/60">SYS.PROCESSING</span>
                  <div className="bg-background border border-border p-3 rounded-sm rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-cyan animate-spin" />
                    <span className="text-xs font-mono text-cyan animate-pulse">Computing response...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-2 bg-background border-t border-cyan/20">
              <div className="relative flex items-center gap-2 bg-black/30 border border-cyan/30 rounded-sm px-3 py-2 focus-within:border-cyan/70 focus-within:bg-cyan/5 transition-all">
                <span className="text-cyan font-mono">{">"}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter command..."
                  className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-cyan placeholder:text-cyan/30 focus:ring-0"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-1.5 rounded-sm hover:bg-cyan/20 text-cyan disabled:opacity-30 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
               <div className="flex justify-between px-1 mt-1">
                    <span className="text-[9px] font-mono text-cyan/30">SECURE CHANNEL // ENCRYPTED</span>
               </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
