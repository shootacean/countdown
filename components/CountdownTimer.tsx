import { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { Stack, Typography, TextField, Button } from '@mui/material';

/**
 * input[type='date']に設定できる文字列に変換する
 * @param date Date
 * @returns string
 */
const getDateString = (date: Date): string => {
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
const getTimeString = (date: Date): string => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`
}

const today = new Date();

export type CountdownTimerProps = {}

export const CountdownTimer = ({}: CountdownTimerProps) => {
    const [date, setDate] = useState(getDateString(today));
    const [time, setTime] = useState(getTimeString(today));

    const {
        seconds,
        minutes,
        hours,
        pause,
        restart,
    } = useTimer({ expiryTimestamp: new Date(`${date}T${time}:00`), onExpire: () => console.info('onExpire called'), autoStart: false});

    useEffect(() => {
        if (new Date(`${date}T${time}:00`) <= new Date()) {
            // 過去の日付の場合はタイマーをリセットする
            pause();
            restart(new Date(`${date}T${time}:00`), false);
        } else {
            // 未来の日付ならタイマーを開始する
            restart(new Date(`${date}T${time}:00`), true);
        }
    }, [date, time]);

    return (
        <>
            {/* TODO padStart */}
            <Typography variant='h2'>{hours}:{minutes}:{seconds}</Typography>
            <Stack direction={'row'} spacing={1}>
                <TextField variant='standard' type='date' value={date} onChange={(e) => {setDate(e.target.value)}}/>
                <TextField variant='standard' type='time' value={time} onChange={(e) => {setTime(e.target.value)}}/>
            </Stack>
        </>
    )
}
