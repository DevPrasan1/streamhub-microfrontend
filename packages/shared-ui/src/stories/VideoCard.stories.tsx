import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from '../index';

const meta = {
  title: 'Shared UI/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description: 'The Essence Mascara Lash Princess is a popular mascara known for its volume and lengthening effects.',
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.82,
  stock: 5,
  brand: 'Essence',
  category: 'beauty',
  thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'],
};

export const Default: Story = {
  args: {
    product: mockProduct,
    onClick: (product) => console.log('Clicked product:', product),
  },
};
