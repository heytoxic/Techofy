// api/count.js  —  Vercel Serverless Function
// Returns total subscriber count from Vercel KV

const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const total = await kv.scard('tc:subs');
    return res.status(200).json({ total: total || 0 });
  } catch (err) {
    console.error('Count error:', err);
    return res.status(500).json({ error: 'Failed to fetch count', total: 0 });
  }
};
