import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CommentCard } from '../index';

const meta = {
  title: 'Shared UI/CommentCard',
  component: CommentCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockComment = {
  id: 'comment-1',
  channelId: 'Fl6HC6dMqHc',
  uid: 'user-999',
  userName: 'AstroLover',
  message: 'Nana Patekar is absolute comedy gold in this movie! Best scene ever.',
  createdAt: new Date(Date.now() - 3600000).toISOString(),
};

export const StandardComment: Story = {
  args: {
    comment: mockComment,
    currentUserId: 'user-other',
    onDelete: (id) => console.log('Delete comment:', id),
  },
};

export const AuthorComment: Story = {
  args: {
    comment: mockComment,
    currentUserId: 'user-999', // Matches author uid, showing the delete option
    onDelete: (id) => console.log('Delete comment:', id),
  },
};
