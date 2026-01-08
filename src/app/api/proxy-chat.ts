export default async function handler(req, res) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${req.url}`, {
    method: req.method,
    headers: req.headers,
    body: req.body ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
