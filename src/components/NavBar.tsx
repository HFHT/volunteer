import { AppShell, NavLink } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function Navbar({ close }: any) {
  const navigate = useNavigate();

  return (
    <AppShell.Navbar p="md" style={{ gap: '10px' }}>
      <NavLink
        label="Hours"
        onClick={() =>{ close(); navigate('/')}}
        style={{ margin: '5px' }}
      />
      <NavLink
        label="History"
        onClick={() => { close(); navigate('/history')}}
        style={{ margin: '5px' }}
      />
      <NavLink
        label="Events"
        onClick={() => { close(); navigate('/events')}}
        style={{ margin: '5px' }}
      />
    </AppShell.Navbar>
  );
};