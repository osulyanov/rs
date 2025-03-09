import { render, screen } from '@testing-library/react';
import SpeciesList from './species-list';

const MessageBoxMock = ({ message }: { message: string }) => (
  <div data-testid="message-box">{message}</div>
);
MessageBoxMock.displayName = 'MessageBoxMock';
jest.mock('./message-box', () => MessageBoxMock);

const SpeciesListItemsMock = () => <div data-testid="species-list-items" />;
SpeciesListItemsMock.displayName = 'SpeciesListItemsMock';
jest.mock('./species-list-items', () => SpeciesListItemsMock);

const PaginationMock = () => <div data-testid="pagination" />;
PaginationMock.displayName = 'PaginationMock';
jest.mock('./pagination', () => PaginationMock);

const FlyoutMock = () => <div data-testid="flyout" />;
FlyoutMock.displayName = 'FlyoutMock';
jest.mock('./flyout', () => ({ Flyout: FlyoutMock }));

describe('SpeciesList', () => {
  it('displays loading message when isLoading is true', () => {
    render(
      <SpeciesList speciesList={undefined} error={undefined} isLoading={true} />
    );

    expect(screen.getByTestId('message-box')).toHaveTextContent('Loading...');
  });
});
