// api/subscribe.js  —  Vercel Serverless Function
// Requires: @vercel/kv (set up in Vercel dashboard → Storage → KV)

const { kv } = require('@vercel/kv');

const TELEGRAM_TOKEN  = '8569696783:AAGZ49-3aBDXqEiKQc7KyUpQeSviPWSUw2c';
const TELEGRAM_CHATID = '-1002843633996';

async function sendTelegram(text) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        chat_id   : TELEGRAM_CHATID,
        text,
        parse_mode: 'Markdown',
      }),
    });
  } catch (e) {
    console.error('Telegram error:', e.message);
  }
}

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email } = req.body || {};

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    const clean = email.toLowerCase().trim();

    // Duplicate check
    const exists = await kv.sismember('tc:subs', clean);
    if (exists) {
      const total = await kv.scard('tc:subs');
      return res.status(200).json({ message: 'Already subscribed', alreadyExists: true, total });
    }

    // Store subscriber
    await kv.sadd('tc:subs', clean);
    const total = await kv.scard('tc:subs');

    // Telegram notification
    const tgMsg =
      `🔔 *New Subscriber — Techofy Clouds!*\n\n` +
      `📧 *Email:* \`${clean}\`\n` +
      `👥 *Total Subscribers:* *${total}*\n\n` +
      `🚀 _Coming Soon page — techofyclouds.com_`;

    await sendTelegram(tgMsg);

    return res.status(200).json({ message: 'Subscribed successfully', total });

  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
