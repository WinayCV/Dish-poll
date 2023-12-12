export const dishesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DISHES': {
      return {...state, dishesList: action.payload};
    }
    default: {
      return {...state};
    }
  }
};
