import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductItem from './ProductItem';

describe('ProductItem', () => {
  const mockProduct = { id: 1, title: 'Test Product', price: 9.99, description: 'Test Description' };

  it('renders product title', () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByText(mockProduct.title)).toBeDefined();
  });

  it('renders product price', () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByText(`$${mockProduct.price}`)).toBeDefined();
  });

  it('renders product description', () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByText(mockProduct.description)).toBeDefined();
  });
});