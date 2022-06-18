import { render, screen, fireEvent } from '@testing-library/react';
import { CountdownTimer } from '@/components/CountdownTimer';

describe('CountdownTimer', () => {
  describe('初期表示', () => {
    test('カウントダウンの初期状態が 00:00:00 になっている', () => {
      const { getByRole } = render(<CountdownTimer />);
      const text = getByRole('heading', {
        name: '00:00:00',
      });
      expect(text).toBeInTheDocument();
    });

    test('指定日時が現在時刻になっている', () => {
      const mockDate = new Date(2022, 1 - 1, 1, 12, 30, 0);
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);

      const { getByPlaceholderText } = render(<CountdownTimer />);
      const date = getByPlaceholderText('2022-01-01');
      expect(date).toHaveValue('2022-01-01');

      const time = getByPlaceholderText('12:30');
      expect(time).toHaveValue('12:30');

      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    test.todo('リロード時もタイマーが維持されている');
  });
  describe('タイマー操作', () => {
    beforeEach(() => {
      const mockDate = new Date(2022, 1 - 1, 1, 12, 30, 0);
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    test('タイマー開始後、カウントダウンされている', async () => {
      const { getByPlaceholderText, getByRole } = render(<CountdownTimer />);

      // 時刻を変更してタイマーを開始する
      const time = getByPlaceholderText('12:30');
      fireEvent.change(time, { target: { value: '12:31' } });
      expect(time).toHaveValue('12:31');

      const countdownText = screen.getByRole('heading');
      expect(countdownText).toHaveTextContent('00:01:00');
    });

    test('過去の日時を指定した場合、タイマーは開始されない', () => {
      const { getByPlaceholderText, getByRole } = render(<CountdownTimer />);

      // 時刻を変更してタイマーを開始する
      const time = getByPlaceholderText('12:30');
      fireEvent.change(time, { target: { value: '12:29' } });
      expect(time).toHaveValue('12:29');

      const countdownText = getByRole('heading');
      expect(countdownText).toHaveTextContent('00:00:00');
    });

    test('未来日時でタイマー開始後、過去日時に変更した場合、タイマーがリセットされる', () => {
      const { getByPlaceholderText, getByRole } = render(<CountdownTimer />);

      const time = getByPlaceholderText('12:30');
      const countdownText = getByRole('heading');

      // (未来)時刻を変更してタイマーを開始する
      fireEvent.change(time, { target: { value: '12:31' } });
      expect(time).toHaveValue('12:31');
      expect(countdownText).toHaveTextContent('00:01:00');

      // (過去)時刻を変更してタイマーを開始する
      fireEvent.change(time, { target: { value: '12:29' } });
      expect(time).toHaveValue('12:29');
      expect(countdownText).toHaveTextContent('00:00:00');
    });
  });
});
