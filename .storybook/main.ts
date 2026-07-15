import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../packages/*/src/**/*.mdx',
    '../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../apps/*/src/**/*.mdx',
    '../apps/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@chromatic-com/storybook', '@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-mcp'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
export default config;
