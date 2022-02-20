import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface IStateUser {
  changeRemoveUser: () => void;
}

function Logoff({ changeRemoveUser }: IStateUser) {
  return (
    <div className="logoff">
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={changeRemoveUser}>
          Выйти
        </Button>
      </Stack>
    </div>
  );
}

export default Logoff;
