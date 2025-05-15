import { render, screen, fireEvent } from '@testing-library/react';
import GithubAutocomplete from './GithubAutocomplete';

describe('GithubAutocomplete', () => {
  it('renders', () => {
    render(<GithubAutocomplete />);
    expect(screen.getByTestId('github-autocomplete')).toBeInTheDocument();
  });

  it('shows results only when focused', () => {
    render(<GithubAutocomplete />);
    const autocomplete = screen.getByTestId('github-autocomplete');
    
    expect(autocomplete.querySelector('.visible')).not.toBeInTheDocument();

    fireEvent.focus(autocomplete);
    expect(autocomplete.querySelector('.visible')).toBeInTheDocument();

    fireEvent.blur(autocomplete);
    expect(autocomplete.querySelector('.visible')).not.toBeInTheDocument();
  });
});
