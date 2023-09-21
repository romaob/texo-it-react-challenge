import React from 'react'

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

export default function Input({
    value,
    label,
    type = 'text',
    error = "",
    onChange,
    disabled,
    flex,
    testId = 'input',
}: InputProps): JSX.Element {
  return (
    <div className='input' data-disabled={disabled} data-flex={flex} data-testid={testId}>
        {label && <label className='input-label'>{label}</label>}
        <input
            className='input-field'
            type={type}
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
            data-error={!!error}
            disabled={disabled}
        />
        <span className='input-error'>{error}</span>
    </div>
  )
}
