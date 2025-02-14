const initialState = {
  cartData: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        cartData: [...state.cartData, action.movie],
      };

    case "REMOVE_fROM_CART":
      return {
        cartData: state.cartData.filter((item) => item.id !== action.itemId),
      };

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export { cartReducer, initialState };
