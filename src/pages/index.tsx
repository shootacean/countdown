import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { CountdownTimer } from '@/components/CountdownTimer';

const Home: NextPage = () => {
  useEffect(() => {
    Notification.requestPermission().then((result) => {
      console.debug('Notification Permission : ', result);
    });
  }, []);

  return (
    <Stack justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
      <CountdownTimer />
    </Stack>
  );
};

export default Home;
