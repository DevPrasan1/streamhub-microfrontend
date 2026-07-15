import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ReviewCard } from '../index';

const meta = {
  title: 'Shared UI/ReviewCard',
  component: ReviewCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockComment = {
  id: 'comment-1',
  productId: 1,
  uid: 'user-999',
  userName: 'AstroLover',
  message: 'This product exceeded my expectations! Highly recommend to everyone.',
  createdAt: new Date(Date.now() - 3600000).toISOString(),
};

export const StandardReview: Story = {
  args: {
    review: mockComment,
    currentUserId: 'user-other',
    onDelete: (id) => console.log('Delete review:', id),
  },
};

export const AuthorReview: Story = {
  args: {
    review: mockComment,
    currentUserId: 'user-999',
    onDelete: (id) => console.log('Delete review:', id),
  },
};
