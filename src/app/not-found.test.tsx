import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../components/message-box', () => {
  const MessageBox = ({ message }: { message: React.ReactNode }) => (
    <div>{message}</div>
  );
  return MessageBox;
});

describe('NotFound', () => {
  it('contains GO HOME link', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );
    expect(screen.getByText('GO HOME')).toBeInTheDocument();
  });
});
