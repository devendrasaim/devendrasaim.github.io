const https = require('https');

// Read key from .env.local manually since we aren't in Next.js context
const fs = require('fs');
const path = require('path');

try {
  const envPath = path.resolve(__dirname, '../.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/GEMINI_API_KEY=(.*)/);
  
  if (!match) {
    console.error("Could not find GEMINI_API_KEY in .env.local");
    process.exit(1);
  }
  
  const apiKey = match[1].trim();
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  console.log("Querying Gemini API for available models...");

  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        if (response.error) {
          console.error("API Error:", response.error);
        } else {
          console.log("\nAvailable Models:");
          response.models.forEach(m => {
             if (m.name.includes('gemini')) {
                console.log(`- ${m.name.replace('models/', '')} (${m.supportedGenerationMethods.join(', ')})`);
             }
          });
        }
      } catch (e) {
        console.error("Failed to parse response:", e);
      }
    });
  }).on('error', (e) => {
    console.error("Request Error:", e);
  });

} catch (e) {
  console.error("Error reading .env.local:", e);
}
