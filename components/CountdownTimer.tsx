import { Typography } from '@mui/material';
import { useTimer } from 'react-timer-hook';

export type CountdownTimerProps = {
    expiryTimestamp: Date
}

export const CountdownTimer = ({expiryTimestamp}: CountdownTimerProps) => {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => alert('onExpire called') });
    if ( isRunning !== true ) {
        start();
    } 

    return (
        <>
            <Typography variant='h2'>{hours}:{minutes}:{seconds}</Typography>
        </>
    )
}
