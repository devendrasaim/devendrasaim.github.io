"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Send, Cpu, Loader2 } from "lucide-react";
import { chatWithGemini } from "../app/actions";

type Message = {
  role: "user" | "model";
  text: string;
};

// ... existing code ...

                        : "bg-zinc-900/80 border-zinc-800 text-amber-50/90 rounded-bl-none border-l-2 border-l-amber-500/50"
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
