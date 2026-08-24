import type { DownloadItem, RecommendedVideo, VideoCategory } from '@/types';

// Curated pool of high-quality YouTube media with authentic video IDs and HD thumbnails
export const MEDIA_CATALOG: RecommendedVideo[] = [
  // Lo-Fi & Chill
  {
    id: 'jfKfPfyJRdk',
    title: 'lofi hip hop radio - beats to relax/study to',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
    author: 'Lofi Girl',
    duration: 'Live / 3:45:00',
    views: '68M views',
    category: 'Lo-Fi & Chill',
    tags: ['lofi', 'chill', 'beats', 'study', 'relax', 'focus', 'instrumental', 'music'],
  },
  {
    id: '5yx6BWlEVcY',
    title: 'Chillhop Radio - jazzy & lofi hip hop beats',
    url: 'https://www.youtube.com/watch?v=5yx6BWlEVcY',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    author: 'Chillhop Music',
    duration: '2:15:30',
    views: '12M views',
    category: 'Lo-Fi & Chill',
    tags: ['chillhop', 'jazz', 'lofi', 'coffee', 'autumn', 'beats', 'study'],
  },
  {
    id: 'DWcJFNfaw9c',
    title: 'synthwave radio - chill synth / retro beats',
    url: 'https://www.youtube.com/watch?v=DWcJFNfaw9c',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    author: 'Lofi Girl Synthwave',
    duration: '1:45:20',
    views: '8.4M views',
    category: 'Lo-Fi & Chill',
    tags: ['synthwave', 'retrowave', 'cyberpunk', 'chill', 'night drive', 'electronic'],
  },

  // Tech & AI
  {
    id: 'aircAruvnKk',
    title: 'Neural Networks from Scratch - Deep Learning Explained',
    url: 'https://www.youtube.com/watch?v=aircAruvnKk',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    author: '3Blue1Brown',
    duration: '19:13',
    views: '14.2M views',
    category: 'Tech & AI',
    tags: ['ai', 'neural networks', 'deep learning', 'machine learning', 'math', 'tech'],
  },
  {
    id: 'Mde2q7GFCrw',
    title: 'The AI Revolution: What Just Happened?',
    url: 'https://www.youtube.com/watch?v=Mde2q7GFCrw',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    author: 'ColdFusion',
    duration: '22:45',
    views: '3.1M views',
    category: 'Tech & AI',
    tags: ['ai', 'future', 'robotics', 'technology', 'openai', 'gemini', 'innovation'],
  },
  {
    id: 'kCc8FmEb1nY',
    title: 'Building Autonomous Agents in 2026: Complete Guide',
    url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
    author: 'AI Explained',
    duration: '28:10',
    views: '940K views',
    category: 'Tech & AI',
    tags: ['ai', 'agent', 'automation', 'coding', 'llm', 'anthropic', 'google'],
  },

  // Coding & Development
  {
    id: 'fBNz5xF-Kx4',
    title: 'React 19 & Next.js Full Stack Masterclass',
    url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    author: 'Web Dev Simplified',
    duration: '42:15',
    views: '1.8M views',
    category: 'Coding',
    tags: ['coding', 'react', 'javascript', 'typescript', 'frontend', 'web development'],
  },
  {
    id: 'e-ORhEE9VVg',
    title: 'TypeScript Crash Course 2026 for Beginners to Advanced',
    url: 'https://www.youtube.com/watch?v=e-ORhEE9VVg',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    author: 'Traversy Media',
    duration: '1:14:02',
    views: '2.5M views',
    category: 'Coding',
    tags: ['typescript', 'javascript', 'coding', 'programming', 'software engineering'],
  },
  {
    id: 'Z1BCujX3pw8',
    title: 'Build a Full Mobile App with React Native & Expo in 1 Hour',
    url: 'https://www.youtube.com/watch?v=Z1BCujX3pw8',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    author: 'Fireship',
    duration: '12:08',
    views: '1.2M views',
    category: 'Coding',
    tags: ['mobile', 'react native', 'expo', 'ios', 'android', 'coding', 'app'],
  },

  // Music
  {
    id: 'kJQP7kiw5Fk',
    title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    author: 'Luis Fonsi',
    duration: '4:41',
    views: '8.4B views',
    category: 'Music',
    tags: ['music', 'pop', 'latin', 'hits', 'summer', 'audio', 'song'],
  },
  {
    id: 'OPf0YbXqDm0',
    title: 'Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars',
    url: 'https://www.youtube.com/watch?v=OPf0YbXqDm0',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    author: 'Mark Ronson',
    duration: '4:30',
    views: '5.1B views',
    category: 'Music',
    tags: ['music', 'funk', 'pop', 'dance', 'bruno mars', 'song'],
  },
  {
    id: 'hT_nvWreIhg',
    title: 'OneRepublic - Counting Stars (Official Music Video)',
    url: 'https://www.youtube.com/watch?v=hT_nvWreIhg',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80',
    author: 'OneRepublic',
    duration: '4:43',
    views: '4.0B views',
    category: 'Music',
    tags: ['music', 'pop rock', 'onerepublic', 'acoustic', 'hits'],
  },

  // Nature & 4K Relaxation
  {
    id: 'LXb3EKWsInQ',
    title: 'Costa Rica in 4K 60fps HDR (Ultra HD) With Calming Music',
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    author: 'Jacob + Katie Schwarz',
    duration: '5:18',
    views: '41M views',
    category: 'Nature & 4K',
    tags: ['nature', '4k', 'hdr', 'relaxing', 'travel', 'cinematic', 'wildlife'],
  },
  {
    id: '1ZYbU8JGB4A',
    title: 'Relaxing Campfire with Rain Sound - 4K Cozy Ambience',
    url: 'https://www.youtube.com/watch?v=1ZYbU8JGB4A',
    thumbnail: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&auto=format&fit=crop&q=80',
    author: 'Calm River Studio',
    duration: '3:00:00',
    views: '18M views',
    category: 'Nature & 4K',
    tags: ['rain', 'campfire', 'nature', 'sleep', 'relax', 'ambience', 'cozy'],
  },

  // Podcasts & Documentaries
  {
    id: 'k9zTr2MAo4U',
    title: 'Sam Altman: OpenAI, GPT-5, AGI, and Future of Intelligence',
    url: 'https://www.youtube.com/watch?v=k9zTr2MAo4U',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
    author: 'Lex Fridman Podcast',
    duration: '2:15:40',
    views: '4.8M views',
    category: 'Podcasts',
    tags: ['podcast', 'ai', 'sam altman', 'lex fridman', 'tech', 'future', 'interview'],
  },
  {
    id: 'YgU2aKeqtZg',
    title: 'The Psychology of Focus & Deep Work - Dr. Andrew Huberman',
    url: 'https://www.youtube.com/watch?v=YgU2aKeqtZg',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
    author: 'Huberman Lab',
    duration: '1:58:30',
    views: '6.2M views',
    category: 'Podcasts',
    tags: ['huberman', 'health', 'focus', 'neuroscience', 'productivity', 'podcast'],
  },

  // Gaming
  {
    id: 'Wb5uC3_z8eE',
    title: 'GTA 6 Next-Gen Unreal Engine 5 Gameplay Breakdown',
    url: 'https://www.youtube.com/watch?v=Wb5uC3_z8eE',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    author: 'IGN Games',
    duration: '15:24',
    views: '8.9M views',
    category: 'Gaming',
    tags: ['gaming', 'gta6', 'playstation', 'gameplay', 'trailer', 'review'],
  },
];

const STOP_WORDS = new Set([
  'the', 'and', 'with', 'from', 'this', 'that', 'for', 'you', 'your',
  'video', 'watch', 'official', 'full', 'hd', 'youtube', 'com', 'http', 'https',
]);

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

/**
 * Recommendation Algorithm that scores items based on history
 */
export function getRecommendedVideos(
  history: DownloadItem[],
  selectedCategory: VideoCategory = 'All',
  limit: number = 8,
): RecommendedVideo[] {
  if (history.length === 0) {
    const list = selectedCategory === 'All'
      ? MEDIA_CATALOG
      : MEDIA_CATALOG.filter((item) => item.category === selectedCategory);

    return list.slice(0, limit).map((v) => ({
      ...v,
      matchReason: '🔥 Trending YouTube Pick',
      matchScore: 94,
    }));
  }

  // 1. Build profile from recent downloads
  const downloadedUrls = new Set(history.map((h) => h.url));
  const categoryFreq: Record<string, number> = {};
  const userKeywordFreq: Record<string, number> = {};
  const channelFreq: Record<string, number> = {};

  history.forEach((item, index) => {
    const weight = Math.max(0.4, 1 - index * 0.15);

    if (item.category) {
      categoryFreq[item.category] = (categoryFreq[item.category] || 0) + 3 * weight;
    }

    if (item.author) {
      channelFreq[item.author.toLowerCase()] = (channelFreq[item.author.toLowerCase()] || 0) + 4 * weight;
    }

    const titleKeywords = extractKeywords(item.title || item.url);
    titleKeywords.forEach((kw) => {
      userKeywordFreq[kw] = (userKeywordFreq[kw] || 0) + 1.5 * weight;
    });

    const lower = (item.title || item.url).toLowerCase();
    if (lower.includes('lofi') || lower.includes('chill') || lower.includes('relax') || lower.includes('sleep') || lower.includes('study')) {
      categoryFreq['Lo-Fi & Chill'] = (categoryFreq['Lo-Fi & Chill'] || 0) + 2.5 * weight;
    } else if (lower.includes('code') || lower.includes('react') || lower.includes('script') || lower.includes('programming') || lower.includes('typescript')) {
      categoryFreq['Coding'] = (categoryFreq['Coding'] || 0) + 2.5 * weight;
    } else if (lower.includes('ai') || lower.includes('gpt') || lower.includes('tech') || lower.includes('neural') || lower.includes('model')) {
      categoryFreq['Tech & AI'] = (categoryFreq['Tech & AI'] || 0) + 2.5 * weight;
    } else if (lower.includes('song') || lower.includes('music') || lower.includes('feat') || lower.includes('audio') || lower.includes('pop') || lower.includes('ft')) {
      categoryFreq['Music'] = (categoryFreq['Music'] || 0) + 2.5 * weight;
    } else if (lower.includes('podcast') || lower.includes('talk') || lower.includes('interview') || lower.includes('altman') || lower.includes('huberman')) {
      categoryFreq['Podcasts'] = (categoryFreq['Podcasts'] || 0) + 2.5 * weight;
    } else if (lower.includes('4k') || lower.includes('nature') || lower.includes('rain') || lower.includes('forest') || lower.includes('ambience')) {
      categoryFreq['Nature & 4K'] = (categoryFreq['Nature & 4K'] || 0) + 2.5 * weight;
    } else if (lower.includes('game') || lower.includes('gameplay') || lower.includes('gta') || lower.includes('playstation')) {
      categoryFreq['Gaming'] = (categoryFreq['Gaming'] || 0) + 2.5 * weight;
    }
  });

  const mostRecent = history[0];

  // 2. Score catalog videos
  const scored = MEDIA_CATALOG.map((video) => {
    const isDownloaded = downloadedUrls.has(video.url);

    let score = 50;
    let reason = 'Recommended for you';

    const catScore = categoryFreq[video.category] || 0;
    score += catScore * 8;

    const chanScore = channelFreq[video.author.toLowerCase()] || 0;
    score += chanScore * 10;

    const matchedKeywords: string[] = [];
    video.tags.forEach((tag) => {
      if (userKeywordFreq[tag]) {
        score += userKeywordFreq[tag] * 6;
        matchedKeywords.push(tag);
      }
    });

    if (mostRecent && mostRecent.category === video.category) {
      reason = `⚡ Based on your recent ${video.category} download`;
      score += 18;
    } else if (chanScore > 0) {
      reason = `✨ More from ${video.author}`;
    } else if (matchedKeywords.length > 0) {
      reason = `🎯 Matches "${matchedKeywords[0]}" from your downloads`;
    } else if (catScore > 0) {
      reason = `💡 Top pick in ${video.category}`;
    }

    const normalizedScore = Math.min(99, Math.max(81, Math.round(score)));

    return {
      ...video,
      matchReason: reason,
      matchScore: normalizedScore,
      _alreadyDownloaded: isDownloaded,
    };
  });

  let filtered = scored;
  if (selectedCategory !== 'All') {
    filtered = scored.filter((v) => v.category === selectedCategory);
  }

  filtered.sort((a, b) => {
    if (a._alreadyDownloaded && !b._alreadyDownloaded) return 1;
    if (!a._alreadyDownloaded && b._alreadyDownloaded) return -1;
    return (b.matchScore || 0) - (a.matchScore || 0);
  });

  return filtered.slice(0, limit);
}

export const SAMPLE_MEDIA_URLS = [
  {
    title: 'Lofi Hip Hop Radio (Beats to Study)',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    category: 'Lo-Fi & Chill' as VideoCategory,
    badge: '🎵 Lo-Fi',
  },
  {
    title: 'Neural Networks (Tech / Deep Learning)',
    url: 'https://www.youtube.com/watch?v=aircAruvnKk',
    category: 'Tech & AI' as VideoCategory,
    badge: '🤖 AI & Tech',
  },
  {
    title: 'TypeScript Masterclass (Coding)',
    url: 'https://www.youtube.com/watch?v=e-ORhEE9VVg',
    category: 'Coding' as VideoCategory,
    badge: '💻 Coding',
  },
  {
    title: 'Costa Rica 4K Nature Relaxation',
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    category: 'Nature & 4K' as VideoCategory,
    badge: '🌿 4K Nature',
  },
];
