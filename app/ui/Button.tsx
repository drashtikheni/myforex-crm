'use client';

import React from 'react';

type BaseProps = {
  plain?: boolean;
  compact?: boolean;
  primary?: boolean;
  secondary?: boolean;
  secondaryV2?: boolean;
  scary?: boolean;
  busy?: boolean;
  borderless?: boolean;
  isRound?: boolean;
  primaryOutlined?: boolean;
  className?: string;
  children?: React.ReactNode;
};

// 👉 Button version (no href)
type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

// 👉 Anchor version (requires href)
type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type Props = ButtonProps | AnchorProps;

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>((props, ref) => {
  const {
    plain,
    className = '',
    compact,
    primary,
    secondary,
    secondaryV2,
    scary,
    busy,
    borderless,
    isRound,
    primaryOutlined,
    children,
    ...rest
  } = props;

  let base =
    'inline-block text-center text-sm px-4 py-2 border rounded transition cursor-pointer';

  if (plain) {
    base = 'bg-transparent border-none p-0';
  }

  let variant =
    'bg-white text-gray-700 border-gray-300 hover:border-gray-400';

  if (primary) {
    variant = 'bg-primary text-white hover:bg-primary-100';
  }

  if (secondary) {
    variant = 'bg-gray-200 text-blue-600 border-gray-200';
  }

  if (secondaryV2) {
    variant = 'bg-purple-600 text-white border-purple-600';
  }

  if (scary && !primary) {
    variant = 'text-red-600 border-gray-300';
  }

  if (primary && scary) {
    variant = 'bg-red-600 text-white border-red-600 hover:bg-red-400';
  }

  if (primaryOutlined) {
    variant = 'border-blue-600 text-blue-600 bg-transparent';
  }

  const state = `
    ${compact ? 'px-2 py-1 text-xs' : ''}
    ${isRound ? 'rounded-lg' : ''}
    ${borderless ? 'border-none bg-transparent px-0' : ''}
    ${busy ? 'animate-pulse' : ''}
  `;

  const classes = `${base} ${variant} ${state} ${className}`;

  // ✅ Anchor case (TYPE SAFE)
  if ('href' in props && props.href) {
    const { href, target, rel, ...anchorProps } = rest as AnchorProps;

    const _rel = target
      ? (rel || '').replace(/noopener|noreferrer/g, '') +
        ' noopener noreferrer'
      : rel;

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={_rel}
        className={classes}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  // ✅ Button case (TYPE SAFE)
  const { type = 'button', ...buttonProps } = rest as ButtonProps;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  );
});

export default Button;