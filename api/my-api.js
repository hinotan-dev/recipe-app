// This is an example of a Next.js API route that uses an environment variable
export default function handler(req, res) {
  const apiKey = process.env.MY_SECRET_API_KEY;

  // Example: Proxy a request to a third-party API
  fetch('https://api.example.com/data', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then(response => response.json())
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error: 'Failed to fetch data' }));
}