import { screen, render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it("renders with spinner", () => {
    render(<Loader />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();

    const spinner = screen.getByTestId('loader-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner');
  });
});
