import { screen, render, fireEvent } from '@testing-library/react';
import SearchResultsList from '../SearchResultsList';
import * as SearchResultsItemModule from '../components/searchResultsItem/SearchResultsItem.tsx';
import { usersMock, reposMock, searchResultsListItemsPropsMock } from './mockData/SearchResultsList.mock.ts';

jest.mock('../components/searchResultsItem/SearchResultsItem.tsx', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../components/searchResultsItem/SearchResultsItem.tsx'),
  };
});

describe('SearchResultsList', () => {
  it("renders with 4 search results list elements", () => {
    const spySearchResultsItem = jest.spyOn(SearchResultsItemModule, 'default');

    render(<SearchResultsList repos={reposMock} users={usersMock} />);

    const searchResultsList = screen.getByTestId('search-results-list');
    expect(searchResultsList).toBeInTheDocument();

    expect(spySearchResultsItem).toHaveBeenCalledTimes(4);
  });

  it("renders search results list elements sorted alphabetically by name and passed correct properties", () => {
    const spySearchResultsItem = jest.spyOn(SearchResultsItemModule, 'default');

    render(<SearchResultsList repos={reposMock} users={usersMock} />);
    
    const firstCallProps = spySearchResultsItem.mock.calls[0][0];
    const secondCallProps = spySearchResultsItem.mock.calls[1][0];
    const thirdCallProps = spySearchResultsItem.mock.calls[2][0];
    const fourthCallProps = spySearchResultsItem.mock.calls[3][0];

    expect([firstCallProps, secondCallProps, thirdCallProps, fourthCallProps]).toEqual(
      expect.arrayContaining([
        expect.objectContaining(searchResultsListItemsPropsMock[0]),
        expect.objectContaining(searchResultsListItemsPropsMock[1]),
        expect.objectContaining(searchResultsListItemsPropsMock[2]),
        expect.objectContaining(searchResultsListItemsPropsMock[3]),
      ]));
  });

  it("scrolls to the next search results list element when navigating with arrows and makes it active",  () => {
    const mockScrollIntoView = jest.fn();
    HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

    render(<SearchResultsList repos={reposMock} users={usersMock} />);

    fireEvent.keyDown(window, { key: 'ArrowDown' });

    expect(mockScrollIntoView).toHaveBeenCalled();
    
    expect(screen.getAllByTestId('search-results-item')[0]).toHaveClass('active');
  });
});

