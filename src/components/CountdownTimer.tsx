import { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { Stack, Typography, TextField } from '@mui/material';
import {
  formatCountdownText,
  formatDateString,
  formatTimeString,
} from '@/libs/lib';

let initDate = new Date();

export type CountdownTimerProps = {};

export const CountdownTimer = ({}: CountdownTimerProps) => {
  const [date, setDate] = useState(formatDateString(initDate));
  const [time, setTime] = useState(formatTimeString(initDate));

  useEffect(() => {
    // 永続化された指定日時を復元する(初回のみ実行)
    const persistenceDate = localStorage.getItem('persistenceDate');
    const persistenceTime = localStorage.getItem('persistenceTime');
    if (persistenceDate && persistenceTime) {
      setDate(persistenceDate);
      setTime(persistenceTime);
    }
  }, []);

  const { seconds, minutes, hours, days, pause, restart } = useTimer({
    expiryTimestamp: new Date(`${date}T${time}:00`),
    // TODO タイマー終了時は通知する
    onExpire: () => console.info('onExpire called'),
    autoStart: false,
  });

  useEffect(() => {
    // 残り時間をタイトルに表示する
    // TODO CountdownTimerコンポーネントではなくpagesで更新するように変更する
    document.title = formatCountdownText(days, hours, minutes, seconds);
  }, [seconds, minutes, hours, days]);

  useEffect(() => {
    if (new Date(`${date}T${time}:00`) <= new Date()) {
      // 過去の日付の場合はタイマーをリセットする
      pause();
      // FIXME restart()は不要かもしれない
      // restart(new Date(`${date}T${time}:00`), false);
    } else {
      // 未来の日付ならタイマーを開始する
      restart(new Date(`${date}T${time}:00`), true);
      // 指定日時を永続化する
      // FIXME リロード時に2回走ってしまっている
      localStorage.setItem('persistenceDate', date);
      localStorage.setItem('persistenceTime', time);
    }
  }, [date, time]); // TODO ESLintのエラーを根本的に解決する

  return (
    <>
      <Typography variant='h2'>
        {formatCountdownText(days, hours, minutes, seconds)}
      </Typography>
      <Stack direction={'row'} spacing={1}>
        <TextField
          name={'date'}
          variant='standard'
          type='date'
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <TextField
          name={'time'}
          variant='standard'
          type='time'
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
      </Stack>
    </>
  );
};
