import React from 'react'

export interface ButtonProps {
    text?: string;
    type?: 'default' | 'text';
    link?: string;
    icon?: string;
    contrast?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

export default function Button({
    text,
    type,
    link,
    icon,
    contrast,
    onClick,
    children
} : ButtonProps): JSX.Element {
  const imagePath = icon ? require(`../assets/icons/${icon}.png`) : null;

  return (
    <a className={`button ${type === 'text' ? 'button-text' : ''} ${contrast ? 'button-text-contrast' : ''}`} data-testid='button' onClick={onClick} href={link}>
        {imagePath && <img src={imagePath} alt='icon' />}
        {text && <span>{text}</span>}
        {children}
    </a>
  )
}
