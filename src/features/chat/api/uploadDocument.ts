export async function uploadDocument(file: File) {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch(`/api/proxy-chat/upload`, {
    method: 'POST',
    body: form,
  });

  console.log("Uploaded chunks:", form);

  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}
