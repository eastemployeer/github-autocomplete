import { screen, render } from '@testing-library/react';
import ErrorBox from './ErrorBox';

describe('ErrorBox', () => {
  it("renders with custom text", () => {
    render(<ErrorBox message='Internal server error' />);

    const errorBox = screen.getByTestId('error-box');
    expect(errorBox).toBeInTheDocument();
    expect(errorBox).toHaveTextContent('Internal server error');
  });
});
