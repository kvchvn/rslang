import React, { useState } from 'react';
import './FormRegistr.css';
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
import { changerRegistr } from '../../utils/api';

const FormRegistr: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [localRegistr, setLocalRegistr] = useState([]);
  const [name, setName] = useState('');
  const [password, setPass] = useState('');
  const [email, setEmail] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChangePass: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (
    event
  ) => {
    setPass(event.target.value);
  };
  const handleChangeEmail: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (
    event
  ) => {
    setEmail(event.target.value);
  };
  const handleChangeName: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (
    event
  ) => {
    setName(event.target.value);
  };

  const handleRegistr = async () => {
    setOpen(false);
    const content = await changerRegistr(name, password, email);
    const newArr: object[] = [...localRegistr, content];
    localStorage.setItem('registr', JSON.stringify(newArr));
    setPass('');
    setEmail('');
    setName('');
  };

  return (
    <div className="formregistr">
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleClickOpen}>
          Зарегистрироваться
        </Button>
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Регистрация</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для регистрации введите имя, Ваш email и придумайте пароль (пароль не менее восьми
            символов)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Введите Имя"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleChangeName}
          />
          <TextField
            margin="dense"
            id="email"
            label="Введите Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleChangeEmail}
          />
          <TextField
            margin="dense"
            id="pass"
            label="Введите пароль"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={handleChangePass}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button onClick={handleRegistr}>Зарегистрироваться</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormRegistr;
