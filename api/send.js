export const config = {
    api: {
      bodyParser: true,
    },
  };
  
  export default async function handler(req, res) {
    // Set CORS headers early
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    // Handle preflight
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { imageUrl } = req.body;
  
    if (!imageUrl) {
      return res.status(400).json({ error: 'Missing imageUrl' });
    }
  
    const webhookUrl = 'https://hooks.mediaflows.cloudinary.com/v3/fb4db44f-1bcd-48ab-bff1-544680af0e25/44d137c9-6632-4957-ae9e-3c001ef7e48d';
  
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
  
      const text = await response.text();
      res.status(response.status).send(text);
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ error: 'Proxy error' });
    }
  }
  

