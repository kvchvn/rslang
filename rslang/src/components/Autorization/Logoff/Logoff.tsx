import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface IStateUser {
  changeRemoveUser: () => void;
}

const Logoff: React.FC<IStateUser> = ({ changeRemoveUser }) => {
  return (
    <div className="logoff">
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={changeRemoveUser}>
          Выйти
        </Button>
      </Stack>
    </div>
  );
};

export default Logoff;
