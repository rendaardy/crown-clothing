import { createContext, useContext, useEffect, useReducer } from "react";
import { get, set } from "idb-keyval";

const CartContext = createContext({
  open: false,
  setOpen: () => {},
  items: [],
  addItem: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

const initialState = {
  open: false,
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "OPEN_CART":
      return { ...state, open: true };
    case "CLOSE_CART":
      return { ...state, open: false };
    case "SET_CART":
      return { ...state, items: action.payload };
    case "ADD_ITEM": {
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (itemInCart) {
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };
    case "DECREMENT_QUANTITY": {
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (itemInCart.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function useCartState() {
  const { open, setOpen } = useContext(CartContext);

  return [open, setOpen];
}

export function useCartItems() {
  const {
    items,
    addItem,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
  } = useContext(CartContext);

  return {
    items,
    addItem,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
  };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    let ignore = false;

    get("cartItems").then(
      (cartItems) =>
        ignore && dispatch({ type: "SET_CART", payload: cartItems ?? [] }),
    );

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      set("cartItems", state.items);
    }

    return () => {
      ignore = true;
    };
  }, [state.items]);

  const setOpen = (callback) => {
    if (callback(state.open)) {
      dispatch({ type: "OPEN_CART" });
    } else {
      dispatch({ type: "CLOSE_CART" });
    }
  };

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const incrementQuantity = (item) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: item });
  };

  const decrementQuantity = (item) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: item });
  };

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        open: state.open,
        items: state.items,
        setOpen,
        addItem,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
