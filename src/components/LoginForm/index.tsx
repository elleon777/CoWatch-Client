import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import styles from './LoginForm.module.scss';
import { login } from 'store/auth/auth.slice';

export interface FormFields {
  username: string;
}

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<FormFields>({ username: 'anton' });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(login(user));
    //   // localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        name="username"
        value={user.username}
        onChange={handleChange}
        type="text"
        color="primary"
        label="Логин"
        variant="outlined"
        required
      />
      <Button variant="contained" type="submit">
        Войти
      </Button>
    </form>
  );
};
