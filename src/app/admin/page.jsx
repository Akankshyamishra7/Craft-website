"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  DollarSign,
  Edit,
  Eye,
  LayoutDashboard,
  Layers,
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

const PRESET_IMAGES = [
  { label: 'Resin Floral', url: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Silk Bangles', url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80' },
  { label: 'Soy Candle', url: 'https://images.unsplash.com/photo-1603006905393-df8f1d1e8c7b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Botanical Soap', url: 'https://images.unsplash.com/photo-1600857062241-98c4a8f1f08f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ceramic Decor', url: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80' },
]

export default function AdminPage() {
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
      price: product.price.replace('$', ''),
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

  return (
    <div className="min-h-screen bg-cream text-cocoa">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 border-b border-sand/80 bg-white/85 shadow-sm backdrop-blur-md">
        <div className="section-shell flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-4 py-2 text-xs font-bold text-cocoa shadow-sm transition hover:bg-clay hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Storefront
            </Link>

            <div className="hidden h-6 w-px bg-sand sm:block" />

            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blossom to-sand text-base font-bold shadow-soft">
                ✿
              </span>
              <div>
                <h1 className="font-serif text-2xl font-bold leading-tight text-cocoa">
                  Crafty Admin Console
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-clay">
                  Marketplace & Creator Ops
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-2xl border border-sand bg-sand/30 px-4 py-2 text-right sm:block">
              <p className="text-[10px] font-bold uppercase tracking-wider text-cocoa-muted">Total Gross Sales</p>
              <p className="text-sm font-extrabold text-clay">${metrics.totalSales.toFixed(2)}</p>
            </div>

            <button
              type="button"
              onClick={openAddProductModal}
              className="btn-primary text-xs py-2.5 px-4 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Add Craft
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="section-shell py-8">
        {/* Navigation Tabs */}
        <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-sand/80 pb-4">
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
                  ? 'bg-cocoa text-white shadow-soft ring-1 ring-cocoa'
                  : 'border border-sand bg-white/70 text-cocoa/70 hover:bg-white hover:text-cocoa'
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
                    <DollarSign className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-serif text-3xl font-bold text-cocoa">${metrics.totalSales.toFixed(2)}</p>
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
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-sand/60 text-amber-700">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-serif text-3xl font-bold text-cocoa">${metrics.avgOrderVal.toFixed(2)}</p>
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
                      className="flex cursor-pointer items-center justify-between rounded-2xl border border-sand bg-white/70 p-3 transition hover:bg-white"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-cocoa">{order.orderId}</span>
                          <span className="rounded-full bg-mint/50 px-2 py-0.5 text-[9px] font-bold text-moss">
                            {order.status}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-cocoa-muted">{order.customer?.fullName || 'Customer'}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-clay">${order.total?.toFixed(2)}</span>
                        <p className="text-[10px] text-cocoa-muted">{order.date}</p>
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
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-clay" />
                <input
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title or description..."
                  className="h-10 w-full rounded-xl border border-sand bg-white pl-10 pr-4 text-xs text-cocoa outline-none focus:border-clay"
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="h-10 rounded-xl border border-sand bg-white px-3 text-xs font-bold text-cocoa outline-none"
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
                  <thead className="border-b border-sand/80 bg-sand/30 font-bold uppercase tracking-wider text-cocoa-muted">
                    <tr>
                      <th className="p-4">Craft</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand/50">
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
                              className="h-12 w-12 rounded-xl object-cover"
                            />
                            <div>
                              <p className="font-bold text-cocoa">{p.title}</p>
                              <p className="line-clamp-1 max-w-xs text-[11px] text-cocoa-muted">{p.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-moss">{p.category}</td>
                        <td className="p-4 text-sm font-extrabold text-clay">{p.price}</td>
                        <td className="p-4 font-bold text-cocoa">
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
                              className="grid h-8 w-8 place-items-center rounded-lg border border-sand bg-white text-cocoa transition hover:bg-clay hover:text-white"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteProduct(p.id)}
                              title="Delete product"
                              className="grid h-8 w-8 place-items-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-500 hover:text-white"
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
              <div className="border-b border-sand/80 bg-sand/30 p-4">
                <h3 className="font-serif text-xl font-bold text-cocoa">All Customer Orders ({orders.length})</h3>
                <p className="text-xs text-cocoa-muted">Manage packing, shipment tracking, and customer details</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-sand/80 font-bold uppercase tracking-wider text-cocoa-muted">
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
                  <tbody className="divide-y divide-sand/50">
                    {orders.map((order) => (
                      <tr key={order.orderId} className="transition hover:bg-white/60">
                        <td className="p-4 font-mono font-bold text-cocoa">{order.orderId}</td>
                        <td className="p-4 text-cocoa-muted">{order.date}</td>
                        <td className="p-4">
                          <p className="font-bold text-cocoa">{order.customer?.fullName || 'Customer'}</p>
                          <p className="text-[10px] text-cocoa-muted">{order.customer?.city}</p>
                        </td>
                        <td className="p-4 font-semibold text-cocoa">{order.items?.length || 1} craft(s)</td>
                        <td className="p-4 text-sm font-extrabold text-clay">${order.total?.toFixed(2)}</td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                            className="rounded-xl border border-sand bg-white px-2.5 py-1 text-xs font-bold text-cocoa outline-none"
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
                            className="inline-flex items-center gap-1 rounded-lg border border-sand bg-white px-2.5 py-1 text-xs font-bold text-cocoa transition hover:bg-clay hover:text-white"
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
              <h3 className="font-serif text-xl font-bold text-cocoa">Create New Promotional Coupon</h3>
              <p className="mt-1 text-xs text-cocoa-muted">New codes will be immediately valid for customers in the storefront cart.</p>

              <form onSubmit={handleCreateCoupon} className="mt-5 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-bold text-cocoa">Coupon Code</label>
                  <input
                    required
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                    placeholder="e.g. SUMMER25"
                    className="h-10 w-full rounded-xl border border-sand bg-white px-3.5 font-mono text-xs font-bold uppercase text-cocoa outline-none focus:border-clay"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-cocoa">Discount Type</label>
                    <select
                      value={newCoupon.type}
                      onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                      className="h-10 w-full rounded-xl border border-sand bg-white px-3 text-xs font-bold text-cocoa outline-none"
                    >
                      <option value="percent">Percentage (%)</option>
                      <option value="fixed">Fixed Amount ($)</option>
                      <option value="shipping">Free Shipping</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-cocoa">Discount Value</label>
                    <input
                      type="number"
                      value={newCoupon.value}
                      onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                      placeholder="15"
                      className="h-10 w-full rounded-xl border border-sand bg-white px-3.5 text-xs font-bold text-cocoa outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-cocoa">Promotion Description / Label</label>
                  <input
                    value={newCoupon.label}
                    onChange={(e) => setNewCoupon({ ...newCoupon, label: e.target.value })}
                    placeholder="e.g. 25% Off Summer Artisan Drops"
                    className="h-10 w-full rounded-xl border border-sand bg-white px-3.5 text-xs text-cocoa outline-none"
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
                {Object.values(availableCoupons).map((c) => (
                  <div
                    key={c.code}
                    className="flex items-center justify-between rounded-2xl border border-sand bg-white/80 p-3.5 shadow-sm"
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
                          ? `$${c.value} discount`
                          : 'Free Shipping'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteCoupon(c.code)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-500 hover:text-white"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-cocoa/50 p-4 backdrop-blur-md">
          <div className="relative my-8 w-full max-w-xl overflow-hidden rounded-[2.2rem] bg-cream shadow-2xl">
            <button
              type="button"
              onClick={() => setIsProductModalOpen(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-sand bg-white text-cocoa"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-sand bg-sand/30 p-6">
              <span className="section-eyebrow">Product Catalog Management</span>
              <h3 className="mt-2 font-serif text-2xl font-bold text-cocoa">
                {editingProduct ? 'Edit Craft Details' : 'Add New Handmade Craft'}
              </h3>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-xs font-bold text-cocoa">Craft Title</label>
                <input
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. Scalloped Resin Tray"
                  className="h-10 w-full rounded-xl border border-sand bg-white px-3 text-xs text-cocoa outline-none focus:border-clay"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-cocoa">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="h-10 w-full rounded-xl border border-sand bg-white px-3 text-xs font-bold text-cocoa outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-cocoa">Price ($ USD)</label>
                  <input
                    required
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="34"
                    className="h-10 w-full rounded-xl border border-sand bg-white px-3 text-xs font-bold text-cocoa outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-cocoa">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Materials, handcrafted techniques, and styling notes..."
                  className="w-full rounded-xl border border-sand bg-white p-3 text-xs text-cocoa outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-cocoa">Image Preset or Custom URL</label>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setProductForm({ ...productForm, image: img.url })}
                      className="rounded-full border border-sand bg-white px-2.5 py-1 text-[10px] font-bold text-cocoa hover:bg-clay hover:text-white"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
                <input
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="h-10 w-full rounded-xl border border-sand bg-white px-3 text-xs text-cocoa outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="btn-primary flex-1 py-3 text-xs">
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-cocoa/50 p-4 backdrop-blur-md">
          <div className="relative my-8 w-full max-w-xl overflow-hidden rounded-[2.2rem] bg-cream shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-sand bg-white text-cocoa"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-sand bg-sand/30 p-6">
              <span className="section-eyebrow">Order Inspection</span>
              <h3 className="mt-2 font-serif text-2xl font-bold text-cocoa">
                Order #{selectedOrder.orderId}
              </h3>
              <p className="text-xs text-cocoa-muted">Placed on {selectedOrder.date}</p>
            </div>

            <div className="space-y-4 p-6 text-xs">
              {/* Customer Info */}
              <div className="rounded-2xl border border-sand bg-white p-4">
                <h4 className="font-bold text-cocoa">Customer & Shipping Address</h4>
                <p className="mt-1 text-cocoa font-semibold">{selectedOrder.customer?.fullName}</p>
                <p className="text-cocoa-muted">{selectedOrder.customer?.email}</p>
                <p className="text-cocoa-muted">{selectedOrder.customer?.address}</p>
                <p className="text-cocoa-muted">{selectedOrder.customer?.city}</p>
              </div>

              {/* Items */}
              <div className="rounded-2xl border border-sand bg-white p-4">
                <h4 className="font-bold text-cocoa">Ordered Crafts ({selectedOrder.items?.length || 1})</h4>
                <div className="mt-3 space-y-2">
                  {selectedOrder.items?.map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-sand/40 pb-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold text-cocoa">{item.title}</p>
                          <p className="text-[10px] text-moss">{item.quantity}x @ {item.price}</p>
                          {item.customization && (
                            <p className="text-[10px] text-clay">
                              Bespoke: {item.customization.palette}
                              {item.customization.personalization ? ` • "${item.customization.personalization}"` : ''}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-clay">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Totals */}
              <div className="flex justify-between rounded-xl bg-sand/30 p-3 text-sm font-bold text-cocoa">
                <span>Total Amount</span>
                <span className="text-clay">${selectedOrder.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
