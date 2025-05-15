import { screen, render } from '@testing-library/react';
import SearchResultsEmpty from './SearchResultsEmpty';

describe('SearchResultsEmpty', () => {
  it("renders with 'No results found' text", () => {
    render(<SearchResultsEmpty />);
    const searchResultsEmpty = screen.getByTestId('search-results-empty');
    expect(searchResultsEmpty).toBeInTheDocument();
    expect(searchResultsEmpty).toHaveTextContent('No results found');
  });
});
