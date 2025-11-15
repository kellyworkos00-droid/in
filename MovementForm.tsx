'use client'

import { useState } from 'react'
import { supabase, Product } from '@/lib/supabase'

interface MovementFormProps {
  products: Product[]
  onClose: () => void
}

export default function MovementForm({ products, onClose }: MovementFormProps) {
  const [formData, setFormData] = useState({
    product_id: '',
    type: 'in' as 'in' | 'out',
    quantity: 0,
    reason: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      // Get current product stock
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('current_stock')
        .eq('id', formData.product_id)
        .single()

      if (fetchError) throw fetchError

      // Calculate new stock
      const newStock = formData.type === 'in'
        ? product.current_stock + formData.quantity
        : product.current_stock - formData.quantity

      if (newStock < 0) {
        alert('Cannot remove more stock than available!')
        setLoading(false)
        return
      }

      // Insert movement
      const { error: movementError } = await supabase
        .from('movements')
        .insert([formData])

      if (movementError) throw movementError

      // Update product stock
      const { error: updateError } = await supabase
        .from('products')
        .update({ current_stock: newStock })
        .eq('id', formData.product_id)

      if (updateError) throw updateError

      onClose()
    } catch (error) {
      console.error('Error recording movement:', error)
      alert('Error recording movement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Record Inventory Movement</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Product</label>
        <select
          required
          value={formData.product_id}
          onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (SKU: {product.sku}) - Stock: {product.current_stock}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Movement Type</label>
        <select
          required
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as 'in' | 'out' })}
          className="w-full p-2 border rounded"
        >
          <option value="in">Stock In (Add)</option>
          <option value="out">Stock Out (Remove)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Quantity</label>
        <input
          type="number"
          required
          min="1"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Reason</label>
        <textarea
          required
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="E.g., Purchase order, Sale, Damaged goods, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Recording...' : 'Record Movement'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
