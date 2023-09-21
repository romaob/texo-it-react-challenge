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
    disabled?: boolean;
    readOnly?: boolean;
    toggled?: boolean;
}

export default function Button({
    text,
    type,
    link,
    icon,
    contrast,
    onClick,
    children,
    testId = 'button',
    disabled,
    readOnly,
    toggled,
} : ButtonProps): JSX.Element {
  const imagePath = icon ? require(`../assets/icons/${icon}.png`) : null;

  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (disabled || readOnly) {
      e.preventDefault();
      return;
    }
    onClick && onClick();
  }

  return (
    <a 
        className={`button ${type === 'text' ? 'button-text' : ''} ${contrast || type === 'default' ? 'button-text-contrast' : ''}`} 
        onClick={handleLinkClick} 
        href={link} 
        data-disabled={disabled}
        data-testid={testId}
        data-readonly={readOnly}
        data-toggled={toggled}
    >
        {imagePath && <img src={imagePath} alt='icon' data-testid='button-icon'/>}
        {text && <span>{text}</span>}
        {children}
    </a>
  )
}
