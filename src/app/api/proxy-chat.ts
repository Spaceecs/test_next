import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${req.url}`, {
      method: req.method,
      headers: req.headers as Record<string, string>,
      body: req.body ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    res.status(500).json({ error: message });
  }
}
