import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Shared UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    name: { control: 'text' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    name: 'Jane Doe',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
  },
};

export const WithInitials: Story = {
  args: {
    name: 'Akshay Kumar',
  },
};

export const EmptyName: Story = {
  args: {
    name: '',
  },
};
