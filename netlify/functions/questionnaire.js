const fs = require('fs');
const path = '/tmp/questionnaire.json';

exports.handler = async (event) => {
  if (event.httpMethod === 'GET') {
    if (fs.existsSync(path)) {
      const data = fs.readFileSync(path, 'utf8');
      return {
        statusCode: 200,
        body: data,
      };
    } else {
      return {
        statusCode: 200,
        body: '{}',
      };
    }
  }
  if (event.httpMethod === 'POST') {
    fs.writeFileSync(path, event.body);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Salvato!' }),
    };
  }
  return { statusCode: 405, body: 'Method Not Allowed' };
}; 