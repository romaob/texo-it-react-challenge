import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input', () => {
  it('should render with the label', () => {
    render(<Input label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render a input field', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render the input field with the correct type', () => {
    render(<Input type="number" />);
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
  });

  it('should render the input field with the correct value', () => {
    render(<Input value="Test Value" />);
    expect(screen.getByRole('textbox')).toHaveValue('Test Value');
  });

  it('should call the onChange function when the input value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'Test Value');
    expect(handleChange).toHaveBeenCalledWith('Test Value');
  });

  it('should render the error message', () => {
    render(<Input error="Test Error" />);
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should disable the input field when disabled=true', () => {
    render(<Input disabled />);
    expect(screen.getByTestId('input')).toHaveAttribute(
      'data-disabled',
      'true'
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should add the flex class when flex=true', () => {
    render(<Input flex />);
    expect(screen.getByTestId('input')).toHaveAttribute('data-flex', 'true');
  });
});
