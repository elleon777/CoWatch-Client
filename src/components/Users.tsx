import { Typography } from '@mui/material';
import { useGetUsersQuery } from 'api/usersApi';
import { RootState } from 'utils/@types/store';
import { useAppSelector } from 'utils/hooks/store';

export const Users = () => {
  const { data, isLoading, isError } = useGetUsersQuery();

  const { users } = useAppSelector((state: RootState) => state.usersState);
  const { currentUser } = useAppSelector((state: RootState) => state.authState);

  console.log(users, currentUser);
  if (isLoading) {
    return <h2>Загрузка...</h2>;
  }

  if (isError) {
    return <h2>Ошибка</h2>;
  }

  return (
    <ul>
      {data &&
        users.map((user, index) => (
          <li key={index}>
            <Typography variant="body1" fontSize={20}>
              {user.username}
            </Typography>
          </li>
        ))}
    </ul>
  );
};
