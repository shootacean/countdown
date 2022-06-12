import type { NextPage } from 'next';
import { Stack } from '@mui/material';
import { CountdownTimer } from '../components/CountdownTimer';

const Home: NextPage = () => {
  const today: Date = new Date();
  const expiryTimestamp = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
    // TODO 以降を可変にする
    17,
    0,
    0
  );
  return (
      <Stack justifyContent='center' alignItems='center' sx={{height:'100vh'}}>
        <CountdownTimer expiryTimestamp={expiryTimestamp}/>
      </Stack>
  )
}

export default Home
