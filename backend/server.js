const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const FILES_DIR = path.join(__dirname, 'files');
if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR);
}

// Serve the generated files statically
app.use('/files', express.static(FILES_DIR));

const YT_DLP_PATH = process.env.YT_DLP_PATH || '/Users/aryankumar/Library/Python/3.9/bin/yt-dlp';

// Keep-alive ping to prevent free tier servers (like Render) from sleeping
const PORT = process.env.PORT || 3000;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`;

setInterval(() => {
  const httpModule = SERVER_URL.startsWith('https:') ? require('https') : require('http');
  httpModule.get(SERVER_URL, (res) => {
    console.log(`Keep-alive ping sent to ${SERVER_URL} - Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.log(`Keep-alive ping failed: ${err.message}`);
  });
}, 5 * 60 * 1000); // 5 minutes

app.get('/', (req, res) => {
  res.send('Media Downloader API is running! 🚀');
});

app.post('/api/download', (req, res) => {
  const { url, format } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const id = randomUUID();
  let args = [];
  let expectedFilename = '';

  if (format === 'audio') {
    expectedFilename = `${id}.mp3`;
    args = [
      '-f', 'bestaudio',
      '--extract-audio',
      '--audio-format', 'mp3',
      '--ffmpeg-location', ffmpegPath,
      '--force-ipv4',
      '--extractor-args', 'youtube:player_client=ios,tv',
      '-o', path.join(FILES_DIR, expectedFilename),
      url
    ];
  } else {
    expectedFilename = `${id}.mp4`;
    args = [
      '-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
      '--merge-output-format', 'mp4',
      '--ffmpeg-location', ffmpegPath,
      '--force-ipv4',
      '--extractor-args', 'youtube:player_client=ios,tv',
      '-o', path.join(FILES_DIR, expectedFilename),
      url
    ];
  }

  console.log(`Starting download for ${url} (format: ${format})`);
  
  const process = spawn(YT_DLP_PATH, args);
  let errorOutput = '';

  process.stderr.on('data', (data) => {
    errorOutput += data.toString();
    console.error(`yt-dlp stderr: ${data}`);
  });

  process.stdout.on('data', (data) => {
    console.log(`yt-dlp stdout: ${data}`);
  });

  process.on('close', (code) => {
    if (code === 0) {
      console.log(`Download completed successfully: ${expectedFilename}`);
      
      // Now fetch metadata
      const { exec } = require('child_process');
      exec(`${YT_DLP_PATH} -J --force-ipv4 --extractor-args "youtube:player_client=ios,tv" "${url}"`, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
        let title = "Unknown Title";
        let thumbnail = "https://picsum.photos/seed/picsum/400/225";
        let duration = "Unknown";
        
        if (!err) {
          try {
            const json = JSON.parse(stdout);
            title = json.title || title;
            thumbnail = json.thumbnail || thumbnail;
            duration = json.duration_string || duration;
          } catch (e) {
            console.error('Failed to parse metadata json', e);
          }
        }
        
        // Ensure to return relative path so frontend can construct URL based on its host IP
        res.json({ 
          success: true, 
          url: `/files/${expectedFilename}`, 
          metadata: { title, thumbnail, duration } 
        });
      });
    } else {
      console.error(`Download failed with code ${code}`);
      res.status(500).json({ error: 'Download failed', details: errorOutput });
    }
  });
});

// Mock recommendations database simulating a real YouTube response
const MOCK_RECOMMENDATIONS = [
  { id: '1', title: 'Top 10 Coding Secrets', thumbnail: 'https://picsum.photos/seed/coding/400/225', url: 'https://youtube.com/watch?v=mock1' },
  { id: '2', title: 'Lofi Beats to Study To', thumbnail: 'https://picsum.photos/seed/lofi/400/225', url: 'https://youtube.com/watch?v=mock2' },
  { id: '3', title: 'React Native crash course 2026', thumbnail: 'https://picsum.photos/seed/react/400/225', url: 'https://youtube.com/watch?v=mock3' },
  { id: '4', title: 'Node.js Backend Architecture', thumbnail: 'https://picsum.photos/seed/node/400/225', url: 'https://youtube.com/watch?v=mock4' },
  { id: '5', title: 'Aesthetic UI/UX Design Trends', thumbnail: 'https://picsum.photos/seed/design/400/225', url: 'https://youtube.com/watch?v=mock5' },
];

app.post('/api/recommendations', (req, res) => {
  const { history } = req.body;
  // If history is empty, return a generic list. Otherwise shuffle/filter slightly to simulate logic.
  const count = history && history.length > 0 ? 4 : 3;
  const shuffled = [...MOCK_RECOMMENDATIONS].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  res.json({ success: true, recommendations: selected });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
