import { render, screen } from '@testing-library/react';
import { CountdownTimer } from '@/components/CountdownTimer';

describe('CountdownTimer', () => {
  it('初期状態は 00:00:00 になっている', () => {
    render(<CountdownTimer />);
    const text = screen.getByRole('heading', {
      name: '00:00:00',
    });
    expect(text).toBeInTheDocument();
  });
});
