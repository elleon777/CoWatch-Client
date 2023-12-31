import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import styles from './LoginForm.module.scss';
import { User } from 'utils/@types/user';
import { login } from 'store/user/user.slice';
import { useLocalStorage } from 'usehooks-ts';

export interface FormFields {
  username: string;
}

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const [user, setUser] = React.useState<FormFields>({ username: 'anton' });
  const [savedUser, setSavedUser] = useLocalStorage('user', user);

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
    setSavedUser(user);
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
