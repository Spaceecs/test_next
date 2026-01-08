export async function sendMessage(sessionId: number, question: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, question }),
  });

  if (!res.ok) throw new Error('Message failed');
  return res.json();
}
