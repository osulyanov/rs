import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './pagination';
import { useRouter } from 'next/router';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          mockPush(href);
        }}
      >
        {children}
      </a>
    );
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('Pagination', () => {
  const mockRouter = {
    query: { page: '1', term: 'test' },
    push: mockPush,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination with correct page info', () => {
    const speciesList = {
      count: 25,
      next: 'next-url',
      previous: null,
      results: [],
    };

    render(<Pagination speciesList={speciesList} />);

    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('renders next button and handles click', () => {
    const speciesList = {
      count: 25,
      next: 'next-url',
      previous: null,
      results: [],
    };

    render(<Pagination speciesList={speciesList} />);

    const nextButton = screen.getByText('NEXT >');
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith('/?page=2&term=test');
  });

  it('renders prev button and handles click', () => {
    mockRouter.query.page = '2';
    const speciesList = {
      count: 25,
      next: 'next-url',
      previous: 'prev-url',
      results: [],
    };

    render(<Pagination speciesList={speciesList} />);

    const prevButton = screen.getByText('< PREV');
    expect(prevButton).toBeInTheDocument();
    fireEvent.click(prevButton);
    expect(mockPush).toHaveBeenCalledWith('/?page=1&term=test');
  });
});
