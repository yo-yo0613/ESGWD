import https from 'https';
import fs from 'fs';
import path from 'path';

const destDir = 'public/images/avatars';
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const list = [
  { name: '陳春山', url: 'https://esgwd.org/wp-content/uploads/2024/06/E%e5%9f%ba%e6%9c%83-%e9%99%b3%e6%98%a5%e5%b1%b1-%e8%91%a3%e4%ba%8b%e9%95%b7_jpeg-1.jpeg', ext: 'jpg' },
  { name: '陳政興', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e5%9f%ba%e9%87%91%e6%9c%83%e5%ae%98%e7%b6%b2%e8%91%a3%e4%ba%8b%e6%9c%83.jpeg', ext: 'jpg' },
  { name: '王文山', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e7%8e%8b%e6%96%87%e5%b1%b1.jpeg', ext: 'jpg' },
  { name: '何子明', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e4%bd%95%e5%ad%90%e6%98%8e.jpeg', ext: 'jpg' },
  { name: '佘日新', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e4%bd%98%e6%97%a5%e6%96%b0.jpeg', ext: 'jpg' },
  { name: '吳明賢', url: 'https://esgwd.org/wp-content/uploads/2024/12/%e5%90%b3%e6%98%8e%e8%b3%a2%e9%99%a2%e9%95%b7-293x300.jpg', ext: 'jpg' },
  { name: '周行一', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e5%91%a8%e8%a1%8c%e4%b8%80.jpeg', ext: 'jpg' },
  { name: '周桂田', url: 'https://esgwd.org/wp-content/uploads/2024/12/%e7%85%a7%e7%89%87_%e5%91%a8%e6%a1%82%e7%94%b0%e6%95%99%e6%8e%882022_0_0-300x300.jpg', ext: 'jpg' },
  { name: '胡元輝', url: 'https://esgwd.org/wp-content/uploads/2024/12/%e8%83%a1%e5%85%83%e8%bc%9d%e8%91%a3%e4%ba%8b%e9%95%b7%e7%85%a7%e7%89%875_0_0-300x300.jpg', ext: 'jpg' },
  { name: '梁又文', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e6%a2%81%e5%8f%88%e6%96%87.jpeg', ext: 'jpg' },
  { name: '楊岳虎', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e5%bb%ba%e7%af%89%e5%9c%98%e9%9a%8a_%e7%92%9e%e6%b0%b8%e6%a5%8a%e5%b2%b3%e8%99%8e.jpeg', ext: 'jpg' },
  { name: '陳孝昌', url: 'https://esgwd.org/wp-content/uploads/2024/09/%e9%99%b3%e5%ad%9d%e6%98%8c%e8%91%a3%e4%ba%8b.jpg', ext: 'jpg' },
  { name: '陳美伶', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e9%99%b3%e7%be%8e%e4%bc%b6.jpeg', ext: 'jpg' },
  { name: '陳雅婕', url: 'https://esgwd.org/wp-content/uploads/2024/12/%e9%99%b3%e9%9b%85%e5%a9%95%e5%9f%b7%e8%a1%8c%e9%95%b7_0_0-300x300.jpg', ext: 'jpg' },
  { name: '潘維大', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e6%bd%98%e7%b6%ad%e5%a4%a7.jpeg', ext: 'jpg' },
  { name: '盧秋玲', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e7%9b%a7%e7%a7%8b%e7%8e%b2.jpeg', ext: 'jpg' },
  { name: '陳進財', url: 'https://esgwd.org/wp-content/uploads/2024/12/%e9%99%b3%e9%80%b2%e8%b2%a1%e5%89%af%e8%91%a3%e4%ba%8b%e9%95%b7-300x300.jpg', ext: 'jpg' },
  { name: '黃士軍', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e9%bb%83%e5%a3%ab%e8%bb%8d%e8%91%a3%e4%ba%8b%e9%95%b7.jpeg', ext: 'jpg' },
  { name: '彭裕民', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e5%bd%ad%e5%89%af.jpeg', ext: 'jpg' },
  { name: '王國雄', url: 'https://esgwd.org/wp-content/uploads/2024/06/%e7%8e%8b%e5%9c%8b%e9%9b%84%e8%91%a3%e4%ba%8b%e9%95%b7.jpeg', ext: 'jpg' },
  { name: '林筠騏', url: 'https://esgwd.org/wp-content/uploads/2025/03/%e6%88%aa%e5%9c%96-2025-03-13-%e4%b8%8b%e5%8d%884.10.44.png', ext: 'png' },
  { name: '許玉青', url: 'https://esgwd.org/wp-content/uploads/2024/10/1653910099696.jpg', ext: 'jpg' },
  { name: '駱怡雯', url: 'https://esgwd.org/wp-content/uploads/2025/08/%e9%a7%b1%e6%80%a1%e9%9b%af-3-scaled.jpg', ext: 'jpg' },
  { name: '黃慧欣', url: 'https://esgwd.org/wp-content/uploads/2026/01/%e6%9c%aa%e5%91%bd%e5%90%8d%e8%a8%ad%e8%a8%88-1.png', ext: 'png' }
];

async function downloadAll() {
  for (const item of list) {
    const filename = `${item.name}.${item.ext}`;
    const filePath = path.join(destDir, filename);
    console.log(`Downloading ${item.name} from ${item.url} -> ${filePath}...`);
    
    await new Promise((resolve) => {
      https.get(item.url, (res) => {
        if (res.statusCode !== 200) {
          console.error(`Failed to download ${item.name}: status code ${res.statusCode}`);
          resolve();
          return;
        }
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Successfully downloaded ${item.name}`);
          resolve();
        });
      }).on('error', (err) => {
        console.error(`Error downloading ${item.name}:`, err);
        resolve();
      });
    });
  }
  console.log("All downloads completed!");
}

downloadAll();
