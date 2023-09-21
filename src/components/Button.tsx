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
/**
 * Main button component
 * @prop {string} text - The text to be displayed on the button
 * @prop {string} type - The type of the button default or text
 * @prop {string} link - The link to be followed when the button is clicked
 * @prop {string} icon - The icon to be displayed on the button
 * @prop {boolean} contrast - If the button text should be displayed with contrast color
 * @prop {function} onClick - The function to be called when the button is clicked
 * @prop {React.ReactNode} children - The children to be displayed on the button
 * @prop {string} testId - The test id to be used on the tests
 * @prop {boolean} disabled - If the button should be disabled
 * @prop {boolean} readOnly - If the button should be read only
 * @prop {boolean} toggled - If the button should be toggled state, showing a different background color (useful for check buttons)
 * @returns JSX.Element
 */
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
