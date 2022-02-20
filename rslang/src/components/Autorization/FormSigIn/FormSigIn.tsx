import React, { useState } from 'react';
import './FormSigIn.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import { changeSigIn } from '../../utils/api';

interface IFormSigin {
  changeFormStateUser: () => void;
}

function FormSigIn({ changeFormStateUser }: IFormSigin) {
  const [open, setOpen] = React.useState(false);
  const [localSigIn] = useState([]);
  const [password, setPass] = useState('');
  const [email, setEmail] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangePassSigIN: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (
    event
  ) => {
    setPass(event.target.value);
  };
  const handleChangeEmailSigIn: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (
    event
  ) => {
    setEmail(event.target.value);
  };

  const handleSigIn = async () => {
    setOpen(false);
    const content = await changeSigIn(email, password);
    const newArr: object[] = [...localSigIn, content];
    localStorage.setItem('sigin', JSON.stringify(newArr));
    setPass('');
    setEmail('');
    changeFormStateUser();
  };

  return (
    <div className="formsigin">
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleClickOpen}>
          Войти
        </Button>
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Войти</DialogTitle>
        <DialogContent>
          <DialogContentText>Для входа введите Ваш email и пароль</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Введите Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleChangeEmailSigIn}
          />
          <TextField
            margin="dense"
            id="pass"
            label="Введите пароль"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={handleChangePassSigIN}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button onClick={handleSigIn}>Войти</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormSigIn;
