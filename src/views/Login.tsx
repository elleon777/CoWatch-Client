import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { login } from 'store/auth/auth.slice';

export interface FormFields {
  username: string;
}

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<FormFields>({ username: '' });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('sumbit');
    event.preventDefault();

    dispatch(login(user));
  };
  const handleClick = () => {
    console.log('sumbit');
    dispatch(login(user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        value={user.username}
        onChange={handleChange}
        type="text"
        color="primary"
        required
      />
      <Button onClick={handleClick} variant="contained">
        Войти
      </Button>
    </form>
  );
};
