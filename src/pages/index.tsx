import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Stack, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { CountdownTimer } from '@/components/CountdownTimer';

const Home: NextPage = () => {
  useEffect(() => {
    // TODO ユーザー操作時にリクエストするように変更する
    Notification.requestPermission().then((result) => {
      console.debug('Notification Permission : ', result);
    });
  }, []);

  const [timerCount, setTimerCount] = useState(1);
  const handleIncrementTimerCount = () => {
    const c = timerCount + 1;
    localStorage.setItem(`timerCount`, c.toString());
    setTimerCount(c);
  };
  const handleClearTimerCount = () => {
    localStorage.setItem(`timerCount`, '1');
    setTimerCount(1);
  };
  useEffect(() => {
    const c = localStorage.getItem(`timerCount`);
    if (c) {
      setTimerCount(parseInt(c));
    } else {
      setTimerCount(1);
    }
  }, []);

  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      direction={'row'}
      flexWrap={'wrap'}
      rowGap={4}
      columnGap={4}
      sx={{ height: '100vh' }}
    >
      {[...Array(timerCount).keys()].map((n) => (
        <CountdownTimer key={n} timerId={n} />
      ))}

      <Button
        color='success'
        onClick={() => {
          handleIncrementTimerCount();
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
          }}
        >
          <AddIcon />
        </Paper>
      </Button>

      <Button
        color='error'
        onClick={() => {
          handleClearTimerCount();
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
          }}
        >
          <ClearAllIcon />
        </Paper>
      </Button>
    </Stack>
  );
};

export default Home;
