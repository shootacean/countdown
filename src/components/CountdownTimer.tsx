import { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { Stack, Typography, TextField } from '@mui/material';
import {
  formatCountdownText,
  formatDateString,
  formatTimeString,
} from '@/libs/lib';

export type CountdownTimerProps = {};

export const CountdownTimer = ({}: CountdownTimerProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    // 永続化された指定日時を復元する(初回のみ実行)
    const persistenceDate = localStorage.getItem('persistenceDate');
    const persistenceTime = localStorage.getItem('persistenceTime');
    if (persistenceDate && persistenceTime) {
      setDate(persistenceDate);
      setTime(persistenceTime);
    } else {
      let today = new Date();
      setDate(formatDateString(today));
      setTime(formatTimeString(today));
    }
  }, []);

  const { seconds, minutes, hours, days, pause, restart } = useTimer({
    expiryTimestamp: new Date(`${date}T${time}:00`),
    // タイマー終了時に通知する
    onExpire: () => {
      const notification = new Notification('Countdown', {
        body: `Times Up! - ${date} ${time}`,
        tag: 'singleton',
      });
    },
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
      restart(new Date(`${date}T${time}:00`), false);
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
          placeholder={'2022-01-01'}
        />
        <TextField
          name={'time'}
          variant='standard'
          type='time'
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          placeholder={'12:30'}
        />
      </Stack>
    </>
  );
};
