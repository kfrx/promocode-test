import React from 'react';
import Product from './';
import { renderWithTheme } from 'utils/test-helpers';
import { screen, cleanup, fireEvent } from '@testing-library/react';

describe('Product', () => {
  const expectedName = 'name';
  const price = 5000.32;
  const onAddToCart = jest.fn();

  beforeEach(() => {
    renderWithTheme(
      <Product name={expectedName} price={price} onAddToCart={onAddToCart} />
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('can render the name', () => {
    expect(screen.getByTestId('name')).toHaveTextContent(expectedName);
  });

  it('can render the price', () => {
    expect(screen.getByTestId('price')).toHaveTextContent('$5,000.32');
  });

  it('will fire the onAddToCart when clicking the button', () => {
    fireEvent.click(screen.getByText('Add to cart'));

    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });
});
