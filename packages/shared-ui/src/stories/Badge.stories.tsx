import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';

const meta = {
  title: 'Shared UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Active',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Offline',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Completed',
  },
};
