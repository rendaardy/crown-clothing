import { createContext, useContext, useState, useEffect } from "react";
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
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let ignore = false;

    get("cartItems").then((cartItems) => ignore && setItems(cartItems ?? []));

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      set("cartItems", items);
    }

    return () => {
      ignore = true;
    };
  }, [items]);

  const addItem = (item) => {
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      setItems((items) =>
        items.map((i) => {
          if (i.id === item.id) {
            return { ...i, quantity: i.quantity + 1 };
          }

          return i;
        }),
      );
    } else {
      setItems((items) => [...items, { ...item, quantity: 1 }]);
    }
  };

  const incrementQuantity = (item, quantity = 1) => {
    setItems((items) =>
      items.map((i) => {
        if (i.id === item.id) {
          return { ...i, quantity: i.quantity + quantity };
        }

        return i;
      }),
    );
  };

  const decrementQuantity = (item, quantity = 1) => {
    setItems((items) =>
      items
        .filter((i) => {
          if (i.id === item.id) {
            return i.quantity - quantity > 0;
          }

          return true;
        })
        .map((i) => {
          if (i.id === item.id) {
            return { ...i, quantity: i.quantity - quantity };
          }

          return i;
        }),
    );
  };

  const removeItem = (item) => {
    setItems((items) => items.filter((i) => i.id !== item.id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        open,
        setOpen,
        items,
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
