import { useContext, createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import usersReducer from '../reducers/usersReducer';

const UserContext = createContext();

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [{ loading, user, error }, dispatch] = useReducer(
    usersReducer,
    initialState
  );
  const URL = import.meta.env.VITE_URL;

  // Login action
  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await axios.post(
        `${URL}/api/v1/users/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch({ type: 'LOGIN', payload: response.data.user });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err.response?.data?.message || 'Login failed',
      });
    }
  };

  // Logout action
  const logout = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      await axios.post(
        `${URL}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Logout failed' });
    }
  };

  // Check session action
  const checkSession = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await axios.get(`${URL}/api/v1/users/session`, {
        withCredentials: true,
      });
      if (response.data.authenticated) {
        dispatch({ type: 'SET_USER', payload: response.data.user });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    } catch (err) {
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuthContext = () => useContext(UserContext);

// import { useContext, createContext, useReducer } from 'react';
// import { usersReducer } from '@/reducers';

// const UserContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const initialState = {
//     loading: false,
//     user: {},
//   };

//   const [{ loading, user }, dispatch] = useReducer(usersReducer, initialState);

//   return (
//     <UserContext.Provider value={{ user, loading, dispatch }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   return useContext(UserContext);
// };
