export const dishesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DISHES': {
      console.log(action.payload);
      return {...state, dishesList: action.payload};
    }
    default: {
      return {...state};
    }
  }
};
