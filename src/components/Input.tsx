import React from 'react';

export interface InputProps {
  value?: string;
  label?: string;
  type?: string;
  error?: string;
  onChange?: (value: string) => void;
  testId?: string;
  disabled?: boolean;
  flex?: boolean;
}
/**
 * Input component, with the base design and functionality
 * @prop {string} value - The value of the input
 * @prop {string} label - The label of the input
 * @prop {string} type - The type of the input
 * @prop {string} error - The error message to be displayed
 * @prop {function} onChange - The function to be called when the input value changes
 * @prop {string} testId - The test id to be used on the tests
 * @prop {boolean} disabled - If the input is disabled
 * @prop {boolean} flex - If the input should be displayed as flex
 * @returns JSX.Element
 */
export default function Input({
  value,
  label,
  type = 'text',
  error = '',
  onChange,
  disabled,
  flex,
  testId = 'input',
}: InputProps): JSX.Element {
  return (
    <div
      className="input"
      data-disabled={disabled}
      data-flex={flex}
      data-testid={testId}
    >
      {label && <label className="input-label">{label}</label>}
      <input
        className="input-field"
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        data-error={!!error}
        disabled={disabled}
      />
      <span className="input-error">{error}</span>
    </div>
  );
}
