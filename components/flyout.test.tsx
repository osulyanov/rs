import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Flyout } from './flyout';
import { unselectAllItems } from './species-slice';

const mockStore = configureStore([]);

beforeAll(() => {
  global.URL.createObjectURL = jest.fn();
});

describe('Flyout', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      species: {
        selectedItems: {
          '1': {
            id: '1',
            name: 'Specie 1',
            classification: 'Class 1',
            designation: 'Designation 1',
          },
          '2': {
            id: '2',
            name: 'Specie 2',
            classification: 'Class 2',
            designation: 'Designation 2',
          },
        },
      },
    });
  });

  it('should render correctly when there are selected items', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('2 locations selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('should not render when there are no selected items', () => {
    store = mockStore({
      species: {
        selectedItems: {},
      },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText('locations selected')).toBeNull();
  });

  it('should dispatch unselectAllItems action when Unselect all button is clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));

    const actions = store.getActions();
    expect(actions).toContainEqual(unselectAllItems());
  });

  it('should trigger download when Download button is clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const createElementSpy = jest.spyOn(document, 'createElement');
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    fireEvent.click(screen.getByText('Download'));

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
  });
});
