import { createContext, useContext, type ReactNode, useState } from 'react'

// 1. Context ke Provider ke props
type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  // yaha pe aap shared state aur functions define karenge
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
}

type CartItem = {
  id: number
  quantity: number
}

// 2. Context create karna
const ShoppingCartContext = createContext({} as ShoppingCartContext)

// 3. Context consume karne ke liye custom hook
export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

// 4. Provider component
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function getItemQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id)
    return item ? item.quantity : 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  function getTotalQuantity() {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        getTotalQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

// First I create a context using createContext. Then I create a Provider component that wraps the required child components and exposes shared state or functions through the value prop. Finally, I use useContext, usually through a custom hook, to consume that context in child components.

// Coupling represents the level of dependency between different modules or components. We generally prefer loose coupling because changes in one module should have minimal impact on other modules, making the application easier to maintain, test and modify.

// I don't put every function in Context. I use Context for state and operations that need to be shared across multiple components. Component-specific logic stays inside the component or a separate utility/custom hook. This keeps the Context focused and avoids unnecessary coupling.
