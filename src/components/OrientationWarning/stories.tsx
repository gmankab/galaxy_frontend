import { Meta, StoryObj } from '@storybook/react';

import { OrientationWarning } from '.';

type Story = StoryObj<typeof OrientationWarning>;

export const Default: Story = {};

export default {
  component: OrientationWarning,
} satisfies Meta<typeof OrientationWarning>;
