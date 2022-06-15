import {
  formatDateString,
  formatTimeString,
  formatCountdownText,
} from '@/libs/lib';

test('Test formatDateString', () => {
  expect(formatDateString(new Date(2022, 6 - 1, 14, 6, 37, 0))).toBe(
    '2022-06-14',
  );
});

test('Test formatTimeString', () => {
  expect(formatTimeString(new Date(2022, 6 - 1, 14, 6, 37, 0))).toBe('06:37');
});

test('Test formatCountdownText', () => {
  expect(formatCountdownText(0, 2, 3, 4)).toBe('02:03:04');
  expect(formatCountdownText(1, 2, 3, 4)).toBe('1days 02:03:04');
});
