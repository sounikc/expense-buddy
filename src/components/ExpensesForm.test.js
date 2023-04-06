import { render, screen } from '@testing-library/react';
import ExpenseForm from './ExpensesForm';

test('check total amount', () => {
  render(<ExpenseForm />);
  const totalSpan = screen.getByTestId('total-amount-span')
  expect(totalSpan).toBe(500);
});
