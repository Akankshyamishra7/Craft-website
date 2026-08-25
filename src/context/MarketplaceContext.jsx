"use client"

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { handmadeProducts } from '../data/products'

const MarketplaceContext = createContext(null)

const STORAGE_KEYS = {
  auth: 'crafty-auth-user-v2',
  cart: 'crafty-cart-v2',
  wishlist: 'crafty-wishlist-v2',
  products: 'crafty-products-v2',
  orders: 'crafty-orders-v2',
  coupons: 'crafty-coupons-v2',
}

const DEFAULT_COUPONS = {
  CRAFTY10: { code: 'CRAFTY10', type: 'percent', value: 10, label: '10% Off Artisan Drop' },
  HANDMADE20: { code: 'HANDMADE20', type: 'percent', value: 20, label: '20% Off Spring Sale' },
  FREESHIP: { code: 'FREESHIP', type: 'shipping', value: 0, label: 'Free Worldwide Shipping' },
  WELCOME5: { code: 'WELCOME5', type: 'fixed', value: 5, label: '$5.00 Off First Order' },
}

const SEED_ORDERS = [
  {
    orderId: 'CRFT-849201',
    date: 'Aug 24, 2026',
    items: [
      { id: 1, title: 'Silk Thread Bangles', price: '$24', quantity: 2, image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80', category: 'Handmade Jewelry' },
      { id: 9, title: 'Scented Candles', price: '$22', quantity: 1, image: 'https://images.unsplash.com/photo-1603006905393-df8f1d1e8c7b?auto=format&fit=crop&w=800&q=80', category: 'DIY Home Decor & Crafts' },
    ],
    subtotal: 70,
    discount: 7,
    shipping: 0,
    giftWrap: 3.5,
    total: 66.5,
    customer: { fullName: 'Sophia Sterling', email: 'sophia@example.com', city: 'Seattle, WA', phone: '+1 206 555 0192' },
    status: 'Handcrafting & Packing',
    estimatedDelivery: 'Aug 29, 2026',
  },
  {
    orderId: 'CRFT-773194',
    date: 'Aug 23, 2026',
    items: [
      { id: 2, title: 'Resin Earrings', price: '$32', quantity: 1, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80', category: 'Handmade Jewelry' },
    ],
    subtotal: 32,
    discount: 0,
    shipping: 4.99,
    giftWrap: 0,
    total: 36.99,
    customer: { fullName: 'Lucas Vance', email: 'lucas@vance.design', city: 'Austin, TX', phone: '+1 512 555 0184' },
    status: 'Shipped',
    estimatedDelivery: 'Aug 27, 2026',
  },
]

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
  const [wishlist, setWishlist] = useState(() => safeReadStorage(STORAGE_KEYS.wishlist, [1, 2, 9]))
  const [user, setUser] = useState(() => safeReadStorage(STORAGE_KEYS.auth, null))
  const [orders, setOrders] = useState(() => safeReadStorage(STORAGE_KEYS.orders, SEED_ORDERS))
  const [availableCoupons, setAvailableCoupons] = useState(() => safeReadStorage(STORAGE_KEYS.coupons, DEFAULT_COUPONS))
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [isGiftWrap, setIsGiftWrap] = useState(false)

  // Drawer / Modal toggles
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isSellOpen, setIsSellOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false)

  // Toasts
  const [toasts, setToasts] = useState([])

  const showToast = useCallback(({ title, message, type = 'info' }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6)
    setToasts((current) => [...current, { id, title, message, type }])

    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products))
  }, [products])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.coupons, JSON.stringify(availableCoupons))
  }, [availableCoupons])

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
            cartItemId: item.cartItemId || item.productId,
            customization: item.customization,
            quantity: item.quantity,
          }
        })
        .filter(Boolean),
    [cart, productLookup],
  )

  const cartRawSubtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const amount = Number.parseFloat(item.price.replace('$', '')) || 0
        return total + amount * item.quantity
      }, 0),
    [cartItems],
  )

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0
    if (appliedCoupon.type === 'percent') {
      return (cartRawSubtotal * appliedCoupon.value) / 100
    }
    if (appliedCoupon.type === 'fixed') {
      return Math.min(cartRawSubtotal, appliedCoupon.value)
    }
    return 0
  }, [appliedCoupon, cartRawSubtotal])

  const shippingCost = useMemo(() => {
    if (cartRawSubtotal >= 50 || appliedCoupon?.type === 'shipping' || cartItems.length === 0) {
      return 0
    }
    return 4.99
  }, [appliedCoupon, cartItems.length, cartRawSubtotal])

  const giftWrapCost = useMemo(() => (isGiftWrap && cartItems.length > 0 ? 3.50 : 0), [isGiftWrap, cartItems.length])

  const cartFinalTotal = useMemo(
    () => Math.max(0, cartRawSubtotal - discountAmount + shippingCost + giftWrapCost),
    [cartRawSubtotal, discountAmount, shippingCost, giftWrapCost],
  )

  const cartCount = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems])

  const wishlistedProducts = useMemo(
    () => wishlist.map((id) => productLookup.get(id)).filter(Boolean),
    [wishlist, productLookup],
  )

  const toggleWishlist = (productId) => {
    const product = productLookup.get(productId)
    const title = product?.title || 'Item'

    setWishlist((current) => {
      if (current.includes(productId)) {
        showToast({
          title: 'Removed from Wishlist',
          message: `${title} was removed from your saved items.`,
          type: 'wishlist',
        })
        return current.filter((id) => id !== productId)
      } else {
        showToast({
          title: 'Saved to Wishlist! ✨',
          message: `${title} was added to your curated favorites.`,
          type: 'wishlist',
        })
        return [...current, productId]
      }
    })
  }

  const isWishlisted = (productId) => wishlist.includes(productId)

  const addToCart = (product, quantity = 1, customization = null) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1)
    const cartItemId = customization ? `${product.id}-${Date.now()}` : product.id

    setCart((current) => {
      const existingIndex = current.findIndex(
        (item) => !customization && item.productId === product.id && !item.customization
      )

      if (existingIndex > -1) {
        const next = [...current]
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + safeQuantity,
        }
        return next
      }

      return [
        ...current,
        {
          cartItemId,
          productId: product.id,
          quantity: safeQuantity,
          customization,
        },
      ]
    })

    showToast({
      title: 'Added to Bag! 🛍️',
      message: `${safeQuantity}x "${product.title}" is ready in your cart.`,
      type: 'cart',
    })
  }

  const setCartQuantity = (cartItemId, quantity) => {
    const safeQuantity = Number(quantity)

    setCart((current) => {
      if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) {
        return current.filter((item) => (item.cartItemId || item.productId) !== cartItemId)
      }

      return current.map((item) =>
        (item.cartItemId || item.productId) === cartItemId ? { ...item, quantity: safeQuantity } : item
      )
    })
  }

  const removeFromCart = (cartItemId) => {
    setCart((current) => current.filter((item) => (item.cartItemId || item.productId) !== cartItemId))
    showToast({
      title: 'Item Removed',
      message: 'Item has been removed from your shopping bag.',
      type: 'info',
    })
  }

  const moveAllWishlistToCart = () => {
    wishlistedProducts.forEach((prod) => {
      addToCart(prod, 1)
    })
    setWishlist([])
    setIsWishlistOpen(false)
    setIsCartOpen(true)
    showToast({
      title: 'Moved to Bag! ✨',
      message: 'All saved items have been transferred to your cart.',
      type: 'cart',
    })
  }

  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase()
    if (availableCoupons[cleanCode]) {
      setAppliedCoupon(availableCoupons[cleanCode])
      showToast({
        title: 'Coupon Applied! 🎉',
        message: `${availableCoupons[cleanCode].label} has been activated.`,
        type: 'success',
      })
      return { success: true, message: 'Coupon applied successfully!' }
    }
    showToast({
      title: 'Invalid Code',
      message: 'Code not recognized. Try CRAFTY10 or FREESHIP',
      type: 'error',
    })
    return { success: false, message: 'Invalid coupon code.' }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    showToast({
      title: 'Coupon Removed',
      message: 'Discount code has been detached.',
      type: 'info',
    })
  }

  const addCoupon = (newCoupon) => {
    const code = newCoupon.code.trim().toUpperCase()
    setAvailableCoupons((current) => ({
      ...current,
      [code]: {
        code,
        type: newCoupon.type || 'percent',
        value: Number(newCoupon.value) || 10,
        label: newCoupon.label || `${newCoupon.value}% Discount`,
      },
    }))
    showToast({
      title: 'Coupon Created! 🎟️',
      message: `Coupon code "${code}" is now active in store.`,
      type: 'success',
    })
  }

  const deleteCoupon = (code) => {
    setAvailableCoupons((current) => {
      const next = { ...current }
      delete next[code]
      return next
    })
    showToast({
      title: 'Coupon Deleted',
      message: `Coupon "${code}" has been disabled.`,
      type: 'info',
    })
  }

  const clearCart = () => setCart([])

  const createOrder = (orderData) => {
    const newOrder = {
      orderId: `CRFT-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cartItems],
      subtotal: cartRawSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      giftWrap: giftWrapCost,
      total: cartFinalTotal,
      customer: orderData,
      status: 'Handcrafting & Packing',
      estimatedDelivery: new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    }

    setOrders((current) => [newOrder, ...current])
    clearCart()
    setAppliedCoupon(null)

    showToast({
      title: 'Order Confirmed! 🌟',
      message: `Your order #${newOrder.orderId} is being prepared by our makers.`,
      type: 'success',
    })

    return newOrder
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((current) =>
      current.map((order) => (order.orderId === orderId ? { ...order, status: newStatus } : order))
    )
    showToast({
      title: 'Order Status Updated',
      message: `Order #${orderId} marked as "${newStatus}".`,
      type: 'success',
    })
  }

  const login = ({ name, email }) => {
    const cleanedName = name.trim()
    const cleanedEmail = email.trim().toLowerCase()

    setUser({
      name: cleanedName,
      email: cleanedEmail,
      avatar: buildAvatar(cleanedName),
      memberSince: '2026',
    })

    showToast({
      title: `Welcome, ${cleanedName}! 🌸`,
      message: 'Signed in to your Crafty account.',
      type: 'success',
    })
  }

  const logout = () => {
    setUser(null)
    showToast({
      title: 'Signed Out',
      message: 'You have been logged out of your account.',
      type: 'info',
    })
  }

  const addProduct = (productData) => {
    const nextProduct = {
      id: Date.now(),
      title: productData.title.trim(),
      description: productData.description.trim(),
      category: productData.category.trim(),
      price: productData.price.trim().startsWith('$') ? productData.price.trim() : `$${productData.price.trim()}`,
      image: productData.image.trim(),
      badges: productData.badges || ['New', 'Artisan Maker', 'Handmade'],
      rating: 5.0,
      reviews: 1,
      stock: productData.stock || 25,
      isUserCreated: true,
      artisanName: productData.artisanName || user?.name || 'Local Maker',
    }

    setProducts((current) => [nextProduct, ...current])

    showToast({
      title: 'Craft Listed Live! 🎨',
      message: `"${nextProduct.title}" is now available in the collection.`,
      type: 'success',
    })
  }

  const editProduct = (productId, updatedData) => {
    setProducts((current) =>
      current.map((prod) => {
        if (prod.id === productId) {
          return {
            ...prod,
            ...updatedData,
            price: updatedData.price
              ? updatedData.price.startsWith('$')
                ? updatedData.price
                : `$${updatedData.price}`
              : prod.price,
          }
        }
        return prod
      })
    )

    showToast({
      title: 'Product Updated! ✏️',
      message: `Craft details saved successfully.`,
      type: 'success',
    })
  }

  const deleteProduct = (productId) => {
    setProducts((current) => current.filter((prod) => prod.id !== productId))
    showToast({
      title: 'Product Deleted',
      message: 'Craft has been removed from marketplace.',
      type: 'info',
    })
  }

  const addReview = (productId, review) => {
    setProducts((current) =>
      current.map((prod) => {
        if (prod.id === productId) {
          const currentCount = prod.reviews || 10
          const currentRating = prod.rating || 4.8
          const newRating = Number(((currentRating * currentCount + review.rating) / (currentCount + 1)).toFixed(1))
          return {
            ...prod,
            rating: newRating,
            reviews: currentCount + 1,
          }
        }
        return prod
      })
    )

    showToast({
      title: 'Review Posted! ⭐',
      message: 'Thank you for sharing your feedback with the artisan community.',
      type: 'success',
    })
  }

  const value = {
    products,
    cartItems,
    cartSubtotal: cartRawSubtotal,
    cartFinalTotal,
    discountAmount,
    shippingCost,
    giftWrapCost,
    isGiftWrap,
    setIsGiftWrap,
    cartCount,
    wishlist,
    wishlistedProducts,
    appliedCoupon,
    availableCoupons,
    orders,
    user,
    toasts,
    isCartOpen,
    isWishlistOpen,
    isAuthOpen,
    isSellOpen,
    isCheckoutOpen,
    isQuickSearchOpen,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAuthOpen,
    setIsSellOpen,
    setIsCheckoutOpen,
    setIsQuickSearchOpen,
    toggleWishlist,
    isWishlisted,
    moveAllWishlistToCart,
    addToCart,
    setCartQuantity,
    removeFromCart,
    clearCart,
    applyCouponCode,
    removeCoupon,
    addCoupon,
    deleteCoupon,
    createOrder,
    updateOrderStatus,
    login,
    logout,
    addProduct,
    editProduct,
    deleteProduct,
    addReview,
    showToast,
    removeToast,
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


