import { createContext, useContext, type ReactNode } from 'react'

// 1. Context ke Provider ke props
type ShoppingCartProviderProps = {
  children: ReactNode
}

// 2. Context create karna
const ShoppingCartContext = createContext({})

// 3. Context consume karne ke liye custom hook
export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

// 4. Provider component
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  return (
    <ShoppingCartContext.Provider value={{}}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

// “First I create a context using createContext. Then I create a Provider component that wraps the required child components and exposes shared state or functions through the value prop. Finally, I use useContext, usually through a custom hook, to consume that context in child components.”
