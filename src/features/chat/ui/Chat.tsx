"use client";

import { useState } from "react";
import { useChatSession } from "../model/useChatSession";

export default function Chat() {
  const { sessionId, messages, initSession, ask } = useChatSession();
  const [file, setFile] = useState<File | null>(null);
  const [input, setInput] = useState("");

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-xl flex flex-col gap-4 font-sans">
      <h2 className="text-2xl font-bold text-center">Document Chat</h2>

      {/* Upload */}
      <div className="flex gap-3 items-center">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={() => initSession(file ?? undefined)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Start Chat
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex flex-col gap-3 h-80 overflow-y-auto p-3 border rounded bg-black text-white">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-lg break-words ${
              m.role === "user"
                ? "self-end bg-gray-800 text-white"
                : "self-start bg-gray-700 text-white"
            }`}
          >
            <span className="font-semibold">{m.role}:</span> {m.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 border rounded p-2 resize-none"
          rows={3}
        />
        <button
          onClick={() => {
            ask(input);
            setInput("");
          }}
          disabled={!sessionId || !input.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
