import { screen, render, fireEvent } from '@testing-library/react';
import SearchResults from './SearchResults';
import { reposMock, usersMock } from './components/searchResultsList/tests/mockData/SearchResultsList.mock.ts';
import useGithubFetch from './hooks/useGithubFetch';

jest.mock('./hooks/useGithubFetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseGithubFetch = useGithubFetch as jest.Mock;

describe('SearchResults', () => {
  it("renders ErrorBox", () => {
    mockUseGithubFetch.mockReturnValue({ error: 'Internal server error' });

    render(<SearchResults value='anything' />);

    expect(screen.getByTestId('error-box')).toBeInTheDocument();
  });

  it("renders Loader", () => {
    mockUseGithubFetch.mockReturnValue({ loading: true });

    render(<SearchResults value='anything' />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it("renders SearchDisabledBox", () => {
    mockUseGithubFetch.mockReturnValue({ loading: false });

    render(<SearchResults value='an' />);

    expect(screen.getByTestId('search-disabled-box')).toBeInTheDocument();
  });

  it("renders SearchResultsEmpty", () => {
    mockUseGithubFetch.mockReturnValue({ data: { items: [] } });

    render(<SearchResults value='andsd' />);

    expect(screen.getByTestId('search-results-empty')).toBeInTheDocument();
  });

  it("renders SearchResultsList", () => {
    mockUseGithubFetch.mockImplementation(({ type }) => {
      if(type === 'users') {
        return {
          data: { items: usersMock },
        };
      }

      if(type === 'repositories') {
        return {
          data: { items: reposMock },
        };
      }
    });

    render(<SearchResults value='east' />);

    expect(screen.getByTestId('search-results-list')).toBeInTheDocument();
  });
});

