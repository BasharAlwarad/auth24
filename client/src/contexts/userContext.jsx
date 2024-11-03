import { useContext, createContext, useReducer } from 'react';
import { usersReducer } from '@/reducers';

const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    loading: false,
    user: {},
  };

  const [{ loading, user }, dispatch] = useReducer(usersReducer, initialState);

  return (
    <UserContext.Provider value={{ user, loading, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(UserContext);
};
