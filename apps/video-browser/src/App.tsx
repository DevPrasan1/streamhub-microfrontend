import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore, useUIStore } from '@streamhub/shared-store';
import { VideoCard, Tabs, Dropdown, Spinner } from '@streamhub/shared-ui';
import { Channel } from '@streamhub/shared-types';

const MOCK_CHANNELS: Channel[] = [
  {
    id: 'nasa',
    name: 'NASA TV',
    url: 'https://nasatv-lh.akamaihd.net/i/NASA_101@319270/index_1000_av-p.m3u8',
    logo: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=600&q=80',
    category: 'Science',
    country: 'US',
    language: 'en',
    description: 'NASA TV live streaming channel'
  },
  {
    id: 'france24',
    name: 'France 24 English',
    url: 'https://static.france24.com/live/F24_EN_LO_HLS/live_tv.m3u8',
    logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
    category: 'News',
    country: 'FR',
    language: 'en',
    description: 'France 24 live international news channel'
  },
  {
    id: 'dw',
    name: 'Deutsche Welle English',
    url: 'https://dwstream72-lh.akamaihd.net/i/dwtv_eng@352781/master.m3u8',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    category: 'News',
    country: 'DE',
    language: 'en',
    description: 'Deutsche Welle English language live channel'
  },
  {
    id: 'sky',
    name: 'Sky News UK',
    url: 'https://sky-news.akamaihd.net/i/skynews_1@39281/master.m3u8',
    logo: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=600&q=80',
    category: 'News',
    country: 'GB',
    language: 'en',
    description: 'Sky News UK live channel'
  }
];

export default function App() {
  let navigate: any;
  try {
    navigate = useNavigate();
  } catch {
    navigate = null;
  }

  const { setSelectedChannel } = usePlayerStore();
  const { searchQuery } = useUIStore();

  const [channels, setChannels] = useState<Channel[]>(MOCK_CHANNELS);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // 4 columns x 4 rows layout

  useEffect(() => {
    const loadApiData = async () => {
      try {
        setLoading(true);
        // Fetch streams
        const streamsRes = await fetch('https://iptv-org.github.io/api/streams.json');
        if (!streamsRes.ok) throw new Error('Failed to load streams');
        const streams = await streamsRes.json();

        // Fetch channels
        const channelsRes = await fetch('https://iptv-org.github.io/api/channels.json');
        if (!channelsRes.ok) throw new Error('Failed to load channels');
        const channelsData = await channelsRes.json();

        // Fetch logos
        const logosRes = await fetch('https://iptv-org.github.io/api/logos.json');
        const logos = logosRes.ok ? await logosRes.json() : [];

        // Build lookup maps
        const channelMap = new Map();
        channelsData.forEach((ch: any) => {
          channelMap.set(ch.id, ch);
        });

        const logoMap = new Map();
        logos.forEach((l: any) => {
          logoMap.set(l.channel, l.url);
        });

        const merged: Channel[] = [];
        for (const s of streams) {
          if (!s.channel || !s.url) continue;
          const ch = channelMap.get(s.channel);
          if (ch) {
            // Dynamic fallback logos
            const unsplashKeywords: Record<string, string> = {
              science: 'space',
              news: 'newsroom',
              movies: 'cinema',
              sports: 'stadium',
              music: 'concert'
            };
            const cat = ch.categories?.[0]?.toLowerCase() || 'general';
            const kw = unsplashKeywords[cat] || 'television';
            const defaultLogo = `https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=600&q=80`;

            merged.push({
              id: ch.id,
              name: ch.name,
              url: s.url,
              logo: logoMap.get(ch.id) || defaultLogo,
              category: ch.categories?.[0] ? ch.categories[0].charAt(0).toUpperCase() + ch.categories[0].slice(1) : 'General',
              country: ch.country || 'Global',
              language: ch.languages?.[0] || 'en',
              description: ch.website || ''
            });
          }
        }

        if (merged.length > 0) {
          // Prepend NASA and main mocks for stability
          const existingIds = new Set(merged.map(c => c.id));
          const withMocks = [
            ...MOCK_CHANNELS.filter(m => !existingIds.has(m.id)),
            ...merged
          ];
          setChannels(withMocks);
        }
      } catch (err) {
        console.warn('IPTV-org API load failed. Using offline fallback mocks.', err);
        setChannels(MOCK_CHANNELS);
      } finally {
        setLoading(false);
      }
    };

    loadApiData();
  }, []);

  const handleChannelClick = (channel: Channel) => {
    setSelectedChannel(channel);
    if (navigate) {
      navigate(`/watch/${channel.id}`);
    } else {
      alert(`Playing channel: ${channel.name} (Standalone Mode)`);
    }
  };

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, selectedCountry]);

  // Extract categories dynamically from currently loaded channels
  const categories = ['All', ...Array.from(new Set(channels.map((c) => c.category).filter(Boolean))).sort()];
  
  // Extract countries dynamically from currently loaded channels
  const countries = ['All', ...Array.from(new Set(channels.map((c) => c.country).filter(Boolean))).sort()];

  const filteredChannels = channels.filter((channel) => {
    const matchesSearch = searchQuery
      ? channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = activeCategory === 'All' || channel.category === activeCategory;
    const matchesCountry = selectedCountry === 'All' || channel.country === selectedCountry;
    return matchesSearch && matchesCategory && matchesCountry;
  });

  // Calculate pagination coordinates
  const totalPages = Math.ceil(filteredChannels.length / itemsPerPage);
  const paginatedChannels = filteredChannels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
        <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar scroll-smooth">
          <Tabs
            tabs={categories.map((c) => ({ id: c, label: c }))}
            activeTab={activeCategory}
            onChange={setActiveCategory}
            className="flex-nowrap border-b-0 whitespace-nowrap overflow-x-auto"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-400 shrink-0">
          <span>Country:</span>
          <Dropdown
            label={selectedCountry === 'All' ? 'Select Country' : selectedCountry}
          >
            <div className="max-h-60 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-zinc-800 hover:text-zinc-100 transition ${
                    selectedCountry === country ? 'text-indigo-400 font-semibold' : 'text-zinc-300'
                  }`}
                >
                  {country === 'All' ? 'All Countries' : country}
                </button>
              ))}
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Channels Grid */}
      {loading ? (
        <div className="flex justify-center p-12">
          <Spinner />
        </div>
      ) : paginatedChannels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedChannels.map((channel) => (
            <VideoCard
              key={channel.id}
              channel={channel}
              onClick={handleChannelClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-zinc-500 border border-zinc-800 border-dashed rounded-xl">
          No channels match your filters.
        </div>
      )}

      {/* Pagination Bar */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 bg-zinc-900/40 px-6 py-4 rounded-xl border border-zinc-800">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
          >
            ← Previous
          </button>

          <span className="text-sm font-medium text-zinc-400 text-center">
            Page <span className="text-zinc-200">{currentPage}</span> of <span className="text-zinc-200">{totalPages}</span>
            <span className="hidden sm:inline"> ({filteredChannels.length} channels total)</span>
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
