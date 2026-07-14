import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore, useUIStore } from '@streamhub/shared-store';
import { VideoCard, Tabs, Dropdown, Spinner } from '@streamhub/shared-ui';
import { Channel } from '@streamhub/shared-types';

const MOCK_CHANNELS: Channel[] = [
  {
    id: 'nasa',
    name: 'NASA TV',
    url: 'https://nasatv-lh.akamaihd.net/i/NASA_101@319270/index_1000_av-p.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg',
    category: 'Science',
    country: 'US',
    language: 'en',
    description: 'NASA TV live streaming channel'
  },
  {
    id: 'france24',
    name: 'France 24 English',
    url: 'https://static.france24.com/live/F24_EN_LO_HLS/live_tv.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/France_24_logo.svg',
    category: 'News',
    country: 'FR',
    language: 'en',
    description: 'France 24 live international news channel'
  },
  {
    id: 'dw',
    name: 'Deutsche Welle English',
    url: 'https://dwstream72-lh.akamaihd.net/i/dwtv_eng@352781/master.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Deutsche_Welle_logo.svg',
    category: 'News',
    country: 'DE',
    language: 'en',
    description: 'Deutsche Welle English language live channel'
  },
  {
    id: 'sky',
    name: 'Sky News UK',
    url: 'https://sky-news.akamaihd.net/i/skynews_1@39281/master.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Sky_News_logo_2018.svg',
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
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const handleChannelClick = (channel: Channel) => {
    setSelectedChannel(channel);
    if (navigate) {
      navigate(`/watch/${channel.id}`);
    } else {
      alert(`Playing channel: ${channel.name} (Standalone Mode)`);
    }
  };

  const categories = ['All', 'Science', 'News', 'Entertainment'];
  const countries = ['All', 'US', 'FR', 'DE', 'GB'];

  const filteredChannels = MOCK_CHANNELS.filter((channel) => {
    const matchesSearch = searchQuery
      ? channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = activeCategory === 'All' || channel.category === activeCategory;
    const matchesCountry = selectedCountry === 'All' || channel.country === selectedCountry;
    return matchesSearch && matchesCategory && matchesCountry;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
        <Tabs
          tabs={categories.map((c) => ({ id: c, label: c }))}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>Country:</span>
          <Dropdown
            label={selectedCountry === 'All' ? 'Select Country' : selectedCountry}
          >
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
          </Dropdown>
        </div>
      </div>

      {/* Channels Grid */}
      {filteredChannels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredChannels.map((channel) => (
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
    </div>
  );
}
