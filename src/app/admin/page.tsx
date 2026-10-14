"use client"

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  IndianRupee,
  Edit,
  Eye,
  LayoutDashboard,
  Layers,
  LogOut,
  Package,
  PackageCheck,
  Plus,
  Search,
  Tag,
  Trash2,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { useMarketplace } from '../../context/MarketplaceContext'
import { categories } from '../../data/products'
import { fallbackCraftImage } from '../../utils/fallbackImage'
import AdminLoginForm from '../../components/AdminLoginForm'

const PRESET_IMAGES = [
  { label: 'Resin Floral', url: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Silk Bangles', url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80' },
  { label: 'Soy Candle', url: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Botanical Soap', url: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ceramic Decor', url: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80' },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = window.localStorage.getItem('ateliernp-admin-authenticated') === 'true'
      setIsAuthenticated(auth)
      setAuthChecked(true)
    }
  }, [])

  const handleAdminLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('ateliernp-admin-authenticated')
      window.localStorage.removeItem('ateliernp-admin-user')
    }
    setIsAuthenticated(false)
  }

  const {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    availableCoupons,
    addCoupon,
    deleteCoupon,
  } = useMarketplace()

  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'products' | 'orders' | 'coupons' | 'artisans'

  // Product Table Filters
  const [productSearch, setProductSearch] = useState('')
  const [productCategory, setProductCategory] = useState('All')

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    title: '',
    category: categories[0],
    price: '34',
    description: '',
    image: PRESET_IMAGES[0].url,
    stock: 25,
    badges: ['New', 'Handmade'],
  })

  // Order Details Modal State
  const [selectedOrder, setSelectedOrder] = useState(null)

  // New Coupon Form State
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'percent',
    value: 15,
    label: '15% Off Spring Festival',
  })

  // Filtered Products for Admin Table
  const filteredProducts = useMemo(() => {
    const query = productSearch.trim().toLowerCase()
    return products.filter((p) => {
      const matchCat = productCategory === 'All' || p.category === productCategory
      const matchQuery =
        !query ||
        [p.title, p.category, p.description].some((field) => field?.toLowerCase().includes(query))
      return matchCat && matchQuery
    })
  }, [products, productCategory, productSearch])

  // Analytics Metrics
  const metrics = useMemo(() => {
    const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0)
    const totalOrdersCount = orders.length
    const totalProductsCount = products.length
    const avgOrderVal = totalOrdersCount > 0 ? totalSales / totalOrdersCount : 0
    return {
      totalSales,
      totalOrdersCount,
      totalProductsCount,
      avgOrderVal,
    }
  }, [orders, products])

  const openAddProductModal = () => {
    setEditingProduct(null)
    setProductForm({
      title: '',
      category: categories[0],
      price: '34',
      description: '',
      image: PRESET_IMAGES[0].url,
      stock: 25,
      badges: ['New', 'Handmade'],
    })
    setIsProductModalOpen(true)
  }

  const openEditProductModal = (product) => {
    setEditingProduct(product)
    setProductForm({
      title: product.title,
      category: product.category,
      price: String(product.price).replace(/[^0-9.]/g, ''),
      description: product.description,
      image: product.image,
      stock: product.stock || 20,
      badges: product.badges || ['Handmade'],
    })
    setIsProductModalOpen(true)
  }

  const handleProductSubmit = (e) => {
    e.preventDefault()
    if (editingProduct) {
      editProduct(editingProduct.id, productForm)
    } else {
      addProduct(productForm)
    }
    setIsProductModalOpen(false)
  }

  const handleCreateCoupon = (e) => {
    e.preventDefault()
    if (!newCoupon.code.trim()) return
    addCoupon(newCoupon)
    setNewCoupon({ code: '', type: 'percent', value: 15, label: '' })
  }

  if (!isAuthenticated) {
    return <AdminLoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#141414]">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 border-b border-[#E5E0D8] bg-white/90 shadow-sm backdrop-blur-md">
        <div className="section-shell flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#d4a338]/30 bg-white/80 px-4 py-2 text-xs font-bold text-[#5e4318] shadow-sm transition hover:bg-[#faeed1] hover:text-[#17120a]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Storefront
            </Link>

            <div className="hidden h-6 w-px bg-[#d4a338]/30 sm:block" />

            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#fff3cf] via-[#e8bc57] to-[#b38320] text-base font-bold text-[#17120a] shadow-soft border border-[#fbf3d5]">
                ✿
              </span>
              <div>
                <h1 className="font-serif text-2xl font-bold leading-tight text-[#241705]">
                  Atelier NP Admin Console
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8c5f0b]">
                  Marketplace & Creator Ops
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-2xl border border-[#d4a338]/30 bg-white/80 px-4 py-2 text-right sm:block">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#73562a]">Total Gross Sales</p>
              <p className="text-sm font-extrabold text-[#855a10]">₹{metrics.totalSales.toFixed(0)}</p>
            </div>

            <button
              type="button"
              onClick={openAddProductModal}
              className="btn-primary text-xs py-2.5 px-4 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Add Craft
            </button>

            <button
              type="button"
              onClick={handleAdminLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#d4a338]/30 bg-white/80 px-3.5 py-2 text-xs font-bold text-rose-600 shadow-sm transition hover:bg-rose-50 hover:border-rose-300"
              title="Sign out of admin session"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="section-shell py-8">
        {/* Navigation Tabs */}
        <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-[#d4a338]/30 pb-4">
          {[
            { id: 'overview', label: 'Executive Analytics', icon: LayoutDashboard },
            { id: 'products', label: `Crafts Catalog (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders & Fulfillment (${orders.length})`, icon: PackageCheck },
            { id: 'coupons', label: 'Promos & Coupons', icon: Tag },
            { id: 'artisans', label: 'Maker Collective', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#faeed1] to-[#e8bc57] text-[#241705] shadow-sm border border-[#d4a338]'
                  : 'border border-[#d4a338]/30 bg-white/70 text-[#5e4318] hover:bg-[#faeed1] hover:text-[#241705]'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4 Metric Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cocoa-muted">Gross Revenue</span>
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-mint/50 text-moss">
                    <IndianRupee className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-serif text-3xl font-bold text-cocoa">₹{metrics.totalSales.toFixed(0)}</p>
                <p className="mt-1 text-[11px] font-semibold text-moss">↗ +18.4% from last week</p>
              </div>

              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cocoa-muted">Total Orders</span>
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-blossom/50 text-clay">
                    <PackageCheck className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-serif text-3xl font-bold text-cocoa">{metrics.totalOrdersCount}</p>
                <p className="mt-1 text-[11px] font-semibold text-clay">All fulfilled direct by artisans</p>
              </div>

              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cocoa-muted">Active Crafts</span>
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-lilac/50 text-cocoa">
                    <Layers className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-serif text-3xl font-bold text-cocoa">{metrics.totalProductsCount}</p>
                <p className="mt-1 text-[11px] font-semibold text-cocoa-muted">Across 4 major artisan categories</p>
              </div>

              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cocoa-muted">Avg Order Value</span>
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/[0.03] text-[#ebd499]">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-serif text-3xl font-bold text-cocoa">₹{metrics.avgOrderVal.toFixed(0)}</p>
                <p className="mt-1 text-[11px] font-semibold text-moss">Bespoke add-ons boosting basket size</p>
              </div>
            </div>

            {/* Category Breakdown & Recent Orders Grid */}
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Category Distribution */}
              <div className="glass-card p-6">
                <h3 className="font-serif text-xl font-bold text-cocoa">Craft Catalog by Category</h3>
                <div className="mt-5 space-y-4">
                  {categories.map((cat) => {
                    const count = products.filter((p) => p.category === cat).length
                    const pct = Math.round((count / products.length) * 100) || 0
                    return (
                      <div key={cat}>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-cocoa">{cat}</span>
                          <span className="text-clay">{count} items ({pct}%)</span>
                        </div>
                        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-sand/50">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-clay via-blossom to-moss"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Recent Orders List */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-cocoa">Recent Customer Orders</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-clay hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {orders.slice(0, 4).map((order) => (
                    <div
                      key={order.orderId}
                      onClick={() => setSelectedOrder(order)}
                      className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#d4a338]/25 bg-white/80 p-3 transition hover:bg-[#faeed1]"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#241705]">{order.orderId}</span>
                          <span className="rounded-full bg-mint/50 px-2 py-0.5 text-[9px] font-bold text-moss">
                            {order.status}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-[#5e4318]">{order.customer?.fullName || 'Customer'}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-[#855a10]">₹{order.total?.toFixed(0)}</span>
                        <p className="text-[10px] text-[#73562a]">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG (FULL CRUD) */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Search & Category Filter Toolbar */}
            <div className="glass-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c5f0b]" />
                <input
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title or description..."
                  className="h-10 w-full rounded-xl border border-[#d4a338]/35 bg-white pl-10 pr-4 text-xs font-semibold text-[#241705] outline-none focus:border-[#c59325] shadow-sm"
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="h-10 rounded-xl border border-[#d4a338]/35 bg-white px-3 text-xs font-bold text-[#241705] outline-none shadow-sm"
                >
                  <option value="All">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={openAddProductModal}
                  className="btn-primary text-xs py-2 px-4 whitespace-nowrap"
                >
                  <Plus className="h-4 w-4" />
                  New Product
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#d4a338]/20 bg-[#faeed1]/50 font-bold uppercase tracking-wider text-[#73562a]">
                    <tr>
                      <th className="p-4">Craft</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d4a338]/15">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="transition hover:bg-white/60">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.title}
                              onError={(e) => {
                                e.currentTarget.src = fallbackCraftImage
                              }}
                              className="h-12 w-12 rounded-xl object-cover border border-[#d4a338]/25"
                            />
                            <div>
                              <p className="font-bold text-[#241705]">{p.title}</p>
                              <p className="line-clamp-1 max-w-xs text-[11px] text-[#5e4318]">{p.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-moss">{p.category}</td>
                        <td className="p-4 text-sm font-extrabold text-[#855a10]">{p.price}</td>
                        <td className="p-4 font-bold text-[#241705]">
                          ⭐ {p.rating ?? 4.9} ({p.reviews ?? 12})
                        </td>
                        <td className="p-4">
                          <span className="rounded-full bg-mint/50 px-2.5 py-1 text-[10px] font-bold text-moss">
                            {p.stock ?? 25} in stock
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openEditProductModal(p)}
                              title="Edit product"
                              className="grid h-8 w-8 place-items-center rounded-lg border border-[#d4a338]/30 bg-white text-[#241705] transition hover:bg-[#faeed1] shadow-sm"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteProduct(p.id)}
                              title="Delete product"
                              className="grid h-8 w-8 place-items-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-500 hover:text-white shadow-sm"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="glass-card overflow-hidden">
              <div className="border-b border-[#d4a338]/20 bg-[#faeed1]/50 p-4">
                <h3 className="font-serif text-xl font-bold text-[#241705]">All Customer Orders ({orders.length})</h3>
                <p className="text-xs text-[#5e4318]">Manage packing, shipment tracking, and customer details</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#d4a338]/20 font-bold uppercase tracking-wider text-[#73562a]">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items Count</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Fulfillment Status</th>
                      <th className="p-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d4a338]/15">
                    {orders.map((order) => (
                      <tr key={order.orderId} className="transition hover:bg-white/60">
                        <td className="p-4 font-mono font-bold text-[#241705]">{order.orderId}</td>
                        <td className="p-4 text-[#5e4318]">{order.date}</td>
                        <td className="p-4">
                          <p className="font-bold text-[#241705]">{order.customer?.fullName || 'Customer'}</p>
                          <p className="text-[10px] text-[#73562a]">{order.customer?.city}</p>
                        </td>
                        <td className="p-4 font-semibold text-[#241705]">{order.items?.length || 1} craft(s)</td>
                        <td className="p-4 text-sm font-extrabold text-[#855a10]">₹{order.total?.toFixed(0)}</td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                            className="rounded-xl border border-[#d4a338]/35 bg-white px-2.5 py-1 text-xs font-bold text-[#241705] outline-none shadow-sm"
                          >
                            <option value="Handcrafting & Packing">Handcrafting & Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#d4a338]/30 bg-white px-2.5 py-1 text-xs font-bold text-[#241705] transition hover:bg-[#faeed1] shadow-sm"
                          >
                            <Eye className="h-3.5 w-3.5" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS ENGINE */}
        {activeTab === 'coupons' && (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            {/* Create Coupon Form */}
            <div className="glass-card p-6">
              <h3 className="font-serif text-xl font-bold text-[#241705]">Create New Promotional Coupon</h3>
              <p className="mt-1 text-xs text-[#5e4318]">New codes will be immediately valid for customers in the storefront cart.</p>

              <form onSubmit={handleCreateCoupon} className="mt-5 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#241705]">Coupon Code</label>
                  <input
                    required
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                    placeholder="e.g. SUMMER25"
                    className="h-10 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 font-mono text-xs font-bold uppercase text-[#241705] outline-none focus:border-[#c59325] shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#241705]">Discount Type</label>
                    <select
                      value={newCoupon.type}
                      onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                      className="h-10 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3 text-xs font-bold text-[#241705] outline-none shadow-sm"
                    >
                      <option value="percent">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                      <option value="shipping">Free Shipping</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#241705]">Discount Value</label>
                    <input
                      type="number"
                      value={newCoupon.value}
                      onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                      placeholder="15"
                      className="h-10 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-xs font-bold text-[#241705] outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-[#241705]">Promotion Description / Label</label>
                  <input
                    value={newCoupon.label}
                    onChange={(e) => setNewCoupon({ ...newCoupon, label: e.target.value })}
                    placeholder="e.g. 25% Off Summer Artisan Drops"
                    className="h-10 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-xs text-[#241705] outline-none shadow-sm"
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-3 text-xs">
                  <Tag className="h-4 w-4" /> Activate Coupon Code
                </button>
              </form>
            </div>

            {/* Active Coupons List */}
            <div className="glass-card p-6">
              <h3 className="font-serif text-xl font-bold text-cocoa">Active Coupon Codes</h3>
              <p className="mt-1 text-xs text-cocoa-muted">Currently active discounts available in store checkout</p>

              <div className="mt-5 space-y-3">
                {Object.values(availableCoupons as Record<string, any>).map((c: any) => (
                  <div
                    key={c.code}
                    className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3.5 shadow-sm"
                  >
                    <div>
                      <span className="rounded-lg border border-dashed border-clay bg-clay-light/50 px-2.5 py-1 font-mono text-xs font-bold text-clay">
                        {c.code}
                      </span>
                      <p className="mt-1 text-xs font-bold text-cocoa">{c.label}</p>
                      <p className="text-[10px] text-moss">
                        {c.type === 'percent'
                          ? `${c.value}% discount`
                          : c.type === 'fixed'
                          ? `₹${c.value} discount`
                          : 'Free Shipping'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteCoupon(c.code)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-rose-200 bg-rose-500/10 text-rose-600 transition hover:bg-rose-500/100 hover:text-white"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ARTISANS DIRECTORY */}
        {activeTab === 'artisans' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Ananya & Maya', specialty: 'Silk Thread & Kundan', crafts: 8, location: 'Jaipur / CA', status: 'Master Maker' },
              { name: 'Clara & Fern', specialty: 'UV Pressed Florals', crafts: 6, location: 'Portland, OR', status: 'Top Rated' },
              { name: 'Aiden Apothecary', specialty: 'Botanical Soy Wax', crafts: 5, location: 'Burlington, VT', status: 'Clean Certified' },
              { name: 'Local Artisan Makers', specialty: 'Community Listings', crafts: products.length - 19, location: 'Global Studios', status: 'Verified' },
            ].map((artisan, idx) => (
              <div key={idx} className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-mint/50 px-2.5 py-0.5 text-[10px] font-bold text-moss">
                    {artisan.status}
                  </span>
                  <span className="text-xs font-bold text-clay">{artisan.crafts} Active Crafts</span>
                </div>
                <h4 className="mt-3 font-serif text-xl font-bold text-cocoa">{artisan.name}</h4>
                <p className="text-xs font-semibold text-cocoa-muted">{artisan.specialty}</p>
                <p className="mt-2 text-xs text-cocoa-muted">📍 {artisan.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#17120a]/60 p-4 backdrop-blur-md">
          <div className="relative my-8 w-full max-w-xl overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[#fffdf9] via-[#faeed1] to-[#f6e1b3] border border-[#d4a338]/40 shadow-[0_25px_60px_rgba(133,90,16,0.25)]">
            <button
              type="button"
              onClick={() => setIsProductModalOpen(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[#d4a338]/30 bg-white/80 text-[#241705] hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-[#d4a338]/20 bg-[#faeed1]/50 p-6">
              <span className="section-eyebrow">Product Catalog Management</span>
              <h3 className="mt-2 font-serif text-2xl font-bold text-[#241705]">
                {editingProduct ? 'Edit Craft Details' : 'Add New Handmade Craft'}
              </h3>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-xs font-bold text-[#241705]">Craft Title</label>
                <input
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. Scalloped Resin Tray"
                  className="h-10 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3 text-xs font-semibold text-[#241705] outline-none focus:border-[#c59325] shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#241705]">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="h-10 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3 text-xs font-bold text-[#241705] outline-none shadow-sm"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-[#241705]">Price (₹ INR)</label>
                  <input
                    required
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="499"
                    className="h-10 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3 text-xs font-bold text-[#241705] outline-none shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-[#241705]">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Materials, handcrafted techniques, and styling notes..."
                  className="w-full rounded-xl border border-[#d4a338]/35 bg-white p-3 text-xs font-medium text-[#241705] outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-[#241705]">Image Preset or Custom URL</label>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setProductForm({ ...productForm, image: img.url })}
                      className="rounded-full border border-[#d4a338]/30 bg-white/80 px-2.5 py-1 text-[10px] font-bold text-[#241705] hover:bg-[#faeed1] shadow-sm"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
                <input
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="h-10 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3 text-xs text-[#241705] outline-none shadow-sm"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="btn-primary flex-1 py-3 text-xs shadow-glow">
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#17120a]/60 p-4 backdrop-blur-md">
          <div className="relative my-8 w-full max-w-xl overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[#fffdf9] via-[#faeed1] to-[#f6e1b3] border border-[#d4a338]/40 shadow-[0_25px_60px_rgba(133,90,16,0.25)]">
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[#d4a338]/30 bg-white/80 text-[#241705] hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-[#d4a338]/20 bg-[#faeed1]/50 p-6">
              <span className="section-eyebrow">Order Inspection</span>
              <h3 className="mt-2 font-serif text-2xl font-bold text-[#241705]">
                Order #{selectedOrder.orderId}
              </h3>
              <p className="text-xs text-[#5e4318]">Placed on {selectedOrder.date}</p>
            </div>

            <div className="space-y-4 p-6 text-xs">
              {/* Customer Info */}
              <div className="rounded-2xl border border-[#d4a338]/30 bg-white/80 p-4 shadow-sm">
                <h4 className="font-bold text-[#241705]">Customer & Shipping Address</h4>
                <p className="mt-1 text-[#241705] font-semibold">{selectedOrder.customer?.fullName}</p>
                <p className="text-[#5e4318]">{selectedOrder.customer?.email}</p>
                <p className="text-[#5e4318]">{selectedOrder.customer?.address}</p>
                <p className="text-[#5e4318]">{selectedOrder.customer?.city}</p>
              </div>

              {/* Items */}
              <div className="rounded-2xl border border-[#d4a338]/30 bg-white/80 p-4 shadow-sm">
                <h4 className="font-bold text-[#241705]">Ordered Crafts ({selectedOrder.items?.length || 1})</h4>
                <div className="mt-3 space-y-2">
                  {selectedOrder.items?.map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-[#d4a338]/15 pb-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-10 w-10 rounded-lg object-cover border border-[#d4a338]/25"
                        />
                        <div>
                          <p className="font-bold text-[#241705]">{item.title}</p>
                          <p className="text-[10px] text-moss">{item.quantity}x @ {item.price}</p>
                          {item.customization && (
                            <p className="text-[10px] text-clay">
                              Bespoke: {item.customization.palette}
                              {item.customization.personalization ? ` • "${item.customization.personalization}"` : ''}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-[#855a10]">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Totals */}
              <div className="flex justify-between rounded-xl border border-[#d4a338]/30 bg-white/80 p-3 text-sm font-bold text-[#241705] shadow-sm">
                <span>Total Amount</span>
                <span className="text-[#855a10]">₹{selectedOrder.total?.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
