export const userReducers = (state, action) => {
  switch (action.type) {
    case 'SET_RANKS': {
      return {...state, ranks: action.payload};
    }
    case 'RESET_USER': {
      return {...state, user: {}};
    }
    case 'SET_USER': {
      return {...state, user: action.payload};
    }
    default: {
      return {...state};
    }
  }
};
