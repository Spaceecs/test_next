export async function createSession(documentId?: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ documentId }),
  });

  if (!res.ok) throw new Error('Session failed');
  return res.json();
}
