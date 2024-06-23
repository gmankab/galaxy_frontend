import { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';

type Story = StoryObj<typeof Button>;

export const MenuVoiceToggle: Story = {
  args: {
    variant: 'menu',
    intent: 'voice-toggle',
    state: true,
  },
};

export default {
  component: Button,
} satisfies Meta<typeof Button>;
