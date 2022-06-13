/**
 * input[type='date']に設定できる文字列に変換する
 * @param date Date
 * @returns string
 */
export const getDateString = (date: Date): string => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`
}

/**
 * input[type='time']に設定できる文字列に変換する
 * @param date Date
 * @returns string
 */
export const getTimeString = (date: Date): string => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`
}
