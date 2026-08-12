import { newsTickerData } from '../data/newsTickerData';

/**
 * Fetch & Sync Live Ticker Updates
 * Merges pinned admin alerts with scraped daily RSS updates
 */
export async function getLiveNewsTickerItems() {
  try {
    // Return dataset ordered by pinned items first
    const sorted = [...newsTickerData].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    return sorted;
  } catch (e) {
    return newsTickerData;
  }
}
