import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchField from './SearchField';

jest.useFakeTimers();

describe('SearchField', () => {
  it('renders input and icons correctly', () => {
    render(<SearchField onChange={jest.fn()} />);
    
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('calls onChange with debounced value', () => {
    const onChange = jest.fn();
    render(<SearchField onChange={onChange} />);
    
    const input = screen.getByTestId('search-input');
    
    fireEvent.change(input, { target: { value: 'react' } });

    expect(onChange).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(350);
    });

    expect(onChange).toHaveBeenCalledWith('react');
  });

  it('shows clear button when input is not empty', () => {
    render(<SearchField onChange={jest.fn()} />);
    
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'abc' } });

    act(() => {
      jest.advanceTimersByTime(350);
    });

    expect(screen.getByTestId('search-clear-button')).toBeInTheDocument();
  });

  it('clears input and calls onChange with empty string when clear button clicked', () => {
    const onChange = jest.fn();
    render(<SearchField onChange={onChange} />);
    
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'abc' } });

    act(() => {
      jest.advanceTimersByTime(350);
    });

    const clearButton = screen.getByTestId('search-clear-button');
    fireEvent.click(clearButton);

    act(() => {
      jest.advanceTimersByTime(350);
    });

    expect(input).toHaveValue('');
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('focuses input when search icon is clicked', () => {
    render(<SearchField onChange={jest.fn()} />);
    
    const input = screen.getByTestId('search-input');
    const searchIcon = screen.getByTestId('search-icon');

    input.blur();
    expect(document.activeElement).not.toBe(input);

    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });
});
