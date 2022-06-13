import { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { Stack, Typography, TextField } from '@mui/material';
import { getDateString, getTimeString } from '../libs/lib';

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
