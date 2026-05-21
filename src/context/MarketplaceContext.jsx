"use client"

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { handmadeProducts } from '../data/products'

const MarketplaceContext = createContext(null)

const STORAGE_KEYS = {
  auth: 'crafty-auth-user',
  cart: 'crafty-cart',
  products: 'crafty-products',
}

function safeReadStorage(key, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue
  }

  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallbackValue
  } catch {
    return fallbackValue
  }
}

function buildAvatar(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function MarketplaceProvider({ children }) {
  const [products, setProducts] = useState(() => safeReadStorage(STORAGE_KEYS.products, handmadeProducts))
  const [cart, setCart] = useState(() => safeReadStorage(STORAGE_KEYS.cart, []))
  const [user, setUser] = useState(() => safeReadStorage(STORAGE_KEYS.auth, null))
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isSellOpen, setIsSellOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products))
  }, [products])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(user))
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.auth)
    }
  }, [user])

  const productLookup = useMemo(() => new Map(products.map((product) => [product.id, product])), [products])

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = productLookup.get(item.productId)

          if (!product) {
            return null
          }

          return {
            ...product,
            quantity: item.quantity,
          }
        })
        .filter(Boolean),
    [cart, productLookup],
  )

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const amount = Number.parseFloat(item.price.replace('$', '')) || 0
        return total + amount * item.quantity
      }, 0),
    [cartItems],
  )

  const cartCount = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems])

  const addToCart = (product, quantity = 1) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1)

    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id)

      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item,
        )
      }

      return [...current, { productId: product.id, quantity: safeQuantity }]
    })
  }

  const setCartQuantity = (productId, quantity) => {
    const safeQuantity = Number(quantity)

    setCart((current) => {
      if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) {
        return current.filter((item) => item.productId !== productId)
      }

      return current.map((item) => (item.productId === productId ? { ...item, quantity: safeQuantity } : item))
    })
  }

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.productId !== productId))
  }

  const clearCart = () => setCart([])

  const login = ({ name, email }) => {
    const cleanedName = name.trim()
    const cleanedEmail = email.trim().toLowerCase()

    setUser({
      name: cleanedName,
      email: cleanedEmail,
      avatar: buildAvatar(cleanedName),
    })
  }

  const logout = () => setUser(null)

  const addProduct = (productData) => {
    const nextProduct = {
      id: Date.now(),
      title: productData.title.trim(),
      description: productData.description.trim(),
      category: productData.category.trim(),
      price: productData.price.trim().startsWith('$') ? productData.price.trim() : `$${productData.price.trim()}`,
      image: productData.image.trim(),
      badges: ['New', 'Handmade'],
      rating: 4.9,
      reviews: 12,
      isUserCreated: true,
    }

    setProducts((current) => [nextProduct, ...current])
  }

  const value = {
    products,
    cartItems,
    cartSubtotal,
    cartCount,
    user,
    isCartOpen,
    isAuthOpen,
    isSellOpen,
    setIsCartOpen,
    setIsAuthOpen,
    setIsSellOpen,
    addToCart,
    setCartQuantity,
    removeFromCart,
    clearCart,
    login,
    logout,
    addProduct,
  }

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMarketplace() {
  const context = useContext(MarketplaceContext)

  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider')
  }

  return context
}
