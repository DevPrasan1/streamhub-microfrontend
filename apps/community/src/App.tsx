import React, { useState, useEffect } from 'react';
import { useAuthStore, usePlayerStore } from '@streamhub/shared-store';
import { Button, CommentCard } from '@streamhub/shared-ui';
import { Comment } from '@streamhub/shared-types';

const MOCK_COMMENTS: Record<string, Comment[]> = {
  nasa: [
    {
      id: 'c1',
      channelId: 'nasa',
      uid: 'user-999',
      userName: 'AstroLover',
      message: 'This live stream from space is absolutely breathtaking!',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'c2',
      channelId: 'nasa',
      uid: 'user-888',
      userName: 'StarGazer',
      message: 'Can\'t wait for the next Artemis launch updates!',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    }
  ],
  france24: [
    {
      id: 'c3',
      channelId: 'france24',
      uid: 'user-777',
      userName: 'NewsBuff',
      message: 'Excellent coverage of global politics.',
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    }
  ]
};

export default function App() {
  const { user } = useAuthStore();
  const { selectedChannel } = usePlayerStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const channelId = selectedChannel?.id || 'default';

  useEffect(() => {
    const list = MOCK_COMMENTS[channelId] || [];
    setComments([...list]);
  }, [channelId]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      channelId,
      uid: user?.uid || 'anonymous',
      userName: user?.displayName || 'Anonymous Viewer',
      message: newCommentText,
      createdAt: new Date().toISOString(),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    
    if (!MOCK_COMMENTS[channelId]) {
      MOCK_COMMENTS[channelId] = [];
    }
    MOCK_COMMENTS[channelId] = [newComment, ...MOCK_COMMENTS[channelId]];

    setNewCommentText('');
  };

  const handleDeleteComment = (id: string) => {
    const updated = comments.filter((c) => c.id !== id);
    setComments(updated);
    MOCK_COMMENTS[channelId] = MOCK_COMMENTS[channelId].filter((c) => c.id !== id);
  };

  const sortedComments = [...comments].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 flex flex-col gap-6 text-zinc-100 h-[600px] overflow-hidden">
      <div className="flex justify-between items-center shrink-0">
        <h3 className="text-lg font-bold">Community Chat ({comments.length})</h3>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
          className="bg-zinc-800 text-zinc-300 border border-zinc-700 rounded px-2 py-1 text-xs focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Add Comment Box */}
      <form onSubmit={handleAddComment} className="flex gap-2 shrink-0">
        <input
          type="text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder={user ? "Add a public comment..." : "Sign in to join the conversation..."}
          disabled={!user}
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition disabled:opacity-50"
        />
        <Button type="submit" disabled={!user || !newCommentText.trim()}>
          Post
        </Button>
      </form>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2 custom-scrollbar">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDelete={handleDeleteComment}
              currentUserId={user?.uid}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-2">
            <span>💬</span>
            <p className="text-xs">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
}
