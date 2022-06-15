import type { NextPage } from 'next';
import { Stack } from '@mui/material';
import { CountdownTimer } from '@/components/CountdownTimer';

const Home: NextPage = () => {
  return (
    <Stack justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
      <CountdownTimer />
    </Stack>
  );
};

export default Home;
