const https = require('https');

// URL del file JSON su GitHub (raw content)
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/Prohibilia/HiddenDesire/main/netlify/functions/votes.json';
const GITHUB_API_URL = 'https://api.github.com/repos/Prohibilia/HiddenDesire/contents/netlify/functions/votes.json';

// Funzione per leggere il file da GitHub
function fetchFromGitHub() {
  return new Promise((resolve, reject) => {
    https.get(GITHUB_RAW_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Funzione per aggiornare il file su GitHub
function updateOnGitHub(content, sha) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: '/repos/Prohibilia/HiddenDesire/contents/netlify/functions/votes.json',
      method: 'PUT',
      headers: {
        'User-Agent': 'Netlify Function',
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });

    req.write(JSON.stringify({
      message: 'Update votes.json',
      content: Buffer.from(content).toString('base64'),
      sha: sha
    }));
    req.end();
  });
}

exports.handler = async function(event, context) {
  if (event.httpMethod === 'GET') {
    try {
      const data = await fetchFromGitHub();
      return {
        statusCode: 200,
        body: data,
        headers: { 'Content-Type': 'application/json' },
      };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      // Prima otteniamo lo SHA del file corrente
      const shaResponse = await new Promise((resolve, reject) => {
        https.get(GITHUB_API_URL, {
          headers: {
            'User-Agent': 'Netlify Function',
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          }
        }, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => resolve(JSON.parse(data)));
          res.on('error', reject);
        }).on('error', reject);
      });

      // Poi aggiorniamo il file
      await updateOnGitHub(event.body, shaResponse.sha);
      
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true }),
        headers: { 'Content-Type': 'application/json' },
      };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
}; 