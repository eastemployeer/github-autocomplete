import { screen, render } from '@testing-library/react';
import SearchDisabledBox from './SearchDisabledBox';

describe('SearchDisabledBox', () => {
  it("renders with 'Minimal chars number to initialize search is 3' text", () => {
    render(<SearchDisabledBox />);

    const searchDisabledBox = screen.getByTestId('search-disabled-box');
    expect(searchDisabledBox).toBeInTheDocument();
    expect(searchDisabledBox).toHaveTextContent('Minimal chars number to initialize search is 3');
  });
});
