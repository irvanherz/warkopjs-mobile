const initialState = {
  items: []
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      let isExist = false;
      let newItems = state.items.map(item => {
        if (item.id === action.item.id) {
          item.qty++;
          isExist = true;
          return item;
        } else {
          return item;
        }
      });
      if (!isExist) {
        const item = action.item;
        item.qty = 1;
        newItems.push(action.item);
      }
      return {
        ...state,
        items: [...state.items, action.item]
      };
    case 'CART_REMOVE_ITEM':
      let newItems2 = state.items.filter(item => item.id !== action.id);
      return {
        ...state,
        items: newItems2
      };
    case 'CART_INCREASE_ITEM':
      const newItems3 = state.items.map(item => {
        if (item.id === action.id) {
          if (item.qty < 1000) {
            item.qty++;
            return item;
          }
        }
        return item;
      });
      return {
        ...state,
        items: newItems3
      };
    case 'CART_DECREASE_ITEM':
      const newItems4 = state.items.map(item => {
        if (item.id === action.id) {
          if (item.qty > 1) {
            item.qty--;
            return item;
          }
        }
        return item;
      });
      return {
        ...state,
        items: newItems4
      };
    case 'CART_CLEAR_ITEMS':
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
};

export default cart;
