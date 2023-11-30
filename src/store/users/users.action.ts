// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { User } from 'utils/@types/users';


// export const fetchUsers = createAsyncThunk<User[]>(
//   'user/fetchUsers',
//   async () => {
//     const { data } = await axios.get<User[]>('http://localhost:9999/api/users', {
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//       },
//     });
//     return data;
// });

// export function getUsers() {
//   return async (dispatch: Dispatch) => {
//     dispatch(setLoading());
//     try {
//       const { data } = await axios.get('http://localhost:9999/api/users', config);
//       dispatch(setUsers(data.users));
//     } catch (e) {
//       console.log(e);
//     } finally {
//       dispatch(setLoadingComplete());
//     }
//   };
// }
