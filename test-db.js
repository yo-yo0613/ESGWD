import https from 'https';

https.get('https://esgwd.org/%e5%9c%98%e9%9a%8a%e5%a4%a5%e4%bc%b4/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log("=== Raw HTML Search ===");
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = imgRegex.exec(data)) !== null) {
      console.log("Found IMG URL:", match[1]);
    }
  });
}).on('error', (err) => {
  console.error("Error fetching team page:", err);
});
