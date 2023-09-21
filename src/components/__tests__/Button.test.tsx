import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '../Button';


describe('Button tests', () => {
  it('should render without crashing', () => {
    render(<Button />);
  });

  it('should render text when the "text" prop is provided', () => {
    render(<Button text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render an icon when the "icon" prop is provided', () => {
    render(<Button icon="menu" />);
    expect(screen.getByTestId('button-icon')).toBeInTheDocument();
  });

  it('should render children when they are provided', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should apply the "default" style when the "type" prop is not provided', () => {
    render(<Button data-testid="button" />);
    expect(screen.getByTestId('button')).toHaveClass('button');
  });

  it('should apply the "text" style when the "type" prop is set to "text"', () => {
    render(<Button data-testid="button" type="text" />);
    expect(screen.getByTestId('button')).toHaveClass('button-text');
  });

  it('should apply the "button-text-contrast" class when the "contrast" prop is set to true', () => {
    render(<Button data-testid="button" contrast />);
    expect(screen.getByTestId('button')).toHaveClass('button-text-contrast');
  });

  it('should render the right prop when disabled', () => {
    render(<Button data-testid="button" disabled />);
    expect(screen.getByTestId('button')).toHaveAttribute('data-disabled', 'true');
  });

  it('should render the right prop when toggled', () => {
    render(<Button data-testid="button" toggled />);
    expect(screen.getByTestId('button')).toHaveAttribute('data-toggled', 'true');
  });

  it('should render the right prop when readOnly', () => {
    render(<Button data-testid="button" readOnly />);
    expect(screen.getByTestId('button')).toHaveAttribute('data-readonly', 'true');
  });

  it('should calls the "onClick" function when the button is clicked', () => {
    const handleClick = jest.fn();
    render(<Button data-testid="button" onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should not call the "onClick" function when the button is clicked and the "disabled" prop is set to true', () => {
    const handleClick = jest.fn();
    render(<Button data-testid="button" onClick={handleClick} disabled />);
    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should not call the "onClick" function when the button is clicked and the "readOnly" prop is set to true', () => {
    const handleClick = jest.fn();
    render(<Button data-testid="button" onClick={handleClick} readOnly />);
    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render a link with the provided url', () => {
    render(<Button data-testid="button" link="https://www.google.com" />);
    expect(screen.getByTestId('button')).toHaveAttribute('href', 'https://www.google.com');
  });
});