import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import ProductList from './ProductList';
import axios from 'axios';
vi.mock('axios')

describe('ProductList', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(axios.get).mockResolvedValue({
            data: {
                products: [
                    { id: 1, title: 'Product 1', price: 10, description: 'Description 1' },
                    { id: 2, title: 'Product 2', price: 20, description: 'Description 2' },
                ],
            },
        });
    });

  it('renders a list of products', async () => {
    await act(async () => {
        render(<ProductList />);
    });
    expect(screen.getAllByTestId('product-item')).toHaveLength(2);
  });

  it('displays "No products found" when the list is empty', () => {
    render(<ProductList />);
    expect(screen.getByText(/no products found/i)).toBeDefined();
  });
});