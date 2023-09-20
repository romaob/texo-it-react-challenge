import React from 'react'

export interface ButtonProps {
    text?: string;
    type?: 'default' | 'text';
    link?: string;
    contrast?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

export default function Button({
    text,
    type,
    link,
    contrast,
    onClick,
    children
} : ButtonProps): JSX.Element {
  return (
    <a className={`button ${type === 'text' ? 'button-text' : ''} ${contrast ? 'button-text-contrast' : ''}`} data-testid='button' onClick={onClick} href={link}>
        {text && <span>{text}</span>}
        {children}
    </a>
  )
}
