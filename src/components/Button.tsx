import React from 'react'

export interface ButtonProps {
    text?: string;
    type?: 'default' | 'text';
    link?: string;
    icon?: string;
    contrast?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    testId?: string;
}

export default function Button({
    text,
    type,
    link,
    icon,
    contrast,
    onClick,
    children,
    testId = 'button'
} : ButtonProps): JSX.Element {
  const imagePath = icon ? require(`../assets/icons/${icon}.png`) : null;

  return (
    <a 
        className={`button ${type === 'text' ? 'button-text' : ''} ${contrast ? 'button-text-contrast' : ''}`} 
        onClick={onClick} 
        href={link} 
        data-testid={testId}
    >
        {imagePath && <img src={imagePath} alt='icon' data-testid='button-icon'/>}
        {text && <span>{text}</span>}
        {children}
    </a>
  )
}
