import initialState from '../redux/initialState';
import {APPLICATION} from '../constants/actionTypes';

export const appReducer = (state = initialState.app, action) => {
  switch (action.type) {
    case `${APPLICATION}_PENDING`:
      return {
        ...state,
      };
    case `${APPLICATION}_SUCCESS`:
      return {
        ...state,
      };

    case `${APPLICATION}_FAILURE`:
      return {
        ...state,
      };
    case `ADD_BASKET`:
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
    case 'CHANGE_LANG':
      return {
        ...state,
        langId: action.payload
      }
    case 'DELETE_BASKET_ITEM':
      console.log(action.payload)
      return {
        ...state,
        basket: state.basket.filter(item=>item.id !== action.payload)
      }
    default:
      return state;
  }
};
