export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { imageUrl } = req.body;
  
    if (!imageUrl) {
      return res.status(400).json({ error: 'Missing imageUrl' });
    }
  
    const webhookUrl = 'https://hooks.mediaflows.cloudinary.com/v3/fb4db44f-1bcd-48ab-bff1-544680af0e25/44d137c9-6632-4957-ae9e-3c001ef7e48d';
  
    try {
      const forwardRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl })
      });
  
      const responseText = await forwardRes.text();
  
      res.status(forwardRes.status).send(responseText);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Proxy error' });
    }
  }
  