import { useState } from "react";
import { uploadDocument } from "../api/uploadDocument";
import { createSession } from "../api/createSession";
import { sendMessage } from "../api/sendMessage";

export function useChatSession() {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const initSession = async (file?: File) => {
    let documentId: number | undefined;

    if (file) {
      const upload = await uploadDocument(file);
      documentId = upload.documentId; // добре
      console.log("Document uploaded");
      console.log(`DocumentID: ${documentId}`);
    }

    const session = await createSession(documentId);
    setSessionId(session.sessionId); // встановлюєш, але ask може викликатися раніше
  };

  const ask = async (content: string) => {
    if (!sessionId) throw new Error("Session not initialized");

    setMessages((m) => [...m, { role: "user", content }]);

    const res = await sendMessage(sessionId, content);

    setMessages((m) => [...m, { role: "assistant", content: res.answer }]);
  };

  return {
    sessionId,
    messages,
    initSession,
    ask,
  };
}
