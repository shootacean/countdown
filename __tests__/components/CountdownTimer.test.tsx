import { render, screen } from '@testing-library/react';
import { CountdownTimer } from '@/components/CountdownTimer';

describe('CountdownTimer', () => {
  test('初期状態は 00:00:00 になっている', () => {
    render(<CountdownTimer />);
    const text = screen.getByRole('heading', {
      name: '00:00:00',
    });
    expect(text).toBeInTheDocument();
  });
  test.todo('過去の日時を指定した場合、タイマーは開始されない');
  test.todo('タイマー開始後、カウントダウンされている');
  test.todo('リロード時もタイマーが維持されている');
});
