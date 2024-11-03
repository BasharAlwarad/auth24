const usersReducer = (action, state) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'LOGIN':
      return { ...state, loading: false, user: action.payload };
    case 'SET_USERS':
      return action.payload;
    default:
      return state;
  }
};

export default usersReducer;
