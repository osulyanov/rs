import { render, screen } from '@testing-library/react';
import MessageBox from './message-box';

describe('MessageBox', () => {
  it('renders the message as a string', () => {
    render(<MessageBox message="Hello, World!" />);
    const messageElement = screen.getByText('[Hello, World!]');
    expect(messageElement).toBeInTheDocument();
  });
});
