import { screen, render } from '@testing-library/react';
import { GithubFetchType } from '../../../../hooks/types/useGithubFetch';
import SearchResultsItem from './SearchResultsItem';

describe('SearchResultsItem', () => {
  it("renders with correct icon matching fetchType", () => {
    render(<SearchResultsItem name="Example"
                              avatarUrl="https://example.com"
                              url="https://example.com"
                              fetchType={GithubFetchType.REPOSITORIES}
                              active={false} />);

    const searchResultsItem = screen.getByTestId('search-results-item');
    expect(searchResultsItem).toBeInTheDocument();

    const repoIcon = screen.getByTestId('search-results-item-repo-icon');
    expect(repoIcon).toBeInTheDocument();
  });

  it("has correct name and avatarUrl in img tag", () => {
    render(<SearchResultsItem name="Example"
                              avatarUrl="https://example.com"
                              url="https://example.com"
                              fetchType={GithubFetchType.REPOSITORIES}
                              active={false} />);
    
    const name = screen.getByTestId('search-results-item-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Example');

    const avatar = screen.getByTestId('search-results-item-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com');
  });

  it("has .active scss class assigned when active", () => {
    render(<SearchResultsItem name="Example"
                              avatarUrl="https://example.com"
                              url="https://example.com"
                              fetchType={GithubFetchType.REPOSITORIES}
                              active />);

    const searchResultsItem = screen.getByTestId('search-results-item');
    expect(searchResultsItem).toHaveClass('active');
  });
});
