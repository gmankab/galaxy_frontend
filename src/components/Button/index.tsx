import { ButtonHTMLAttributes } from 'react';
import { VariantProps, cva } from 'cva';

import css from './styles.module.css';
import top from './top.module.css';
import menu from './menu.module.css';

const topButton = cva({
  base: [css.base, top.base],
  variants: {
    intent: {
      menu: top.menu,
      shop: top.shop,
      gift: top.gift,
      clans: top.clans,
    },
    state: {
      true: top.on,
      false: top.off,
    },
  },
});

const menuButton = cva({
  base: [css.base, menu.base],
  variants: {
    intent: {
      'voice-toggle': menu.voiceToggle,
      'connect-twitter': menu.connectTwitter,
      'connect-wallet': menu.connectWallet,
    },
    state: {
      true: menu.on,
      false: menu.off,
    },
  },
});

const variants = {
  top: topButton,
  menu: menuButton,
};

export type ButtonTypes = keyof typeof variants;

export type ButtonCn<Type extends ButtonTypes> = typeof variants[Type];

export type ButtonVariant<Type extends ButtonTypes> = VariantProps<ButtonCn<Type>>;

export type ButtonProps<Type extends ButtonTypes> = {}
  & { variant: Type }
  & ButtonVariant<Type>
  & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button<Type extends ButtonTypes>({
  type = 'button',
  className,

  variant,
  intent,
  state,
  ...props
}: ButtonProps<Type>) {
  const cn = variants[variant] as ButtonCn<Type>;

  return (
    <button
      type={type}
      className={cn({
        // @ts-expect-error TODO
        intent,
        state,
        className,
      })}
      {...props}
    />
  );
}
