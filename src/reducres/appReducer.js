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
        basket: [...state.basket, {...action.payload.item, quantity: action.payload.quantity}],
      };
    case 'BASKET':
      return{
        ...state,
        basket: state.basket.filter((item,index)=>{
          return state.basket.indexOf(item)===index
        })
      }
    case 'CHANGE_LANG':
      return {
        ...state,
        langId: action.payload
      }
    case 'DELETE_BASKET_ITEM':
      return {
        ...state,
        basketItems: state.basketItems.filter(item=>item.product.id !== action.payload),
        basket: state.basket.filter(item=>item.id !== action.payload),
      }
    case 'CLEAR_BASKET':
      return{
        ...state,
        basket: []
      }
    case 'GET_CHAT_ID':
      return{
        ...state,
        chat_id: action.payload
      }
    case 'GET_MESSAGE':
      return{
        ...state,
        chat_messages: [...state.chat_messages,action.payload]
      }
    case 'GET_BASKET':
      return{
        ...state,
        basketItems: action.payload
      }
    case 'CHANGE_QUANTITY_ADD':
      console.log('llloooogggg')
      console.log(action.payload)
      return{
        ...state,
        basketItems: state.basketItems.map(item=>
          item.product.id === action.payload?
          { ...item, quantity: parseInt(item.quantity )+ 1 }:
          item
        )
      }
      case 'CHANGE_QUANTITY':
      console.log('llloooogggg')
      console.log(action.payload)
      return{
        ...state,
        basketItems: state.basketItems.map(item=>
          item.product.id === action.payload ?
          {
            ...item, quantity: parseInt(item.quantity )- 1 
          }:item
        )
      }
      case 'TOTAL_PRICE':
        return{
          ...state,
          totalPrice: state.basketItems.reduce(function(accumulator,currentValue){
            console.log(currentValue)
            return accumulator +  currentValue.variations[0].price * parseInt(currentValue.quantity)
          },0)
        }
      case 'TOTAL_RESET':
        return{ 
          ...state,
          totalPrice: 0
        }
      case 'MESS':
        return{
          ...state,
          chat_messages: action.payload
        }
    default:
      return state;
  }
};
