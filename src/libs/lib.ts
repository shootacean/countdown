/**
 * input[type='date']に設定できる文字列に変換する
 * @param date Date
 * @returns string
 */
export const formatDateString = (date: Date): string => {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/**
 * input[type='time']に設定できる文字列に変換する
 * @param date Date
 * @returns string
 */
export const formatTimeString = (date: Date): string => {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
};

/**
 * 残り時間を見やすい形にフォーマットする
 * @param hours number
 * @param minutes number
 * @param seconds number
 * @returns string
 */
export const formatCountdownText = (
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
): string => {
  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');
  return days > 0 ? `${days}days ${h}:${m}:${s}` : `${h}:${m}:${s}`;
};
