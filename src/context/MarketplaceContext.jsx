"use client"

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { handmadeProducts } from '../data/products'

const MarketplaceContext = createContext(null)

const STORAGE_KEYS = {
  auth: 'ateliernp-auth-user-v1',
  cart: 'ateliernp-cart-v1',
  wishlist: 'ateliernp-wishlist-v1',
  products: 'ateliernp-products-v3',
  orders: 'ateliernp-orders-v1',
  coupons: 'ateliernp-coupons-v1',
}

const DEFAULT_COUPONS = {
  ATELIER10: { code: 'ATELIER10', type: 'percent', value: 10, label: '10% Off Atelier Drop' },
  CRAFTY10: { code: 'CRAFTY10', type: 'percent', value: 10, label: '10% Off Artisan Drop' },
  HANDMADE20: { code: 'HANDMADE20', type: 'percent', value: 20, label: '20% Off Spring Sale' },
  FREESHIP: { code: 'FREESHIP', type: 'shipping', value: 0, label: 'Free Delivery Across India' },
  WELCOME150: { code: 'WELCOME150', type: 'fixed', value: 150, label: '₹150 Off First Order' },
  WELCOME5: { code: 'WELCOME5', type: 'fixed', value: 150, label: '₹150 Off First Order' },
}

const SEED_ORDERS = [
  {
    orderId: 'CRFT-849201',
    date: 'Aug 24, 2026',
    items: [
      { id: 1, title: 'Silk Thread Bangles', price: '₹499', quantity: 2, image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80', category: 'Handmade Jewelry' },
      { id: 9, title: 'Scented Candles', price: '₹449', quantity: 1, image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80', category: 'DIY Home Decor & Crafts' },
    ],
    subtotal: 1447,
    discount: 145,
    shipping: 0,
    giftWrap: 49,
    total: 1351,
    customer: { fullName: 'Pooja Verma', email: 'pooja.verma@example.in', city: 'Bengaluru, Karnataka', phone: '+91 98765 43210' },
    status: 'Handcrafting & Packing',
    estimatedDelivery: 'Aug 29, 2026',
  },
  {
    orderId: 'CRFT-773194',
    date: 'Aug 23, 2026',
    items: [
      { id: 2, title: 'Resin Earrings', price: '₹649', quantity: 1, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80', category: 'Handmade Jewelry' },
    ],
    subtotal: 649,
    discount: 0,
    shipping: 0,
    giftWrap: 0,
    total: 649,
    customer: { fullName: 'Rohan Mehra', email: 'rohan.mehra@example.in', city: 'Mumbai, Maharashtra', phone: '+91 98200 12345' },
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
    if (!storedValue) return fallbackValue
    const parsed = JSON.parse(storedValue)
    // If it's a product array, ensure any stale '$' is cleaned to '₹' and missing flagship products are included
    if (Array.isArray(parsed) && key === STORAGE_KEYS.products) {
      const storedIds = new Set(parsed.map((p) => p.id))
      const missingDefaults = handmadeProducts.filter((hp) => !storedIds.has(hp.id))
      const combined = [...missingDefaults, ...parsed]
      return combined.map((p) => ({
        ...p,
        price: typeof p.price === 'string' && p.price.includes('$')
          ? p.price.replace('$', '₹')
          : p.price,
      }))
    }
    return parsed
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

  const productLookup = useMemo(() => {
    const map = new Map()
    for (const item of products) {
      map.set(item.id, item)
    }
    return map
  }, [products])

  const wishlistedProducts = useMemo(
    () => wishlist.map((id) => productLookup.get(id)).filter(Boolean),
    [wishlist, productLookup],
  )

  const isWishlisted = useCallback((id) => wishlist.includes(id), [wishlist])

  const toggleWishlist = (productId) => {
    const product = productLookup.get(productId)
    const title = product?.title || 'Craft item'

    setWishlist((current) => {
      const exists = current.includes(productId)
      if (exists) {
        showToast({
          title: 'Removed from Saved',
          message: `${title} was removed from your saved items.`,
          type: 'info',
        })
        return current.filter((id) => id !== productId)
      }

      showToast({
        title: 'Saved to Wishlist! 💖',
        message: `${title} was added to your curated favorites.`,
        type: 'success',
      })
      return [...current, productId]
    })
  }

  const addToCart = (product, quantity = 1, customization = null) => {
    const safeQuantity = Math.max(1, Number.parseInt(quantity, 10) || 1)
    const cartItemId = customization ? `${product.id}-${Date.now()}` : product.id

    setCart((current) => {
      const existingIndex = current.findIndex((item) => {
        if (customization) {
          return false
        }
        return item.productId === product.id && !item.customization
      })

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
    const targetQty = Number.parseInt(quantity, 10) || 0
    if (targetQty <= 0) {
      removeFromCart(cartItemId)
      return
    }

    setCart((current) =>
      current.map((item) =>
        (item.cartItemId || item.productId) === cartItemId ? { ...item, quantity: targetQty } : item
      )
    )
  }

  const removeFromCart = (cartItemId) => {
    setCart((current) => current.filter((item) => (item.cartItemId || item.productId) !== cartItemId))
    showToast({
      title: 'Item Removed',
      message: 'Product removed from your shopping bag.',
      type: 'info',
    })
  }

  const moveAllWishlistToCart = () => {
    if (wishlistedProducts.length === 0) return

    setCart((current) => {
      const next = [...current]
      for (const prod of wishlistedProducts) {
        const existingIdx = next.findIndex((item) => item.productId === prod.id && !item.customization)
        if (existingIdx > -1) {
          next[existingIdx].quantity += 1
        } else {
          next.push({
            cartItemId: prod.id,
            productId: prod.id,
            quantity: 1,
            customization: null,
          })
        }
      }
      return next
    })

    setWishlist([])
    setIsWishlistOpen(false)
    setIsCartOpen(true)

    showToast({
      title: 'Wishlist Moved to Bag! 🎁',
      message: `${wishlistedProducts.length} handcrafted items moved to your bag.`,
      type: 'cart',
    })
  }

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
        const amount = Number.parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0
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
    if (cartRawSubtotal >= 499 || appliedCoupon?.type === 'shipping' || cartItems.length === 0) {
      return 0
    }
    return 49
  }, [appliedCoupon, cartItems.length, cartRawSubtotal])

  const giftWrapCost = useMemo(() => (isGiftWrap && cartItems.length > 0 ? 49 : 0), [isGiftWrap, cartItems.length])

  const cartFinalTotal = useMemo(
    () => Math.max(0, cartRawSubtotal - discountAmount + shippingCost + giftWrapCost),
    [cartRawSubtotal, discountAmount, shippingCost, giftWrapCost],
  )

  const cartCount = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems])

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
      message: 'Code not recognized. Try ATELIER10 or FREESHIP',
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
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cartItems],
      subtotal: cartRawSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      giftWrap: giftWrapCost,
      total: cartFinalTotal,
      customer: orderData,
      status: 'Handcrafting & Packing',
      estimatedDelivery: new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-IN', {
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
      avatarImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      memberSince: '2026',
    })

    showToast({
      title: `Welcome, ${cleanedName}! 🌸`,
      message: 'Signed in to your Atelier NP account.',
      type: 'success',
    })
  }

  const logout = () => {
    setUser(null)
    showToast({
      title: 'Signed Out',
      message: 'Come back soon for more handmade drops!',
      type: 'info',
    })
  }

  const addProduct = (productData) => {
    const rawPrice = productData.price.trim()
    const formattedPrice = rawPrice.startsWith('₹') ? rawPrice : `₹${rawPrice}`

    const nextProduct = {
      id: Date.now(),
      title: productData.title.trim(),
      description: productData.description.trim(),
      category: productData.category.trim(),
      price: formattedPrice,
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
          let updatedPrice = prod.price
          if (updatedData.price) {
            const raw = updatedData.price.trim()
            updatedPrice = raw.startsWith('₹') ? raw : `₹${raw}`
          }

          return {
            ...prod,
            ...updatedData,
            price: updatedPrice,
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
