import { getDateString, getTimeString } from '../../src/libs/lib';

test('Test getDateString', () => {
    expect(getDateString(new Date(2022, 6 - 1, 14, 6, 37, 0 ))).toBe('2022-06-14');
})

test('Test getTimeString', () => {
    expect(getTimeString(new Date(2022, 6 - 1, 14, 6, 37, 0 ))).toBe('06:37');
})
