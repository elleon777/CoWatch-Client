import { Dispatch } from '@reduxjs/toolkit';
import { setLoading, setLoadingComplete, setUsers } from './users.slice';
import axios from 'axios';
const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
};
// Action
export function getUsers() {
  return async (dispatch: Dispatch, getState: () => {}) => {
    dispatch(setLoading());
    try {
      const { data } = await axios.get('http://localhost:9999/api/users', config);
      dispatch(setUsers(data.users));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoadingComplete());
    }
  };
}
